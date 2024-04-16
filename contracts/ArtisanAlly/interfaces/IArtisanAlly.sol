// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ILSP8IdentifiableDigitalAsset} from "@lukso/lsp8-contracts/contracts/ILSP8IdentifiableDigitalAsset.sol";

interface IArtisanAlly is ILSP8IdentifiableDigitalAsset {
    function _systemFeeShare() external view returns (uint256);
}
