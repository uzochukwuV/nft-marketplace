// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
import {BaseMarket} from "../src/BaseMarket.sol";
import {BaseCoin} from "../src/BaseCoin.sol";
import {BaseNft} from "../src/BaseNft.sol";

contract BaseMarketScript is Script {
    BaseMarket public baseMarket;
    BaseCoin public baseCoin;
    BaseNft public baseNft;
    address public deployer = 0x19C50Bfd73627B35f2EF3F7B0755229D42cd56a8;


    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        
        baseCoin = new BaseCoin(deployer, 100000000);
        baseNft = new BaseNft(deployer);
        baseMarket = new BaseMarket(deployer, address(baseNft), address(baseCoin));
        

        console.log("BaseCoin deployed to:", address(baseCoin));
        console.log("BaseNft deployed to:", address(baseNft));
        console.log("BaseMarket deployed to:", address(baseMarket));
        vm.stopBroadcast();
    }
}