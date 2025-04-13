// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {BaseMarket} from "../src/BaseMarket.sol";
import {BaseCoin} from "../src/BaseCoin.sol";
import {BaseNft} from "../src/BaseNft.sol";


contract BaseMarketTest is Test {
    BaseMarket public baseMarket;
    BaseCoin public baseCoin;
    BaseNft public baseNft;
    address public deployer = 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496;
    uint256 tokenId;

    function setUp() public {
        baseCoin = new BaseCoin(deployer, 100000000);
        baseNft = new BaseNft(deployer);
        baseMarket = new BaseMarket(deployer, address(baseNft), address(baseCoin));
        
        tokenId = baseNft.safeMint(deployer, "");
        baseNft.safeMint(deployer, "");
    }

    function testApprovalAndListing() public {
        baseNft.setApprovalForAll(address(baseMarket), true);
        baseMarket.listNFT(tokenId, 10);
        console.log("NFT with token ID %d listed for sale at price %d", tokenId, 10);
        assertEq(baseMarket.getListedAssets(0,4).length, 1);
        assertEq(baseNft.ownerOf(tokenId), address(baseMarket));
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }

    
    // can hold nft
    function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
) external returns (bytes4) {
    return this.onERC721Received.selector; // Ensure the contract can receive the NFT
}
}
