// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {LSP8IdentifiableDigitalAssetInitAbstract} from "../UpgradeSafeLSPs/lsp8-contracts/contracts/LSP8IdentifiableDigitalAssetInitAbstract.sol";

import {ISlotManager} from "./interfaces/ISlotManager.sol";
import {IFellowshipFactory} from "./interfaces/IFellowshipFactory.sol";
import {IApexDeities} from "../IApexDeities.sol";

import {FellowshipBeacon} from "./FellowshipBeacon.sol";

contract ArtisanAlly is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    LSP8IdentifiableDigitalAssetInitAbstract
{
    FellowshipBeacon public _fellowshipBeacon;
    IFellowshipFactory public _fellowshipFactory;
    IApexDeities public _apexDeities;
    ISlotManager public _slotManager;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address fellowshipBeacon,
        address fellowshipFactory,
        address apexDeities,
        address slotManager
    ) public initializer {
        _initialize("MyToken", "MTK", defaultAdmin, 2, 2);
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);

        _fellowshipBeacon = FellowshipBeacon(fellowshipBeacon);
        _fellowshipFactory = IFellowshipFactory(fellowshipFactory);
        _apexDeities = IApexDeities(apexDeities);
        _slotManager = ISlotManager(slotManager);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

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
            _fellowshipFactory.createFellowshipBeaconProxy(
                address(_fellowshipBeacon),
                abi.encodeWithSignature("initialize()")
            )
        );
        _mint(
            artisan,
            getFellowshipTokenId(fellowshipContractAddress),
            true,
            ""
        );
        emit FellowshipFounded(fellowshipContractAddress, deityId, artisan);
    }

    error NotDeityOwner();

    event FellowshipFounded(
        address indexed fellowship,
        uint256 indexed deityId,
        address indexed artisan
    );
}
