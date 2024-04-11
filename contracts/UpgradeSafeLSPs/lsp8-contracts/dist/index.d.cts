declare const INTERFACE_ID_LSP8 = "0x3a271706";
declare const LSP8DataKeys: {
    LSP8TokenIdFormat: string;
    LSP8TokenMetadataBaseURI: string;
    LSP8ReferenceContract: string;
};
declare const LSP8_TYPE_IDS: {
    LSP8Tokens_SenderNotification: string;
    LSP8Tokens_RecipientNotification: string;
    LSP8Tokens_OperatorNotification: string;
};
/**
 * @dev List of LSP8 Token ID Formats that can be used to create different types of NFTs and represent each NFT identifiers (= tokenIds) differently.
 * @see For details see: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat
 */
declare const LSP8_TOKEN_ID_FORMAT: {
    NUMBER: number;
    STRING: number;
    ADDRESS: number;
    UNIQUE_ID: number;
    HASH: number;
    MIXED_DEFAULT_NUMBER: number;
    MIXED_DEFAULT_STRING: number;
    MIXED_DEFAULT_ADDRESS: number;
    MIXED_DEFAULT_UNIQUE_ID: number;
    MIXED_DEFAULT_HASH: number;
};

export { INTERFACE_ID_LSP8, LSP8DataKeys, LSP8_TOKEN_ID_FORMAT, LSP8_TYPE_IDS };
