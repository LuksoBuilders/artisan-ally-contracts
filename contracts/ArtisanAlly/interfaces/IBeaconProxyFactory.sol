// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBeaconProxyFactory {
    function createBeaconProxy(
        address beacon,
        bytes memory data
    ) external returns (address);
}
