import {ILSP8IdentifiableDigitalAsset} from "@lukso/lsp8-contracts/contracts/ILSP8IdentifiableDigitalAsset.sol";

interface IApexDeities is ILSP8IdentifiableDigitalAsset {
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

    function withdraw(uint256 amount) external;
    function tokenTier(uint256 tokenId) external pure returns (Tier);
    function mint(Order memory order) external payable;
    function getOrderPrice(Order memory order) external pure returns (uint256);

    error UnAuthorized();
    error FailedWithdrawal();

    error OutofBoundTokenId(uint256 tokenId);

    error WrongValue(uint256 providedAmount, uint256 neededAmount);
    error MaxedOutSupply();
}
