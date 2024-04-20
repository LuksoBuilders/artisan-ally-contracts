// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {IApexDeities} from "../IApexDeities.sol";
import {ILevelManager} from "./interfaces/ILevelManager.sol";

contract FeeCollector is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    uint256 public constant CALCULATION_DENOMINATOR = 10000;
    uint256 public constant TEAM_SHARES_NUMERATOR = 1875;

    IApexDeities public _apexDeities;
    ILevelManager public _levelManager;

    // This will store the 1/10000 total amount of system fee collected
    // The amount of system fee that will belong to each actor will be calculated based on this.
    uint256 public _systemFeeCollectedAtom;

    // deity => amount of direct fee
    mapping(uint256 => uint256) public _directFees;

    // deity => amount of harvested
    mapping(uint256 => uint256) public _harvests;

    address public _builderTeam;
    address public _marketingTeam;

    uint256 public _builderWithdrawals;
    uint256 public _marketingWithdrawals;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address apexDeities,
        address levelManager,
        address builderTeam,
        address marketingTeam
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _apexDeities = IApexDeities(apexDeities);
        _levelManager = ILevelManager(levelManager);
        _builderTeam = builderTeam;
        _marketingTeam = marketingTeam;
        emit CollectorInitialized(
            defaultAdmin,
            apexDeities,
            levelManager,
            builderTeam,
            marketingTeam
        );
    }

    function changeBuilderTeam(address newBuilderTeam) public {
        if (
            msg.sender != _builderTeam &&
            !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)
        ) {
            revert NotAuthorized();
        }
        _builderTeam = newBuilderTeam;
        emit BuilderTeamChanged(newBuilderTeam);
    }

    function changeMarketingTeam(address newMarketingTeam) public {
        if (
            msg.sender != _marketingTeam &&
            !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)
        ) {
            revert NotAuthorized();
        }
        _marketingTeam = newMarketingTeam;
        emit MarketingTeamChanged(newMarketingTeam);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    // This function provides the base slot of each deity id based on their tier list
    function getDirectFeePercent(
        uint256 deityId
    ) public pure returns (uint256 fee) {
        if (deityId > 99) {
            revert NonExistentDeity();
        }
        if (deityId < 25) {
            fee = 1000;
        } else if (deityId < 50) {
            fee = 750;
        } else if (deityId < 75) {
            fee = 500;
        } else {
            fee = 250;
        }
    }

    function getSystemFeePercent(
        uint256 deityId
    ) public pure returns (uint256 fee) {
        if (deityId > 99) {
            revert NonExistentDeity();
        }
        if (deityId < 25) {
            fee = 100;
        } else if (deityId < 50) {
            fee = 75;
        } else if (deityId < 75) {
            fee = 50;
        } else {
            fee = 25;
        }
    }

    function insertMintFee(uint256 founder) public payable {
        uint256 directFee = (msg.value * getDirectFeePercent(founder)) /
            CALCULATION_DENOMINATOR;
        _directFees[founder] += directFee;
        emit DirectFeeInserted(founder, directFee);
        insertFee(msg.value - directFee);
    }

    function insertFee(uint256 amount) public {
        uint256 collectedAtomAmount = amount / CALCULATION_DENOMINATOR;
        _systemFeeCollectedAtom += collectedAtomAmount;
        emit FeeInserted(_systemFeeCollectedAtom);
    }

    function deityHarvestableBalance(
        uint256 deityId
    ) public view returns (uint256) {
        return
            getSystemFeePercent(deityId) *
            _systemFeeCollectedAtom +
            _directFees[deityId] -
            _harvests[deityId];
    }

    function harvestDeity(uint256 deityId) public {
        if (_apexDeities.tokenOwnerOf(bytes32(deityId)) != msg.sender) {
            revert NotAuthorized();
        }
        uint256 harvestableBalance = deityHarvestableBalance(deityId);
        _harvests[deityId] += harvestableBalance;
        (bool sent, ) = msg.sender.call{value: harvestableBalance}("");
        if (!sent) {
            revert WithdrawalFailed();
        }
        emit DeityHarvested(deityId, harvestableBalance);
        _levelManager.increaseXP(deityId, harvestableBalance);
    }

    function buildersWithdrawableBalance() public view returns (uint256) {
        return
            _systemFeeCollectedAtom *
            TEAM_SHARES_NUMERATOR -
            _builderWithdrawals;
    }

    function withdrawBuilders() public {
        if (msg.sender != _builderTeam) {
            revert NotAuthorized();
        }
        uint256 withdrawableBalance = buildersWithdrawableBalance();
        _builderWithdrawals += withdrawableBalance;
        (bool sent, ) = msg.sender.call{value: withdrawableBalance}("");
        if (!sent) {
            revert WithdrawalFailed();
        }
        emit BuilderWithdrawal(msg.sender, withdrawableBalance);
    }

    function marketingWithdrawableBalance() public view returns (uint256) {
        return
            _systemFeeCollectedAtom *
            TEAM_SHARES_NUMERATOR -
            _marketingWithdrawals;
    }

    function withdrawMarketing() public {
        if (msg.sender != _marketingTeam) {
            revert NotAuthorized();
        }
        uint256 withdrawableBalance = marketingWithdrawableBalance();
        _marketingWithdrawals += withdrawableBalance;
        (bool sent, ) = msg.sender.call{value: withdrawableBalance}("");
        if (!sent) {
            revert WithdrawalFailed();
        }
        emit MarketingWithdrawal(msg.sender, withdrawableBalance);
    }

    error NonExistentDeity();
    error NotAuthorized();
    error WithdrawalFailed();

    event CollectorInitialized(
        address admin,
        address apexDeities,
        address levelManager,
        address builderTeam,
        address marketingTeam
    );
    event BuilderTeamChanged(address newTeam);
    event MarketingTeamChanged(address newTeam);

    event DirectFeeInserted(uint256 founder, uint256 amount);
    event FeeInserted(uint256 collectedAtomAmount);

    event DeityHarvested(uint256 indexed deityId, uint256 amount);
    event BuilderWithdrawal(address indexed builderTeam, uint256 amount);
    event MarketingWithdrawal(address indexed marketingTeam, uint256 amount);
}
