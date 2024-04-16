// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BeaconProxy} from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

contract BeaconProxyFactory {
    constructor() {}

    function createBeaconProxy(
        address beacon,
        bytes memory data
    ) public returns (address) {
        return address(new BeaconProxy(beacon, data));
    }
}
