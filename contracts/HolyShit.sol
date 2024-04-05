// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IApexDeities} from "./IApexDeities.sol";
import {LSP7DigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

contract HolyShit is LSP7DigitalAsset {
    uint256 public constant SHIT_COOLDOWN = 24 hours;
    uint256 public constant LAST_POSSIBLE_MINT_BEFORE = 1_000_000;

    IApexDeities public apexDeities;

    mapping(bytes32 => uint256) public lastShitTime;

    constructor(
        address apexDeitiesAddress,
        address owner
    ) LSP7DigitalAsset("HolyShit", "HSHT", owner, 0, false) {
        apexDeities = IApexDeities(apexDeitiesAddress);
    }

    function shitPerCyclePerTier(
        IApexDeities.Tier tier
    ) public pure returns (uint256) {
        if (tier == IApexDeities.Tier.S) return 400;
        if (tier == IApexDeities.Tier.A) return 300;
        if (tier == IApexDeities.Tier.B) return 200;
        if (tier == IApexDeities.Tier.C) return 100;
    }

    function shit(bytes32 tokenId) public {
        _shit(tokenId);
    }

    function batchShit(bytes32[] memory tokenIds) public {
        for (uint256 i; i < tokenIds.length; i++) {
            _shit(tokenIds[i]);
        }
    }

    function _shit(bytes32 tokenId) internal {
        address tokenOwner = apexDeities.tokenOwnerOf(tokenId);
        if (totalSupply() >= LAST_POSSIBLE_MINT_BEFORE) {
            revert NoMoreShitToGive();
        }
        if (msg.sender != tokenOwner) {
            revert NotOwner(msg.sender);
        }
        if (block.timestamp - lastShitTime[tokenId] < SHIT_COOLDOWN) {
            revert NotShittableYet();
        }

        lastShitTime[tokenId] = block.timestamp;
        _mint(
            tokenOwner,
            shitPerCyclePerTier(apexDeities.tokenTier(uint256(tokenId))),
            true,
            ""
        );
    }

    error NotOwner(address sender);
    error NotShittableYet();
    error NoMoreShitToGive();
}
