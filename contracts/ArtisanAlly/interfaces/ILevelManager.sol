// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ILevelManager {
    function getExperienceLevelIncreaseNumerator()
        external
        view
        returns (uint256);
    function getExperienceLevel(uint256 index) external view returns (uint256);
    function getTotalExperienceLevel(
        uint256 index
    ) external view returns (uint256);
    function getDeityXP(uint256 tokenId) external view returns (uint256);
    function getDeityLevel(uint256 tokenId) external view returns (uint256);

    function initialize(
        address defaultAdmin,
        address experienceManipulator,
        uint256 initialLevelExperience,
        uint256 experienceLevelIncreaseNumerator
    ) external;

    function setNextExperienceLevel() external returns (uint256 experience);

    function increaseXP(uint256 deityId, uint256 amount) external;
}
