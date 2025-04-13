// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin-contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin-contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";

contract BaseCoin is ERC20, ERC20Permit, Ownable {
    constructor(address initialOwner, uint256 amount)
        ERC20("BaseCoin", "BCN")
        ERC20Permit("BaseCoin")
        Ownable(initialOwner)
    {
        _mint(initialOwner, amount);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
