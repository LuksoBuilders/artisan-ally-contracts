// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFeeCollector {
    function insertMintFee(uint256 founder) external payable;
    function insertFee(uint256 amount) external;
    function withdrawDeity(uint256 deityId) external;
    function withdrawBuilders() external;
    function withdrawMarketing() external;
}
