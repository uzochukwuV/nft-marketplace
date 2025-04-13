// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {IERC721} from "@openzeppelin-contracts/token/ERC721/ERC721.sol";
import {IERC20} from "@openzeppelin-contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";
import "@openzeppelin-contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin-contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin-contracts/utils/Pausable.sol";


contract BaseMarket is Ownable, ReentrancyGuard, Pausable  {
    using EnumerableSet for EnumerableSet.UintSet;
    // states
    IERC20 public immutable coin;
    IERC721 public immutable nft;
    

    // custom errors
    error InvalidAddress();

    // modifiers
    

    // structs
    struct NFTAsset{
        uint256 id;
        uint128 price;
        address owner;
    }

    // states
    mapping (uint256=>NFTAsset) public nfts;
    EnumerableSet.UintSet private listedNFTs;
    uint256 public feePercent = 2;

    // events
    event AssetListed(uint256 indexed id, uint128 price, address indexed seller);
    event AssetPurchased(uint256 indexed id, uint128 price, address indexed seller, address indexed buyer );

    constructor(address initialOwner, address _nft, address _coin ) Ownable(initialOwner){
        if(_nft == address(0) || _coin == address(0)){
            revert InvalidAddress();
        }
        coin = IERC20(_coin);
        nft = IERC721(_nft);
    }
    function setPlatformFee(uint256 _fee) external onlyOwner {
        feePercent = _fee;
    }

   
    // list nft with price
    function listNFT(uint256 id, uint128 price) external nonReentrant whenNotPaused   returns (bool) {
        require(nft.ownerOf(id)== msg.sender, "NOT_ALLOWED");
        require(price > 0, "PRICE_!>_ZERO");
        require(nft.getApproved(id) == address(this) || nft.isApprovedForAll(msg.sender, address(this)), "NOT_APPROVED");

        
        NFTAsset memory asset = NFTAsset(
            id,
            price,
            owner()
        );
        nfts[id] = asset;
        listedNFTs.add(id);

        nft.safeTransferFrom(msg.sender, address(this), id);
        emit AssetListed(id, price, msg.sender);
        return true;
    }

    function purchaseNFT(uint256 id) external nonReentrant whenNotPaused   {
        NFTAsset memory listed = nfts[id];
        require(coin.balanceOf(msg.sender) > listed.price, "INSUFFICIENT_BALANCE");
        require(msg.sender != listed.owner, "CANNOT_PURCHSE_OWNED");
        require(coin.allowance(msg.sender, address(this)) > listed.price,"INSUFFICIENT_ALLOWANCE");

        uint256 feeAmount = (listed.price * feePercent) / 10000;
        uint256 sellerAmount = listed.price - feeAmount;

        coin.transferFrom(msg.sender, address(this), feeAmount);
        coin.transferFrom(msg.sender, listed.owner, sellerAmount);

        nft.transferFrom(address(this), msg.sender, id);
        delete nfts[id];
        listedNFTs.remove(id);
        emit AssetPurchased(id, listed.price, listed.owner, msg.sender);
    }

    function getAssetDetails(uint256 id) public view returns (NFTAsset memory){
        return nfts[id];
    }

    function getListedAssets(uint8 skip, uint8 limit) external view returns (NFTAsset[] memory) {
        uint256 total = listedNFTs.length();

        if (skip >= total) {
            return new NFTAsset[](0) ;
        }

        uint256 available = total - skip;
        uint256 size = limit < available ? limit : available;

        NFTAsset[] memory result = new NFTAsset[](size);

        for (uint256 i = 0; i < size; i++) {
            uint256 id = listedNFTs.at(skip + i);
            result[i] = nfts[id];
        }

        return result;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {
        revert("Direct ETH not accepted");
    }
    // // can hold nft
    function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
) external returns (bytes4) {
    return this.onERC721Received.selector; // Ensure the contract can receive the NFT
}
}