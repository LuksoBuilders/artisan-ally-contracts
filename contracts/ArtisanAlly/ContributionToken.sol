// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ContributionTokenLogic is Initializable {
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {}

    function contribute(uint256 amount, address contributer) public {}

    function purify(uint256 amount) public {}

    error NotOwnEnoughBackerBuck();
    error NotEnoughContributed();

    event Contributed(uint256 indexed amount, address indexed contributer);
    event Purified(uint256 indexed amount);
}
