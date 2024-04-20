// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {LSP7DigitalAssetInitAbstract} from "@lukso/lsp7-contracts/contracts/LSP7DigitalAssetInitAbstract.sol";

import {ILSP7DigitalAsset} from "@lukso/lsp7-contracts/contracts/ILSP7DigitalAsset.sol";
import {IArtisanAlly} from "./interfaces/IArtisanAlly.sol";

contract ContributionTokenLogic is Initializable, LSP7DigitalAssetInitAbstract {
    IArtisanAlly public _artisanAlly;
    ILSP7DigitalAsset public _fellowship;
    ILSP7DigitalAsset public _holyShit;

    address public _divineDungDepot;

    // backer contributer =>  amount
    mapping(address => uint256) public _contributionHistory;

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
        address fellowship,
        address holyShit
    ) public initializer {
        _artisanAlly = IArtisanAlly(artisanAlly);
        _fellowship = ILSP7DigitalAsset(fellowship);
        _holyShit = ILSP7DigitalAsset(holyShit);
        _initialize(
            string(abi.encodePacked(name, " Contribution Token")),
            string(abi.encodePacked(symbol, "CT")),
            address(this),
            1,
            true
        );
        _divineDungDepot = 0x4242424242424242424242424242424242424242;
    }

    // Managing fellowship
    function owner() public view override returns (address) {
        bytes32 fellowshipTokenId = bytes32(
            abi.encodePacked(address(_fellowship))
        );
        return _artisanAlly.tokenOwnerOf(fellowshipTokenId);
    }

    function contribute(uint256 amount, address contributer) public {
        if (_fellowship.balanceOf(msg.sender) < amount) {
            revert NotOwnEnoughBackerBuck();
        }
        _fellowship.transfer(msg.sender, address(this), amount, true, "");
        _contributionHistory[contributer] += amount;
        _mint(contributer, amount, true, "");
        emit Contributed(amount, contributer);
    }

    function purify(uint256 amount) public {
        if (_contributionHistory[msg.sender] < amount) {
            revert NotEnoughContributed();
        }
        _holyShit.transfer(
            msg.sender,
            _divineDungDepot,
            amount * 100 ether,
            true,
            ""
        );
        _contributionHistory[msg.sender] -= amount;
        _fellowship.transfer(address(this), msg.sender, amount, true, "");
        emit Purified(amount);
    }

    error NotTransferable();
    error NotOwnEnoughBackerBuck();
    error NotEnoughContributed();

    event Contributed(uint256 indexed amount, address indexed contributer);
    event Purified(uint256 indexed amount);
}
