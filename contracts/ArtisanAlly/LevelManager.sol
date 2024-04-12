// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {ILevelManager} from "./interfaces/ILevelManager.sol";

contract LevelManager is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    ILevelManager
{
    uint256 public constant CALCULATION_DENOMINATOR = 10000;
    uint256 public _experienceLevelIncreaseNumerator;

    bytes32 public constant EXPERIENCE_MANIPULATOR =
        keccak256("EXPERIENCE_MANIPULATOR");

    uint256[] public experienceLevels;
    uint256[] public totalExperienceLevels;

    // mapping tokenId => deity experience
    mapping(uint256 => uint256) public deityXPs;
    // mapping tokenId => level
    mapping(uint256 => uint256) public deityLevels;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address experienceManipulator,
        uint256 initialLevelExperience,
        uint256 experienceLevelIncreaseNumerator
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(EXPERIENCE_MANIPULATOR, experienceManipulator);

        experienceLevels.push(initialLevelExperience);
        totalExperienceLevels.push(0);
        totalExperienceLevels.push(initialLevelExperience);
        _experienceLevelIncreaseNumerator = experienceLevelIncreaseNumerator;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    // Getter functions
    function getExperienceLevelIncreaseNumerator()
        external
        view
        returns (uint256)
    {
        return _experienceLevelIncreaseNumerator;
    }

    function getExperienceLevel(uint256 index) external view returns (uint256) {
        return experienceLevels[index];
    }

    function getTotalExperienceLevel(
        uint256 index
    ) external view returns (uint256) {
        return totalExperienceLevels[index];
    }

    function getDeityXP(uint256 tokenId) external view returns (uint256) {
        return deityXPs[tokenId];
    }

    function getDeityLevel(uint256 tokenId) external view returns (uint256) {
        return deityLevels[tokenId];
    }

    // XP manipulation function
    function setNextExperienceLevel() public returns (uint256 experience) {
        experience =
            (experienceLevels[experienceLevels.length - 1] *
                (CALCULATION_DENOMINATOR + _experienceLevelIncreaseNumerator)) /
            CALCULATION_DENOMINATOR;
        experienceLevels.push(experience);
        totalExperienceLevels.push(
            totalExperienceLevels[totalExperienceLevels.length - 1] + experience
        );
    }

    function increaseXP(
        uint256 deityId,
        uint256 amount
    ) public onlyRole(EXPERIENCE_MANIPULATOR) {
        deityXPs[deityId] += amount;
        emit XPIncreased(deityId, amount);
        uint256 newDeityXPLevel = deityXPs[deityId];

        uint256 currentDeityLevel = deityLevels[deityId];

        uint256 newDeityLevel = deityLevels[deityId];
        uint256 nextLevelTotalThreshold = totalExperienceLevels[
            newDeityLevel + 1
        ];
        while (newDeityXPLevel >= nextLevelTotalThreshold) {
            deityLevels[deityId]++;
            newDeityLevel = deityLevels[deityId];
            if (totalExperienceLevels.length <= newDeityLevel + 1) {
                setNextExperienceLevel();
            }
            nextLevelTotalThreshold = totalExperienceLevels[newDeityLevel + 1];
        }

        newDeityLevel = deityLevels[deityId];
        if (newDeityLevel - currentDeityLevel > 0) {
            emit LevelIncreased(
                deityId,
                newDeityLevel - currentDeityLevel,
                newDeityLevel
            );
        }
    }

    event XPIncreased(uint256 deityId, uint256 amount);
    event LevelIncreased(uint256 deityId, uint256 lvls, uint256 newLevel);
}
