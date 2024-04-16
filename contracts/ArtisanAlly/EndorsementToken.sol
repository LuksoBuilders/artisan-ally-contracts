// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract EndorsementTokenLogic is Initializable {
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {}

    function endorse(uint256 amount, address endorser) public {}

    function revokeEndorsement(uint256 amount, address from) public {}

    error NotOwnEnoughBackerBuck();
    error NotEnoughEndorsed();

    event Endorsed(uint256 indexed amount, address indexed endorser);
    event RevokedEndorsement(uint256 indexed amount, address indexed from);
}
