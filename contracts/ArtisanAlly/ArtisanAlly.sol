// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {LSP8IdentifiableDigitalAssetInitAbstract} from "../UpgradeSafeLSPs/lsp8-contracts/contracts/LSP8IdentifiableDigitalAssetInitAbstract.sol";

import {ISlotManager} from "./interfaces/ISlotManager.sol";
import {IBeaconProxyFactory} from "./interfaces/IBeaconProxyFactory.sol";
import {IFeeCollector} from "./interfaces/IFeeCollector.sol";

import {IApexDeities} from "../IApexDeities.sol";

import {Beacon} from "./Beacon.sol";

contract ArtisanAlly is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    LSP8IdentifiableDigitalAssetInitAbstract
{
    uint256 public constant CALCULATION_DENOMINATOR = 10000;
    uint256 public constant EARLY_ACCESS = 7 days;

    Beacon public _fellowshipBeacon;
    IBeaconProxyFactory public _beaconProxyFactory;
    IApexDeities public _apexDeities;
    ISlotManager public _slotManager;
    IFeeCollector public _feeCollector;

    address public _contributionBeacon;
    address public _endorsementBeacon;

    uint256 public _backerbuckInitialPrice;
    uint256 public _backerbuckPriceGrowth;

    uint256 public _systemFeeShare;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address fellowshipBeacon,
        address beaconProxyFactory,
        address apexDeities,
        address slotManager,
        address feeCollector,
        address contributionBeacon,
        address endorsementBeacon
    ) public initializer {
        _initialize("MyToken", "MTK", defaultAdmin, 2, 2);
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);

        _fellowshipBeacon = Beacon(fellowshipBeacon);
        _beaconProxyFactory = IBeaconProxyFactory(beaconProxyFactory);
        _apexDeities = IApexDeities(apexDeities);
        _slotManager = ISlotManager(slotManager);
        _feeCollector = IFeeCollector(feeCollector);

        _contributionBeacon = contributionBeacon;
        _endorsementBeacon = endorsementBeacon;

        changeBackerBuckPrice(1 ether, 150);

        _systemFeeShare = 2000;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    function changeSystemFeeShare(
        uint256 newSystemFeeShare
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newSystemFeeShare > 2000) {
            revert SystemFeeShareOutOfBound();
        }
        _systemFeeShare = newSystemFeeShare;
        emit SystemFeeShareChange(newSystemFeeShare);
    }

    function changeBackerBuckPrice(
        uint256 backerbuckInitialPrice,
        uint256 backerbuckPriceGrowth
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _backerbuckInitialPrice = backerbuckInitialPrice;
        _backerbuckPriceGrowth = backerbuckPriceGrowth;
        emit BackerBuckPricesChange(
            backerbuckInitialPrice,
            backerbuckPriceGrowth
        );
    }

    // view functions
    function getFellowshipTokenId(
        address fellowship
    ) public pure returns (bytes32) {
        return bytes32(abi.encodePacked(fellowship));
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(
            LSP8IdentifiableDigitalAssetInitAbstract,
            AccessControlUpgradeable
        )
        returns (bool)
    {
        return (LSP8IdentifiableDigitalAssetInitAbstract.supportsInterface(
            interfaceId
        ) || AccessControlUpgradeable.supportsInterface(interfaceId));
    }

    function foundFellowship(
        uint256 deityId,
        uint256 slot,
        address artisan
    ) public {
        if (_apexDeities.tokenOwnerOf(bytes32(deityId)) != msg.sender) {
            revert NotDeityOwner();
        }
        _slotManager.useSlot(deityId, slot);
        address fellowshipContractAddress = address(
            _beaconProxyFactory.createBeaconProxy(
                address(_fellowshipBeacon),
                abi.encodeWithSignature(
                    "setup(address,address,address,uint256,address,address,address,uint256,uint256,uint256)",
                    address(this),
                    address(_apexDeities),
                    address(_feeCollector),
                    deityId,
                    address(_beaconProxyFactory),
                    _contributionBeacon,
                    _endorsementBeacon,
                    _backerbuckInitialPrice,
                    _backerbuckPriceGrowth,
                    block.timestamp + EARLY_ACCESS
                )
            )
        );
        _mint(
            artisan,
            getFellowshipTokenId(fellowshipContractAddress),
            true,
            ""
        );
        emit FellowshipFounded(
            fellowshipContractAddress,
            deityId,
            artisan,
            _backerbuckInitialPrice,
            _backerbuckPriceGrowth
        );
    }

    error NotDeityOwner();
    error SystemFeeShareOutOfBound();

    event SystemFeeShareChange(uint256 newSystemFeeShare);

    event FellowshipFounded(
        address indexed fellowship,
        uint256 indexed deityId,
        address indexed artisan,
        uint256 initialPrice,
        uint256 priceGrowth
    );

    event BackerBuckPricesChange(
        uint256 backerbuckInitialPrice,
        uint256 backerbuckPriceGrowth
    );
}
