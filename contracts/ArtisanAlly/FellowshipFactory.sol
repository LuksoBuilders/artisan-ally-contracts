// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FellowshipProxy} from "./FellowshipProxy.sol";

contract FellowshipFactory {
    constructor() {}

    function createFellowshipBeaconProxy(
        address beacon,
        bytes memory data
    ) public returns (address) {
        return address(new FellowshipProxy(beacon, data));
    }
}
