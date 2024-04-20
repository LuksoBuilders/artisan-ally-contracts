// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {LSP7DigitalAssetInitAbstract} from "@lukso/lsp7-contracts/contracts/LSP7DigitalAssetInitAbstract.sol";

import {ILSP7DigitalAsset} from "@lukso/lsp7-contracts/contracts/ILSP7DigitalAsset.sol";
import {IArtisanAlly} from "./interfaces/IArtisanAlly.sol";

contract EndorsementTokenLogic is Initializable, LSP7DigitalAssetInitAbstract {
    IArtisanAlly public _artisanAlly;
    ILSP7DigitalAsset public _fellowship;

    // backer buck owner => endorsers => amount
    mapping(address => mapping(address => uint256)) public _endorsementHistory;

    constructor() {
        _disableInitializers();
    }

    function _transfer(
        address from,
        address to,
        uint256 amount,
        bool force,
        bytes memory data
    ) internal override {
        revert NotTransferable();
    }

    function initialize(
        string memory name,
        string memory symbol,
        address artisanAlly,
        address fellowship
    ) public initializer {
        _artisanAlly = IArtisanAlly(artisanAlly);
        _fellowship = ILSP7DigitalAsset(fellowship);
        _initialize(
            string(abi.encodePacked(name, " Endorsement Token")),
            string(abi.encodePacked(symbol, "ET")),
            address(this),
            1,
            true
        );
    }

    // Managing fellowship
    function owner() public view override returns (address) {
        bytes32 fellowshipTokenId = bytes32(
            abi.encodePacked(address(_fellowship))
        );
        return _artisanAlly.tokenOwnerOf(fellowshipTokenId);
    }

    function endorse(uint256 amount, address endorser) public {
        if (_fellowship.balanceOf(msg.sender) < amount) {
            revert NotOwnEnoughBackerBuck();
        }
        _fellowship.transfer(msg.sender, address(this), amount, true, "");
        _endorsementHistory[msg.sender][endorser] += amount;
        _mint(endorser, amount, true, "");
        emit Endorsed(amount, endorser);
    }

    function revokeEndorsement(uint256 amount, address from) public {
        if (_endorsementHistory[msg.sender][from] < amount) {
            revert NotEnoughEndorsed();
        }
        _endorsementHistory[msg.sender][from] -= amount;
        _fellowship.transfer(address(this), msg.sender, amount, true, "");
        _burn(from, amount, "");
        emit RevokedEndorsement(amount, from);
    }

    error NotTransferable();
    error NotOwnEnoughBackerBuck();
    error NotEnoughEndorsed();

    event Endorsed(uint256 indexed amount, address indexed endorser);
    event RevokedEndorsement(uint256 indexed amount, address indexed from);
}
