import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LSP8CappedSupply
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lsp8CappedSupplyAbi = [
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesEmptyArray' },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesLengthMismatch' },
  { type: 'error', inputs: [], name: 'ERC725Y_MsgValueDisallowed' },
  {
    type: 'error',
    inputs: [{ name: 'storedData', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidExtensionAddress',
  },
  {
    type: 'error',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidFunctionSelector',
  },
  { type: 'error', inputs: [], name: 'LSP4TokenNameNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenSymbolNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenTypeNotEditable' },
  {
    type: 'error',
    inputs: [{ name: 'callIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'LSP8BatchCallFailed',
  },
  { type: 'error', inputs: [], name: 'LSP8CannotSendToAddressZero' },
  { type: 'error', inputs: [], name: 'LSP8CannotUseAddressZeroAsOperator' },
  { type: 'error', inputs: [], name: 'LSP8CappedSupplyCannotMintOverCap' },
  { type: 'error', inputs: [], name: 'LSP8CappedSupplyRequired' },
  { type: 'error', inputs: [], name: 'LSP8InvalidTransferBatch' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8NonExistentTokenId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8NonExistingOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverContractMissingLSP1Interface',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverIsEOA',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8OperatorAlreadyAuthorized',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8RevokeOperatorNotAuthorized',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenContractCannotHoldValue' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdFormatNotEditable' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataEmptyArray' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataLengthMismatch' },
  { type: 'error', inputs: [], name: 'LSP8TokenOwnerCannotBeOperator' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8TokenOwnerChanged',
  },
  {
    type: 'error',
    inputs: [
      { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'NoExtensionFoundForFunctionSelector',
  },
  {
    type: 'error',
    inputs: [
      { name: 'callerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'OwnableCallerNotTheOwner',
  },
  { type: 'error', inputs: [], name: 'OwnableCannotSetZeroAddressAsOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'DataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorAuthorizationChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'notified', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'TokenIdDataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'force', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Transfer',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'authorizeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'batchCalls',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'dataKey', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getData',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatch',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatchForTokenIds',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getDataForTokenId',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getOperatorsOf',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isOperatorFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'notify', internalType: 'bool', type: 'bool' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'revokeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatch',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatchForTokenIds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setDataForTokenId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'tokenIdsOf',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'tokenOwnerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenSupplyCap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'tokenId', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'force', internalType: 'bool[]', type: 'bool[]' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'transferBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LSP8CappedSupplyInitAbstract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lsp8CappedSupplyInitAbstractAbi = [
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesEmptyArray' },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesLengthMismatch' },
  { type: 'error', inputs: [], name: 'ERC725Y_MsgValueDisallowed' },
  {
    type: 'error',
    inputs: [{ name: 'storedData', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidExtensionAddress',
  },
  {
    type: 'error',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidFunctionSelector',
  },
  { type: 'error', inputs: [], name: 'LSP4TokenNameNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenSymbolNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenTypeNotEditable' },
  {
    type: 'error',
    inputs: [{ name: 'callIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'LSP8BatchCallFailed',
  },
  { type: 'error', inputs: [], name: 'LSP8CannotSendToAddressZero' },
  { type: 'error', inputs: [], name: 'LSP8CannotUseAddressZeroAsOperator' },
  { type: 'error', inputs: [], name: 'LSP8CappedSupplyCannotMintOverCap' },
  { type: 'error', inputs: [], name: 'LSP8CappedSupplyRequired' },
  { type: 'error', inputs: [], name: 'LSP8InvalidTransferBatch' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8NonExistentTokenId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8NonExistingOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverContractMissingLSP1Interface',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverIsEOA',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8OperatorAlreadyAuthorized',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8RevokeOperatorNotAuthorized',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenContractCannotHoldValue' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdFormatNotEditable' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataEmptyArray' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataLengthMismatch' },
  { type: 'error', inputs: [], name: 'LSP8TokenOwnerCannotBeOperator' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8TokenOwnerChanged',
  },
  {
    type: 'error',
    inputs: [
      { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'NoExtensionFoundForFunctionSelector',
  },
  {
    type: 'error',
    inputs: [
      { name: 'callerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'OwnableCallerNotTheOwner',
  },
  { type: 'error', inputs: [], name: 'OwnableCannotSetZeroAddressAsOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'DataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorAuthorizationChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'notified', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'TokenIdDataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'force', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Transfer',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'authorizeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'batchCalls',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'dataKey', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getData',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatch',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatchForTokenIds',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getDataForTokenId',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getOperatorsOf',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isOperatorFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'notify', internalType: 'bool', type: 'bool' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'revokeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatch',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatchForTokenIds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setDataForTokenId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'tokenIdsOf',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'tokenOwnerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenSupplyCap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'tokenId', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'force', internalType: 'bool[]', type: 'bool[]' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'transferBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LSP8IdentifiableDigitalAsset
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lsp8IdentifiableDigitalAssetAbi = [
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesEmptyArray' },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesLengthMismatch' },
  { type: 'error', inputs: [], name: 'ERC725Y_MsgValueDisallowed' },
  {
    type: 'error',
    inputs: [{ name: 'storedData', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidExtensionAddress',
  },
  {
    type: 'error',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidFunctionSelector',
  },
  { type: 'error', inputs: [], name: 'LSP4TokenNameNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenSymbolNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenTypeNotEditable' },
  {
    type: 'error',
    inputs: [{ name: 'callIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'LSP8BatchCallFailed',
  },
  { type: 'error', inputs: [], name: 'LSP8CannotSendToAddressZero' },
  { type: 'error', inputs: [], name: 'LSP8CannotUseAddressZeroAsOperator' },
  { type: 'error', inputs: [], name: 'LSP8InvalidTransferBatch' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8NonExistentTokenId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8NonExistingOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverContractMissingLSP1Interface',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverIsEOA',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8OperatorAlreadyAuthorized',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8RevokeOperatorNotAuthorized',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenContractCannotHoldValue' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdFormatNotEditable' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataEmptyArray' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataLengthMismatch' },
  { type: 'error', inputs: [], name: 'LSP8TokenOwnerCannotBeOperator' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8TokenOwnerChanged',
  },
  {
    type: 'error',
    inputs: [
      { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'NoExtensionFoundForFunctionSelector',
  },
  {
    type: 'error',
    inputs: [
      { name: 'callerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'OwnableCallerNotTheOwner',
  },
  { type: 'error', inputs: [], name: 'OwnableCannotSetZeroAddressAsOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'DataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorAuthorizationChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'notified', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'TokenIdDataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'force', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Transfer',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'authorizeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'batchCalls',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'dataKey', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getData',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatch',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatchForTokenIds',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getDataForTokenId',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getOperatorsOf',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isOperatorFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'notify', internalType: 'bool', type: 'bool' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'revokeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatch',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatchForTokenIds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setDataForTokenId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'tokenIdsOf',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'tokenOwnerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'tokenId', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'force', internalType: 'bool[]', type: 'bool[]' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'transferBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LSP8IdentifiableDigitalAssetInitAbstract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lsp8IdentifiableDigitalAssetInitAbstractAbi = [
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesEmptyArray' },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesLengthMismatch' },
  { type: 'error', inputs: [], name: 'ERC725Y_MsgValueDisallowed' },
  {
    type: 'error',
    inputs: [{ name: 'storedData', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidExtensionAddress',
  },
  {
    type: 'error',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidFunctionSelector',
  },
  { type: 'error', inputs: [], name: 'LSP4TokenNameNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenSymbolNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenTypeNotEditable' },
  {
    type: 'error',
    inputs: [{ name: 'callIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'LSP8BatchCallFailed',
  },
  { type: 'error', inputs: [], name: 'LSP8CannotSendToAddressZero' },
  { type: 'error', inputs: [], name: 'LSP8CannotUseAddressZeroAsOperator' },
  { type: 'error', inputs: [], name: 'LSP8InvalidTransferBatch' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8NonExistentTokenId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8NonExistingOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverContractMissingLSP1Interface',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverIsEOA',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8OperatorAlreadyAuthorized',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8RevokeOperatorNotAuthorized',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenContractCannotHoldValue' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdFormatNotEditable' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataEmptyArray' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataLengthMismatch' },
  { type: 'error', inputs: [], name: 'LSP8TokenOwnerCannotBeOperator' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8TokenOwnerChanged',
  },
  {
    type: 'error',
    inputs: [
      { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'NoExtensionFoundForFunctionSelector',
  },
  {
    type: 'error',
    inputs: [
      { name: 'callerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'OwnableCallerNotTheOwner',
  },
  { type: 'error', inputs: [], name: 'OwnableCannotSetZeroAddressAsOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'DataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorAuthorizationChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'notified', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'TokenIdDataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'force', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Transfer',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'authorizeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'batchCalls',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'dataKey', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getData',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatch',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatchForTokenIds',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getDataForTokenId',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getOperatorsOf',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isOperatorFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'notify', internalType: 'bool', type: 'bool' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'revokeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatch',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatchForTokenIds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setDataForTokenId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'tokenIdsOf',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'tokenOwnerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'tokenId', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'force', internalType: 'bool[]', type: 'bool[]' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'transferBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LSP8Mintable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lsp8MintableAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      { name: 'newOwner_', internalType: 'address', type: 'address' },
      { name: 'lsp4TokenType_', internalType: 'uint256', type: 'uint256' },
      { name: 'lsp8TokenIdFormat_', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesEmptyArray' },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesLengthMismatch' },
  { type: 'error', inputs: [], name: 'ERC725Y_MsgValueDisallowed' },
  {
    type: 'error',
    inputs: [{ name: 'storedData', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidExtensionAddress',
  },
  {
    type: 'error',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidFunctionSelector',
  },
  { type: 'error', inputs: [], name: 'LSP4TokenNameNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenSymbolNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenTypeNotEditable' },
  {
    type: 'error',
    inputs: [{ name: 'callIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'LSP8BatchCallFailed',
  },
  { type: 'error', inputs: [], name: 'LSP8CannotSendToAddressZero' },
  { type: 'error', inputs: [], name: 'LSP8CannotUseAddressZeroAsOperator' },
  { type: 'error', inputs: [], name: 'LSP8InvalidTransferBatch' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8NonExistentTokenId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8NonExistingOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverContractMissingLSP1Interface',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverIsEOA',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8OperatorAlreadyAuthorized',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8RevokeOperatorNotAuthorized',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenContractCannotHoldValue' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8TokenIdAlreadyMinted',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenIdFormatNotEditable' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataEmptyArray' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataLengthMismatch' },
  { type: 'error', inputs: [], name: 'LSP8TokenOwnerCannotBeOperator' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8TokenOwnerChanged',
  },
  {
    type: 'error',
    inputs: [
      { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'NoExtensionFoundForFunctionSelector',
  },
  {
    type: 'error',
    inputs: [
      { name: 'callerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'OwnableCallerNotTheOwner',
  },
  { type: 'error', inputs: [], name: 'OwnableCannotSetZeroAddressAsOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'DataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorAuthorizationChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'notified', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'TokenIdDataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'force', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Transfer',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'authorizeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'batchCalls',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'dataKey', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getData',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatch',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatchForTokenIds',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getDataForTokenId',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getOperatorsOf',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isOperatorFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'notify', internalType: 'bool', type: 'bool' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'revokeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatch',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatchForTokenIds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setDataForTokenId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'tokenIdsOf',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'tokenOwnerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'tokenId', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'force', internalType: 'bool[]', type: 'bool[]' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'transferBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LSP8MintableInit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lsp8MintableInitAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesEmptyArray' },
  { type: 'error', inputs: [], name: 'ERC725Y_DataKeysValuesLengthMismatch' },
  { type: 'error', inputs: [], name: 'ERC725Y_MsgValueDisallowed' },
  {
    type: 'error',
    inputs: [{ name: 'storedData', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidExtensionAddress',
  },
  {
    type: 'error',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidFunctionSelector',
  },
  { type: 'error', inputs: [], name: 'LSP4TokenNameNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenSymbolNotEditable' },
  { type: 'error', inputs: [], name: 'LSP4TokenTypeNotEditable' },
  {
    type: 'error',
    inputs: [{ name: 'callIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'LSP8BatchCallFailed',
  },
  { type: 'error', inputs: [], name: 'LSP8CannotSendToAddressZero' },
  { type: 'error', inputs: [], name: 'LSP8CannotUseAddressZeroAsOperator' },
  { type: 'error', inputs: [], name: 'LSP8InvalidTransferBatch' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8NonExistentTokenId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8NonExistingOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOperator',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotTokenOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverContractMissingLSP1Interface',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8NotifyTokenReceiverIsEOA',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8OperatorAlreadyAuthorized',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'tokenOwner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'LSP8RevokeOperatorNotAuthorized',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenContractCannotHoldValue' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'LSP8TokenIdAlreadyMinted',
  },
  { type: 'error', inputs: [], name: 'LSP8TokenIdFormatNotEditable' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataEmptyArray' },
  { type: 'error', inputs: [], name: 'LSP8TokenIdsDataLengthMismatch' },
  { type: 'error', inputs: [], name: 'LSP8TokenOwnerCannotBeOperator' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'LSP8TokenOwnerChanged',
  },
  {
    type: 'error',
    inputs: [
      { name: 'functionSelector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'NoExtensionFoundForFunctionSelector',
  },
  {
    type: 'error',
    inputs: [
      { name: 'callerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'OwnableCallerNotTheOwner',
  },
  { type: 'error', inputs: [], name: 'OwnableCannotSetZeroAddressAsOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'DataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorAuthorizationChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'notified', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'dataValue',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'TokenIdDataChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'force', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Transfer',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'authorizeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'batchCalls',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'dataKey', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getData',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatch',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'getDataBatchForTokenIds',
    outputs: [{ name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getDataForTokenId',
    outputs: [{ name: 'dataValue', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getOperatorsOf',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      { name: 'newOwner_', internalType: 'address', type: 'address' },
      { name: 'lsp4TokenType_', internalType: 'uint256', type: 'uint256' },
      { name: 'lsp8TokenIdFormat_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isOperatorFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'notify', internalType: 'bool', type: 'bool' },
      {
        name: 'operatorNotificationData',
        internalType: 'bytes',
        type: 'bytes',
      },
    ],
    name: 'revokeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatch',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataKeys', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'dataValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'setDataBatchForTokenIds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'dataValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setDataForTokenId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenOwner', internalType: 'address', type: 'address' }],
    name: 'tokenIdsOf',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'tokenOwnerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'force', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'tokenId', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'force', internalType: 'bool[]', type: 'bool[]' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'transferBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__
 */
export const useReadLsp8CappedSupply = /*#__PURE__*/ createUseReadContract({
  abi: lsp8CappedSupplyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLsp8CappedSupplyBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"getData"`
 */
export const useReadLsp8CappedSupplyGetData =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'getData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"getDataBatch"`
 */
export const useReadLsp8CappedSupplyGetDataBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'getDataBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"getDataBatchForTokenIds"`
 */
export const useReadLsp8CappedSupplyGetDataBatchForTokenIds =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'getDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"getDataForTokenId"`
 */
export const useReadLsp8CappedSupplyGetDataForTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'getDataForTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"getOperatorsOf"`
 */
export const useReadLsp8CappedSupplyGetOperatorsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'getOperatorsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"isOperatorFor"`
 */
export const useReadLsp8CappedSupplyIsOperatorFor =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'isOperatorFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLsp8CappedSupplyOwner = /*#__PURE__*/ createUseReadContract(
  { abi: lsp8CappedSupplyAbi, functionName: 'owner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLsp8CappedSupplySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"tokenIdsOf"`
 */
export const useReadLsp8CappedSupplyTokenIdsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'tokenIdsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"tokenOwnerOf"`
 */
export const useReadLsp8CappedSupplyTokenOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'tokenOwnerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"tokenSupplyCap"`
 */
export const useReadLsp8CappedSupplyTokenSupplyCap =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'tokenSupplyCap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLsp8CappedSupplyTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__
 */
export const useWriteLsp8CappedSupply = /*#__PURE__*/ createUseWriteContract({
  abi: lsp8CappedSupplyAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useWriteLsp8CappedSupplyAuthorizeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useWriteLsp8CappedSupplyBatchCalls =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLsp8CappedSupplyRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useWriteLsp8CappedSupplyRevokeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setData"`
 */
export const useWriteLsp8CappedSupplySetData =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useWriteLsp8CappedSupplySetDataBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useWriteLsp8CappedSupplySetDataBatchForTokenIds =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useWriteLsp8CappedSupplySetDataForTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLsp8CappedSupplyTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useWriteLsp8CappedSupplyTransferBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLsp8CappedSupplyTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__
 */
export const useSimulateLsp8CappedSupply =
  /*#__PURE__*/ createUseSimulateContract({ abi: lsp8CappedSupplyAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useSimulateLsp8CappedSupplyAuthorizeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useSimulateLsp8CappedSupplyBatchCalls =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLsp8CappedSupplyRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useSimulateLsp8CappedSupplyRevokeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setData"`
 */
export const useSimulateLsp8CappedSupplySetData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useSimulateLsp8CappedSupplySetDataBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useSimulateLsp8CappedSupplySetDataBatchForTokenIds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useSimulateLsp8CappedSupplySetDataForTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLsp8CappedSupplyTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useSimulateLsp8CappedSupplyTransferBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLsp8CappedSupplyTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__
 */
export const useWatchLsp8CappedSupplyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: lsp8CappedSupplyAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `eventName` set to `"DataChanged"`
 */
export const useWatchLsp8CappedSupplyDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyAbi,
    eventName: 'DataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `eventName` set to `"OperatorAuthorizationChanged"`
 */
export const useWatchLsp8CappedSupplyOperatorAuthorizationChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyAbi,
    eventName: 'OperatorAuthorizationChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `eventName` set to `"OperatorRevoked"`
 */
export const useWatchLsp8CappedSupplyOperatorRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyAbi,
    eventName: 'OperatorRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLsp8CappedSupplyOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `eventName` set to `"TokenIdDataChanged"`
 */
export const useWatchLsp8CappedSupplyTokenIdDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyAbi,
    eventName: 'TokenIdDataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLsp8CappedSupplyTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__
 */
export const useReadLsp8CappedSupplyInitAbstract =
  /*#__PURE__*/ createUseReadContract({ abi: lsp8CappedSupplyInitAbstractAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLsp8CappedSupplyInitAbstractBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"getData"`
 */
export const useReadLsp8CappedSupplyInitAbstractGetData =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'getData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"getDataBatch"`
 */
export const useReadLsp8CappedSupplyInitAbstractGetDataBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'getDataBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"getDataBatchForTokenIds"`
 */
export const useReadLsp8CappedSupplyInitAbstractGetDataBatchForTokenIds =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'getDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"getDataForTokenId"`
 */
export const useReadLsp8CappedSupplyInitAbstractGetDataForTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'getDataForTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"getOperatorsOf"`
 */
export const useReadLsp8CappedSupplyInitAbstractGetOperatorsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'getOperatorsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"isOperatorFor"`
 */
export const useReadLsp8CappedSupplyInitAbstractIsOperatorFor =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'isOperatorFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLsp8CappedSupplyInitAbstractOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLsp8CappedSupplyInitAbstractSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"tokenIdsOf"`
 */
export const useReadLsp8CappedSupplyInitAbstractTokenIdsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'tokenIdsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"tokenOwnerOf"`
 */
export const useReadLsp8CappedSupplyInitAbstractTokenOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'tokenOwnerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"tokenSupplyCap"`
 */
export const useReadLsp8CappedSupplyInitAbstractTokenSupplyCap =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'tokenSupplyCap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLsp8CappedSupplyInitAbstractTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__
 */
export const useWriteLsp8CappedSupplyInitAbstract =
  /*#__PURE__*/ createUseWriteContract({ abi: lsp8CappedSupplyInitAbstractAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useWriteLsp8CappedSupplyInitAbstractAuthorizeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useWriteLsp8CappedSupplyInitAbstractBatchCalls =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLsp8CappedSupplyInitAbstractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useWriteLsp8CappedSupplyInitAbstractRevokeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setData"`
 */
export const useWriteLsp8CappedSupplyInitAbstractSetData =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useWriteLsp8CappedSupplyInitAbstractSetDataBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useWriteLsp8CappedSupplyInitAbstractSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useWriteLsp8CappedSupplyInitAbstractSetDataForTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLsp8CappedSupplyInitAbstractTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useWriteLsp8CappedSupplyInitAbstractTransferBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLsp8CappedSupplyInitAbstractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__
 */
export const useSimulateLsp8CappedSupplyInitAbstract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractAuthorizeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractBatchCalls =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractRevokeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setData"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractSetData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractSetDataBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractSetDataForTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractTransferBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLsp8CappedSupplyInitAbstractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8CappedSupplyInitAbstractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__
 */
export const useWatchLsp8CappedSupplyInitAbstractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `eventName` set to `"DataChanged"`
 */
export const useWatchLsp8CappedSupplyInitAbstractDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
    eventName: 'DataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchLsp8CappedSupplyInitAbstractInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `eventName` set to `"OperatorAuthorizationChanged"`
 */
export const useWatchLsp8CappedSupplyInitAbstractOperatorAuthorizationChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
    eventName: 'OperatorAuthorizationChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `eventName` set to `"OperatorRevoked"`
 */
export const useWatchLsp8CappedSupplyInitAbstractOperatorRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
    eventName: 'OperatorRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLsp8CappedSupplyInitAbstractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `eventName` set to `"TokenIdDataChanged"`
 */
export const useWatchLsp8CappedSupplyInitAbstractTokenIdDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
    eventName: 'TokenIdDataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8CappedSupplyInitAbstractAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLsp8CappedSupplyInitAbstractTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8CappedSupplyInitAbstractAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__
 */
export const useReadLsp8IdentifiableDigitalAsset =
  /*#__PURE__*/ createUseReadContract({ abi: lsp8IdentifiableDigitalAssetAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"getData"`
 */
export const useReadLsp8IdentifiableDigitalAssetGetData =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'getData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"getDataBatch"`
 */
export const useReadLsp8IdentifiableDigitalAssetGetDataBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'getDataBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"getDataBatchForTokenIds"`
 */
export const useReadLsp8IdentifiableDigitalAssetGetDataBatchForTokenIds =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'getDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"getDataForTokenId"`
 */
export const useReadLsp8IdentifiableDigitalAssetGetDataForTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'getDataForTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"getOperatorsOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetGetOperatorsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'getOperatorsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"isOperatorFor"`
 */
export const useReadLsp8IdentifiableDigitalAssetIsOperatorFor =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'isOperatorFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLsp8IdentifiableDigitalAssetOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLsp8IdentifiableDigitalAssetSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"tokenIdsOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetTokenIdsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'tokenIdsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"tokenOwnerOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetTokenOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'tokenOwnerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLsp8IdentifiableDigitalAssetTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__
 */
export const useWriteLsp8IdentifiableDigitalAsset =
  /*#__PURE__*/ createUseWriteContract({ abi: lsp8IdentifiableDigitalAssetAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useWriteLsp8IdentifiableDigitalAssetAuthorizeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useWriteLsp8IdentifiableDigitalAssetBatchCalls =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLsp8IdentifiableDigitalAssetRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useWriteLsp8IdentifiableDigitalAssetRevokeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setData"`
 */
export const useWriteLsp8IdentifiableDigitalAssetSetData =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useWriteLsp8IdentifiableDigitalAssetSetDataBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useWriteLsp8IdentifiableDigitalAssetSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useWriteLsp8IdentifiableDigitalAssetSetDataForTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLsp8IdentifiableDigitalAssetTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useWriteLsp8IdentifiableDigitalAssetTransferBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLsp8IdentifiableDigitalAssetTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__
 */
export const useSimulateLsp8IdentifiableDigitalAsset =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetAuthorizeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetBatchCalls =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetRevokeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setData"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetSetData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetSetDataBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetSetDataForTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetTransferBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__
 */
export const useWatchLsp8IdentifiableDigitalAssetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `eventName` set to `"DataChanged"`
 */
export const useWatchLsp8IdentifiableDigitalAssetDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetAbi,
    eventName: 'DataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `eventName` set to `"OperatorAuthorizationChanged"`
 */
export const useWatchLsp8IdentifiableDigitalAssetOperatorAuthorizationChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetAbi,
    eventName: 'OperatorAuthorizationChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `eventName` set to `"OperatorRevoked"`
 */
export const useWatchLsp8IdentifiableDigitalAssetOperatorRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetAbi,
    eventName: 'OperatorRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLsp8IdentifiableDigitalAssetOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `eventName` set to `"TokenIdDataChanged"`
 */
export const useWatchLsp8IdentifiableDigitalAssetTokenIdDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetAbi,
    eventName: 'TokenIdDataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLsp8IdentifiableDigitalAssetTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstract =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"getData"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractGetData =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'getData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"getDataBatch"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractGetDataBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'getDataBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"getDataBatchForTokenIds"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractGetDataBatchForTokenIds =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'getDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"getDataForTokenId"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractGetDataForTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'getDataForTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"getOperatorsOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractGetOperatorsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'getOperatorsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"isOperatorFor"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractIsOperatorFor =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'isOperatorFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"tokenIdsOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractTokenIdsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'tokenIdsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"tokenOwnerOf"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractTokenOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'tokenOwnerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLsp8IdentifiableDigitalAssetInitAbstractTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstract =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractAuthorizeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractBatchCalls =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractRevokeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setData"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractSetData =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractSetDataBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractSetDataForTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractTransferBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLsp8IdentifiableDigitalAssetInitAbstractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractAuthorizeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractBatchCalls =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractRevokeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setData"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractSetData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractSetDataBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractSetDataForTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractTransferBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLsp8IdentifiableDigitalAssetInitAbstractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `eventName` set to `"DataChanged"`
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    eventName: 'DataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `eventName` set to `"OperatorAuthorizationChanged"`
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractOperatorAuthorizationChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    eventName: 'OperatorAuthorizationChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `eventName` set to `"OperatorRevoked"`
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractOperatorRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    eventName: 'OperatorRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `eventName` set to `"TokenIdDataChanged"`
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractTokenIdDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    eventName: 'TokenIdDataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8IdentifiableDigitalAssetInitAbstractAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLsp8IdentifiableDigitalAssetInitAbstractTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8IdentifiableDigitalAssetInitAbstractAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__
 */
export const useReadLsp8Mintable = /*#__PURE__*/ createUseReadContract({
  abi: lsp8MintableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLsp8MintableBalanceOf = /*#__PURE__*/ createUseReadContract(
  { abi: lsp8MintableAbi, functionName: 'balanceOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"getData"`
 */
export const useReadLsp8MintableGetData = /*#__PURE__*/ createUseReadContract({
  abi: lsp8MintableAbi,
  functionName: 'getData',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"getDataBatch"`
 */
export const useReadLsp8MintableGetDataBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'getDataBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"getDataBatchForTokenIds"`
 */
export const useReadLsp8MintableGetDataBatchForTokenIds =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'getDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"getDataForTokenId"`
 */
export const useReadLsp8MintableGetDataForTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'getDataForTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"getOperatorsOf"`
 */
export const useReadLsp8MintableGetOperatorsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'getOperatorsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"isOperatorFor"`
 */
export const useReadLsp8MintableIsOperatorFor =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'isOperatorFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLsp8MintableOwner = /*#__PURE__*/ createUseReadContract({
  abi: lsp8MintableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLsp8MintableSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"tokenIdsOf"`
 */
export const useReadLsp8MintableTokenIdsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'tokenIdsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"tokenOwnerOf"`
 */
export const useReadLsp8MintableTokenOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'tokenOwnerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLsp8MintableTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__
 */
export const useWriteLsp8Mintable = /*#__PURE__*/ createUseWriteContract({
  abi: lsp8MintableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useWriteLsp8MintableAuthorizeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useWriteLsp8MintableBatchCalls =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteLsp8MintableMint = /*#__PURE__*/ createUseWriteContract({
  abi: lsp8MintableAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLsp8MintableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useWriteLsp8MintableRevokeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setData"`
 */
export const useWriteLsp8MintableSetData = /*#__PURE__*/ createUseWriteContract(
  { abi: lsp8MintableAbi, functionName: 'setData' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useWriteLsp8MintableSetDataBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useWriteLsp8MintableSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useWriteLsp8MintableSetDataForTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLsp8MintableTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useWriteLsp8MintableTransferBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLsp8MintableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__
 */
export const useSimulateLsp8Mintable = /*#__PURE__*/ createUseSimulateContract({
  abi: lsp8MintableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useSimulateLsp8MintableAuthorizeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useSimulateLsp8MintableBatchCalls =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateLsp8MintableMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLsp8MintableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useSimulateLsp8MintableRevokeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setData"`
 */
export const useSimulateLsp8MintableSetData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useSimulateLsp8MintableSetDataBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useSimulateLsp8MintableSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useSimulateLsp8MintableSetDataForTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLsp8MintableTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useSimulateLsp8MintableTransferBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLsp8MintableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableAbi}__
 */
export const useWatchLsp8MintableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: lsp8MintableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableAbi}__ and `eventName` set to `"DataChanged"`
 */
export const useWatchLsp8MintableDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableAbi,
    eventName: 'DataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableAbi}__ and `eventName` set to `"OperatorAuthorizationChanged"`
 */
export const useWatchLsp8MintableOperatorAuthorizationChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableAbi,
    eventName: 'OperatorAuthorizationChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableAbi}__ and `eventName` set to `"OperatorRevoked"`
 */
export const useWatchLsp8MintableOperatorRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableAbi,
    eventName: 'OperatorRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLsp8MintableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableAbi}__ and `eventName` set to `"TokenIdDataChanged"`
 */
export const useWatchLsp8MintableTokenIdDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableAbi,
    eventName: 'TokenIdDataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLsp8MintableTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__
 */
export const useReadLsp8MintableInit = /*#__PURE__*/ createUseReadContract({
  abi: lsp8MintableInitAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLsp8MintableInitBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"getData"`
 */
export const useReadLsp8MintableInitGetData =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'getData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"getDataBatch"`
 */
export const useReadLsp8MintableInitGetDataBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'getDataBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"getDataBatchForTokenIds"`
 */
export const useReadLsp8MintableInitGetDataBatchForTokenIds =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'getDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"getDataForTokenId"`
 */
export const useReadLsp8MintableInitGetDataForTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'getDataForTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"getOperatorsOf"`
 */
export const useReadLsp8MintableInitGetOperatorsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'getOperatorsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"isOperatorFor"`
 */
export const useReadLsp8MintableInitIsOperatorFor =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'isOperatorFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLsp8MintableInitOwner = /*#__PURE__*/ createUseReadContract(
  { abi: lsp8MintableInitAbi, functionName: 'owner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLsp8MintableInitSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"tokenIdsOf"`
 */
export const useReadLsp8MintableInitTokenIdsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'tokenIdsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"tokenOwnerOf"`
 */
export const useReadLsp8MintableInitTokenOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'tokenOwnerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLsp8MintableInitTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: lsp8MintableInitAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__
 */
export const useWriteLsp8MintableInit = /*#__PURE__*/ createUseWriteContract({
  abi: lsp8MintableInitAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useWriteLsp8MintableInitAuthorizeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useWriteLsp8MintableInitBatchCalls =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteLsp8MintableInitInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteLsp8MintableInitMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLsp8MintableInitRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useWriteLsp8MintableInitRevokeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setData"`
 */
export const useWriteLsp8MintableInitSetData =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useWriteLsp8MintableInitSetDataBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useWriteLsp8MintableInitSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useWriteLsp8MintableInitSetDataForTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLsp8MintableInitTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useWriteLsp8MintableInitTransferBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLsp8MintableInitTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lsp8MintableInitAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__
 */
export const useSimulateLsp8MintableInit =
  /*#__PURE__*/ createUseSimulateContract({ abi: lsp8MintableInitAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"authorizeOperator"`
 */
export const useSimulateLsp8MintableInitAuthorizeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'authorizeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"batchCalls"`
 */
export const useSimulateLsp8MintableInitBatchCalls =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'batchCalls',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateLsp8MintableInitInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateLsp8MintableInitMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLsp8MintableInitRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"revokeOperator"`
 */
export const useSimulateLsp8MintableInitRevokeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'revokeOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setData"`
 */
export const useSimulateLsp8MintableInitSetData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setDataBatch"`
 */
export const useSimulateLsp8MintableInitSetDataBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setDataBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setDataBatchForTokenIds"`
 */
export const useSimulateLsp8MintableInitSetDataBatchForTokenIds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setDataBatchForTokenIds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"setDataForTokenId"`
 */
export const useSimulateLsp8MintableInitSetDataForTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'setDataForTokenId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLsp8MintableInitTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"transferBatch"`
 */
export const useSimulateLsp8MintableInitTransferBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'transferBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLsp8MintableInitTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lsp8MintableInitAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__
 */
export const useWatchLsp8MintableInitEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: lsp8MintableInitAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `eventName` set to `"DataChanged"`
 */
export const useWatchLsp8MintableInitDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableInitAbi,
    eventName: 'DataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchLsp8MintableInitInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableInitAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `eventName` set to `"OperatorAuthorizationChanged"`
 */
export const useWatchLsp8MintableInitOperatorAuthorizationChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableInitAbi,
    eventName: 'OperatorAuthorizationChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `eventName` set to `"OperatorRevoked"`
 */
export const useWatchLsp8MintableInitOperatorRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableInitAbi,
    eventName: 'OperatorRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLsp8MintableInitOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableInitAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `eventName` set to `"TokenIdDataChanged"`
 */
export const useWatchLsp8MintableInitTokenIdDataChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableInitAbi,
    eventName: 'TokenIdDataChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsp8MintableInitAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLsp8MintableInitTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lsp8MintableInitAbi,
    eventName: 'Transfer',
  })
