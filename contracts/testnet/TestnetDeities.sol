// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {LSP4DigitalAssetMetadata} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol";
import {LSP8IdentifiableDigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";

error UnAuthorized();
error FailedWithdrawal();

error OutofBoundTokenId(uint256 tokenId);

error WrongValue(uint256 providedAmount, uint256 neededAmount);
error MaxedOutSupply();

// must be ownable
// must be lsp8
// owner must be able to set data
contract TestnetDeities is LSP8IdentifiableDigitalAsset {
    uint256 public constant MAX_SUPPLY = 100;
    uint256 public constant S_TIER_SUPPLY = 25;
    uint256 public constant A_TIER_SUPPLY = 25;
    uint256 public constant B_TIER_SUPPLY = 25;
    uint256 public constant C_TIER_SUPPLY = 25;

    uint256 public constant S_TIER_START = 0;
    uint256 public constant A_TIER_START = 25;
    uint256 public constant B_TIER_START = 50;
    uint256 public constant C_TIER_START = 75;

    uint256 public constant BASE_PRICE = 0.0001 ether;
    uint256 public constant S_TIER_PRICE = 100 * BASE_PRICE;
    uint256 public constant A_TIER_PRICE = 75 * BASE_PRICE;
    uint256 public constant B_TIER_PRICE = 50 * BASE_PRICE;
    uint256 public constant C_TIER_PRICE = 25 * BASE_PRICE;

    uint256 public sTierMinted;
    uint256 public aTierMinted;
    uint256 public bTierMinted;
    uint256 public cTierMinted;

    enum Tier {
        S,
        A,
        B,
        C
    }

    struct Order {
        uint8 sTierAmount;
        uint8 aTierAmount;
        uint8 bTierAmount;
        uint8 cTierAmount;
    }

    constructor(
        address initialOwner_
    )
        LSP8IdentifiableDigitalAsset(
            "Apex Deities",
            "APXD",
            initialOwner_,
            2,
            0
        )
    {}

    function withdraw(uint256 amount) public {
        if (msg.sender != owner()) {
            revert UnAuthorized();
        }
        address _to = payable(msg.sender);
        (bool sent, ) = _to.call{value: amount}("");
        if (!sent) {
            revert FailedWithdrawal();
        } else {
            emit Withdrawal(msg.sender, amount);
        }
    }

    function tokenTier(uint256 tokenId) public pure returns (Tier) {
        if (tokenId >= MAX_SUPPLY) {
            revert OutofBoundTokenId({tokenId: tokenId});
        }
        if (tokenId < A_TIER_START) return Tier.S;
        if (tokenId < B_TIER_START) return Tier.A;
        if (tokenId < C_TIER_START) return Tier.B;
        return Tier.C;
    }

    function getOrderPrice(Order memory order) public pure returns (uint256) {
        return
            order.sTierAmount *
            S_TIER_PRICE +
            order.aTierAmount *
            A_TIER_PRICE +
            order.bTierAmount *
            B_TIER_PRICE +
            order.cTierAmount *
            C_TIER_PRICE;
    }

    function mint(Order memory order) public payable {
        uint256 orderPrice = getOrderPrice(order);
        if (msg.value != orderPrice) {
            revert WrongValue({
                providedAmount: msg.value,
                neededAmount: orderPrice
            });
        }

        for (uint8 amount = 0; amount < order.sTierAmount; amount++) {
            _mintSTier();
        }

        for (uint8 amount = 0; amount < order.aTierAmount; amount++) {
            _mintATier();
        }

        for (uint8 amount = 0; amount < order.bTierAmount; amount++) {
            _mintBTier();
        }

        for (uint8 amount = 0; amount < order.cTierAmount; amount++) {
            _mintCTier();
        }
    }

    function _mintSTier() internal {
        uint256 tokenId = S_TIER_START + sTierMinted;
        if (tokenId >= A_TIER_START) {
            revert MaxedOutSupply();
        }
        _mint(msg.sender, bytes32(tokenId), true, "");
        sTierMinted++;
    }

    function _mintATier() internal {
        uint256 tokenId = A_TIER_START + aTierMinted;
        if (tokenId >= B_TIER_START) {
            revert MaxedOutSupply();
        }
        _mint(msg.sender, bytes32(tokenId), true, "");
        aTierMinted++;
    }

    function _mintBTier() internal {
        uint256 tokenId = B_TIER_START + bTierMinted;
        if (tokenId >= C_TIER_START) {
            revert MaxedOutSupply();
        }
        _mint(msg.sender, bytes32(tokenId), true, "");
        bTierMinted++;
    }

    function _mintCTier() internal {
        uint256 tokenId = C_TIER_START + cTierMinted;
        if (tokenId >= MAX_SUPPLY) {
            revert MaxedOutSupply();
        }
        _mint(msg.sender, bytes32(tokenId), true, "");
        cTierMinted++;
    }

    event Withdrawal(address owner, uint256 amount);
}
