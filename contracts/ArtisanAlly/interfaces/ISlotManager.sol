// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ILevelManager} from "./ILevelManager.sol";

interface ISlotManager {
    // Constants
    function getSlotCooldown() external pure returns (uint256);

    // Variables
    function getSlotCooldown(
        uint256 deityId,
        uint256 slot
    ) external view returns (uint256);
    function getLevelManager() external view returns (ILevelManager);

    // Getter functions
    function getBaseSlots(uint256 deityId) external pure returns (uint256);
    function getTotalSlots(uint256 deityId) external view returns (uint256);

    function useSlot(uint256 deityId, uint256 slot) external;
}
