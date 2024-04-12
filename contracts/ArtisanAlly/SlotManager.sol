// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {IApexDeities} from "../IApexDeities.sol";

import {ILevelManager} from "./interfaces/ILevelManager.sol";

contract SlotManager is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    uint256 public constant SLOT_COOLDOWN = 1 weeks;

    bytes32 public constant SLOT_MANIPULATOR = keccak256("SLOT_MANIPULATOR");

    ILevelManager public _levelManager;

    // From deityId ==> mapping( slot => cooldown slots)
    mapping(uint256 => mapping(uint256 => uint256)) public cooldowns;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address levelManager
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);

        _levelManager = ILevelManager(levelManager);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    // Getter functions

    function getSlotCooldown() external pure returns (uint256) {
        return SLOT_COOLDOWN;
    }

    function getSlotCooldown(
        uint256 deityId,
        uint256 slot
    ) external view returns (uint256) {
        return cooldowns[deityId][slot];
    }

    function getLevelManager() external view returns (ILevelManager) {
        return _levelManager;
    }

    // This function provides the base slot of each deity id based on their tier list
    function getBaseSlots(uint256 deityId) public pure returns (uint256 slots) {
        if (deityId > 99) {
            revert NonExistentDeity();
        }
        if (deityId < 25) {
            slots = 4;
        } else if (deityId < 50) {
            slots = 3;
        } else if (deityId < 75) {
            slots = 2;
        } else {
            slots = 1;
        }
    }

    // This function provides the total slot of each deity id based on their tier list and their level
    function getTotalSlots(
        uint256 deityId
    ) public view returns (uint256 slots) {
        slots = getBaseSlots(deityId) + _levelManager.getDeityLevel(deityId);
    }

    function useSlot(
        uint256 deityId,
        uint256 slot
    ) public onlyRole(SLOT_MANIPULATOR) {
        if (
            slot >= getTotalSlots(deityId) ||
            block.timestamp - cooldowns[deityId][slot] < SLOT_COOLDOWN
        ) {
            revert NotAvailableSlot();
        }
        cooldowns[deityId][slot] = block.timestamp;
        emit SlotUsed(deityId, slot, block.timestamp + SLOT_COOLDOWN);
    }

    error NonExistentDeity();
    error NotAvailableSlot();

    event SlotUsed(uint256 indexed deityId, uint256 slot, uint256 cooldownAt);
}
