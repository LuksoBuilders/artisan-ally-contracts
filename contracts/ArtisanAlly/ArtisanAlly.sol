// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {LSP8IdentifiableDigitalAssetInitAbstract} from "../UpgradeSafeLSPs/lsp8-contracts/contracts/LSP8IdentifiableDigitalAssetInitAbstract.sol";

contract ArtisanAlly is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    LSP8IdentifiableDigitalAssetInitAbstract
{
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address upgrader
    ) public initializer {
        _initialize("MyToken", "MTK", defaultAdmin, 2, 2);
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(UPGRADER_ROLE) {}

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
}
