// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HelperContract {
    constructor() {}

    /// Helper bytes functions
    function uintToBytes32(uint256 number) public pure returns (bytes32) {
        return bytes32(number);
    }
}
