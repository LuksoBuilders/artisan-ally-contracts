// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {LSP7DigitalAssetInitAbstract} from "@lukso/lsp7-contracts/contracts/LSP7DigitalAssetInitAbstract.sol";

import {_LSP4_METADATA_KEY} from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";
import {IBeaconProxyFactory} from "./interfaces/IBeaconProxyFactory.sol";
import {IApexDeities} from "../IApexDeities.sol";
import {IFeeCollector} from "./interfaces/IFeeCollector.sol";
import {IArtisanAlly} from "./interfaces/IArtisanAlly.sol";

import "hardhat/console.sol";

contract FellowshipLogic is Initializable, LSP7DigitalAssetInitAbstract {
    uint256 public constant CALCULATION_DENOMINATOR = 10000;

    IBeaconProxyFactory public _beaconProxyFactory;
    address public _contributionBeacon;
    address public _endorsementBeacon;

    bool private _isSettedUp;

    IApexDeities public _apexDeities;
    uint256 public founder;
    IArtisanAlly public _artisanAlly;
    IFeeCollector public _feeCollector;

    address public _contributionTokenAddress;
    address public _endorsementTokenAddress;

    uint256 public _backerbuckInitialPrice;
    uint256 public _backerbuckPriceGrowth;

    uint256 public _earlyAccessFinish;

    constructor() {
        _disableInitializers();
        _isSettedUp = true;
    }

    function setup(
        address artisanAlly,
        address apexDeities,
        address feeCollector,
        uint256 founderDeity,
        address beaconProxyFactory,
        address contributionBeacon,
        address endorsementBeacon,
        uint256 backerbuckInitialPrice,
        uint256 backerbuckPriceGrowth,
        uint256 earlyAccessFinish
    ) public {
        if (_isSettedUp) {
            revert AlreadySettedUp();
        }
        _artisanAlly = IArtisanAlly(artisanAlly);
        _apexDeities = IApexDeities(apexDeities);
        founder = founderDeity;
        _beaconProxyFactory = IBeaconProxyFactory(beaconProxyFactory);
        _feeCollector = IFeeCollector(feeCollector);

        _contributionBeacon = contributionBeacon;
        _endorsementBeacon = endorsementBeacon;
        _isSettedUp = true;
        _backerbuckInitialPrice = backerbuckInitialPrice;
        _backerbuckPriceGrowth = backerbuckPriceGrowth;
        _earlyAccessFinish = earlyAccessFinish;
    }

    function initialize(
        string memory name_,
        string memory symbol_,
        bytes memory initialMetaData
    ) public initializer onlyOwner {
        _initialize(name_, symbol_, address(this), 1, true);
        _setData(_LSP4_METADATA_KEY, initialMetaData);

        // Creating the contribution token
        _contributionTokenAddress = address(
            _beaconProxyFactory.createBeaconProxy(
                address(_contributionBeacon),
                abi.encodeWithSignature("initialize()")
            )
        );

        // Creating the endorsement token
        _endorsementTokenAddress = address(
            _beaconProxyFactory.createBeaconProxy(
                address(_endorsementBeacon),
                abi.encodeWithSignature("initialize()")
            )
        );
    }

    function isEarlyAccess() public view returns (bool) {
        return block.timestamp < _earlyAccessFinish;
    }

    // Managing fellowship
    function owner() public view override returns (address) {
        bytes32 fellowshipTokenId = bytes32(abi.encodePacked(address(this)));
        return _artisanAlly.tokenOwnerOf(fellowshipTokenId);
    }

    function getFounder() public view returns (uint256) {
        return founder;
    }

    function getMintPrice(
        uint256 currentSupply,
        uint256 amount
    ) public view returns (uint256 currentSupplyPrice, uint256 totalPrice) {
        uint256 base = CALCULATION_DENOMINATOR + _backerbuckPriceGrowth; // 1.015 * DENOMINATOR
        currentSupplyPrice = _backerbuckInitialPrice;

        for (uint256 i = 0; i < currentSupply; i++) {
            currentSupplyPrice =
                (currentSupplyPrice * base) /
                CALCULATION_DENOMINATOR;
        }

        totalPrice += currentSupplyPrice;
        for (uint256 i = currentSupply + 1; i < currentSupply + amount; i++) {
            currentSupplyPrice =
                (currentSupplyPrice * base) /
                CALCULATION_DENOMINATOR;
            totalPrice += currentSupplyPrice;
        }

        return (currentSupplyPrice, totalPrice);
    }

    function mint(uint256 amount) public payable {
        if (isEarlyAccess() && _apexDeities.balanceOf(msg.sender) == 0) {
            revert OnlyDeityOwnersHaveEarlyAccess();
        }
        uint256 currentSupply = totalSupply();
        (, uint256 totalNeededPrice) = getMintPrice(currentSupply, amount);
        if (msg.value != totalNeededPrice) {
            revert WrongValue();
        }

        // sending fee collector money
        uint256 systemFee = (_artisanAlly._systemFeeShare() * msg.value) /
            CALCULATION_DENOMINATOR;
        (bool systemFeeSuccess, ) = address(_feeCollector).call{
            value: systemFee
        }(abi.encodeWithSignature("insertMintFee(uint256)", founder));

        // sending artisan money
        bytes32 fellowshipTokenId = bytes32(abi.encodePacked(address(this)));
        uint256 artisanShare = msg.value - systemFee;
        address artisanAddress = _artisanAlly.tokenOwnerOf(fellowshipTokenId);
        (bool artisanShareSuccess, ) = _artisanAlly
            .tokenOwnerOf(fellowshipTokenId)
            .call{value: artisanShare}("");

        if (!systemFeeSuccess || !artisanShareSuccess) {
            revert FailedToSendValues();
        }

        _mint(msg.sender, amount, true, "");
        emit BackerBuckMinted(amount, systemFee, artisanShare, artisanAddress);
    }

    error AlreadySettedUp();
    error WrongValue();
    error OnlyDeityOwnersHaveEarlyAccess();
    error FailedToSendValues();

    event BackerBuckMinted(
        uint256 amount,
        uint256 systemFee,
        uint256 artisanShare,
        address artisanAddress
    );
}
