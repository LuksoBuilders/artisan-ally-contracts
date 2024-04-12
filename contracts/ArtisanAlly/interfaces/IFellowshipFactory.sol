// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFellowshipFactory {
    function createFellowshipBeaconProxy(
        address beacon,
        bytes memory data
    ) external returns (address);
}
