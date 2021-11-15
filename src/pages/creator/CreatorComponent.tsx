import {
  Components,
  ensureTokenAmount,
  Network,
  ReefSigner,
  rpc,
  Token,
  TokenWithAmount,
  utils as reefUtils,

} from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import {
  BigNumber, utils, ContractFactory, Contract,
} from 'ethers';
import { AxiosResponse } from 'axios';
import { delay } from '../../utils/utils';
import {ReefContract, VerificationContractReq, verifyContract} from '../../utils/contract';
import {currentNetwork} from "../../environment";

const {
  Display, Card: CardModule, TokenAmountFieldMax, Modal, Loading, Input: InputModule,
  TokenAmountView, Label, Button: ButtonModule,
} = Components;
const {
  ComponentCenter, MT, CenterColumn, Margin, CenterRow,
} = Display;
const {
  CardHeader, CardHeaderBlank, CardTitle, Card,
} = CardModule;
const {
  OpenModalButton, default: ConfirmationModal, ModalFooter, ModalBody,
} = Modal;
const { LoadingButtonIconWithText } = Loading;
const { Input } = InputModule;
const { ConfirmLabel } = Label;
const { calculateUsdAmount } = reefUtils;
const { Button } = ButtonModule;

interface CreatorComponent {
    signer: ReefSigner | undefined;
}

export const CreatorComponent = ({
  signer,
}: CreatorComponent): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [tokenName, setTokenName] = useState('Reefy');
  const [symbol, setSymbol] = useState('RFY');
  const [initialSupply, setTotalSupply] = useState(utils.parseEther('1000000000').toString());

  const createToken = async (): Promise<void> => {
    if (!signer) {
      console.log('signer not set ');
      return;
    }
    const reef20Abi = [
      {
        inputs: [
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'initialSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    const reef20Bytecode = {
      generatedSources: [
        {
          ast: {
            nodeType: 'YulBlock',
            src: '0:5790:5',
            statements: [
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '102:259:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '112:75:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '179:6:5',
                              },
                            ],
                            functionName: {
                              name: 'array_allocation_size_t_string_memory_ptr',
                              nodeType: 'YulIdentifier',
                              src: '137:41:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '137:49:5',
                          },
                        ],
                        functionName: {
                          name: 'allocate_memory',
                          nodeType: 'YulIdentifier',
                          src: '121:15:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '121:66:5',
                      },
                      variableNames: [
                        {
                          name: 'array',
                          nodeType: 'YulIdentifier',
                          src: '112:5:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'array',
                            nodeType: 'YulIdentifier',
                            src: '203:5:5',
                          },
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '210:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '196:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '196:21:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '196:21:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '226:27:5',
                      value: {
                        arguments: [
                          {
                            name: 'array',
                            nodeType: 'YulIdentifier',
                            src: '241:5:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '248:4:5',
                            type: '',
                            value: '0x20',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '237:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '237:16:5',
                      },
                      variables: [
                        {
                          name: 'dst',
                          nodeType: 'YulTypedName',
                          src: '230:3:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '291:16:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '300:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '303:1:5',
                                  type: '',
                                  value: '0',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '293:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '293:12:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '293:12:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'src',
                                nodeType: 'YulIdentifier',
                                src: '272:3:5',
                              },
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '277:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '268:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '268:16:5',
                          },
                          {
                            name: 'end',
                            nodeType: 'YulIdentifier',
                            src: '286:3:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '265:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '265:25:5',
                      },
                      nodeType: 'YulIf',
                      src: '262:2:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'src',
                            nodeType: 'YulIdentifier',
                            src: '338:3:5',
                          },
                          {
                            name: 'dst',
                            nodeType: 'YulIdentifier',
                            src: '343:3:5',
                          },
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '348:6:5',
                          },
                        ],
                        functionName: {
                          name: 'copy_memory_to_memory',
                          nodeType: 'YulIdentifier',
                          src: '316:21:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '316:39:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '316:39:5',
                    },
                  ],
                },
                name: 'abi_decode_available_length_t_string_memory_ptr_fromMemory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'src',
                    nodeType: 'YulTypedName',
                    src: '75:3:5',
                    type: '',
                  },
                  {
                    name: 'length',
                    nodeType: 'YulTypedName',
                    src: '80:6:5',
                    type: '',
                  },
                  {
                    name: 'end',
                    nodeType: 'YulTypedName',
                    src: '88:3:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'array',
                    nodeType: 'YulTypedName',
                    src: '96:5:5',
                    type: '',
                  },
                ],
                src: '7:354:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '454:215:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '503:16:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '512:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '515:1:5',
                                  type: '',
                                  value: '0',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '505:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '505:12:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '505:12:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    name: 'offset',
                                    nodeType: 'YulIdentifier',
                                    src: '482:6:5',
                                  },
                                  {
                                    kind: 'number',
                                    nodeType: 'YulLiteral',
                                    src: '490:4:5',
                                    type: '',
                                    value: '0x1f',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '478:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '478:17:5',
                              },
                              {
                                name: 'end',
                                nodeType: 'YulIdentifier',
                                src: '497:3:5',
                              },
                            ],
                            functionName: {
                              name: 'slt',
                              nodeType: 'YulIdentifier',
                              src: '474:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '474:27:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '467:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '467:35:5',
                      },
                      nodeType: 'YulIf',
                      src: '464:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '528:27:5',
                      value: {
                        arguments: [
                          {
                            name: 'offset',
                            nodeType: 'YulIdentifier',
                            src: '548:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '542:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '542:13:5',
                      },
                      variables: [
                        {
                          name: 'length',
                          nodeType: 'YulTypedName',
                          src: '532:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '564:99:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '636:6:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '644:4:5',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '632:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '632:17:5',
                          },
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '651:6:5',
                          },
                          {
                            name: 'end',
                            nodeType: 'YulIdentifier',
                            src: '659:3:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_available_length_t_string_memory_ptr_fromMemory',
                          nodeType: 'YulIdentifier',
                          src: '573:58:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '573:90:5',
                      },
                      variableNames: [
                        {
                          name: 'array',
                          nodeType: 'YulIdentifier',
                          src: '564:5:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'abi_decode_t_string_memory_ptr_fromMemory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'offset',
                    nodeType: 'YulTypedName',
                    src: '432:6:5',
                    type: '',
                  },
                  {
                    name: 'end',
                    nodeType: 'YulTypedName',
                    src: '440:3:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'array',
                    nodeType: 'YulTypedName',
                    src: '448:5:5',
                    type: '',
                  },
                ],
                src: '381:288:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '738:80:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '748:22:5',
                      value: {
                        arguments: [
                          {
                            name: 'offset',
                            nodeType: 'YulIdentifier',
                            src: '763:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '757:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '757:13:5',
                      },
                      variableNames: [
                        {
                          name: 'value',
                          nodeType: 'YulIdentifier',
                          src: '748:5:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '806:5:5',
                          },
                        ],
                        functionName: {
                          name: 'validator_revert_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '779:26:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '779:33:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '779:33:5',
                    },
                  ],
                },
                name: 'abi_decode_t_uint256_fromMemory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'offset',
                    nodeType: 'YulTypedName',
                    src: '716:6:5',
                    type: '',
                  },
                  {
                    name: 'end',
                    nodeType: 'YulTypedName',
                    src: '724:3:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'value',
                    nodeType: 'YulTypedName',
                    src: '732:5:5',
                    type: '',
                  },
                ],
                src: '675:143:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '955:677:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '1001:16:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '1010:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '1013:1:5',
                                  type: '',
                                  value: '0',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '1003:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '1003:12:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '1003:12:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'dataEnd',
                                nodeType: 'YulIdentifier',
                                src: '976:7:5',
                              },
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '985:9:5',
                              },
                            ],
                            functionName: {
                              name: 'sub',
                              nodeType: 'YulIdentifier',
                              src: '972:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '972:23:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '997:2:5',
                            type: '',
                            value: '96',
                          },
                        ],
                        functionName: {
                          name: 'slt',
                          nodeType: 'YulIdentifier',
                          src: '968:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '968:32:5',
                      },
                      nodeType: 'YulIf',
                      src: '965:2:5',
                    },
                    {
                      nodeType: 'YulBlock',
                      src: '1027:224:5',
                      statements: [
                        {
                          nodeType: 'YulVariableDeclaration',
                          src: '1042:38:5',
                          value: {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    name: 'headStart',
                                    nodeType: 'YulIdentifier',
                                    src: '1066:9:5',
                                  },
                                  {
                                    kind: 'number',
                                    nodeType: 'YulLiteral',
                                    src: '1077:1:5',
                                    type: '',
                                    value: '0',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '1062:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '1062:17:5',
                              },
                            ],
                            functionName: {
                              name: 'mload',
                              nodeType: 'YulIdentifier',
                              src: '1056:5:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1056:24:5',
                          },
                          variables: [
                            {
                              name: 'offset',
                              nodeType: 'YulTypedName',
                              src: '1046:6:5',
                              type: '',
                            },
                          ],
                        },
                        {
                          body: {
                            nodeType: 'YulBlock',
                            src: '1127:16:5',
                            statements: [
                              {
                                expression: {
                                  arguments: [
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '1136:1:5',
                                      type: '',
                                      value: '0',
                                    },
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '1139:1:5',
                                      type: '',
                                      value: '0',
                                    },
                                  ],
                                  functionName: {
                                    name: 'revert',
                                    nodeType: 'YulIdentifier',
                                    src: '1129:6:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '1129:12:5',
                                },
                                nodeType: 'YulExpressionStatement',
                                src: '1129:12:5',
                              },
                            ],
                          },
                          condition: {
                            arguments: [
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1099:6:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1107:18:5',
                                type: '',
                                value: '0xffffffffffffffff',
                              },
                            ],
                            functionName: {
                              name: 'gt',
                              nodeType: 'YulIdentifier',
                              src: '1096:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1096:30:5',
                          },
                          nodeType: 'YulIf',
                          src: '1093:2:5',
                        },
                        {
                          nodeType: 'YulAssignment',
                          src: '1157:84:5',
                          value: {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    name: 'headStart',
                                    nodeType: 'YulIdentifier',
                                    src: '1213:9:5',
                                  },
                                  {
                                    name: 'offset',
                                    nodeType: 'YulIdentifier',
                                    src: '1224:6:5',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '1209:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '1209:22:5',
                              },
                              {
                                name: 'dataEnd',
                                nodeType: 'YulIdentifier',
                                src: '1233:7:5',
                              },
                            ],
                            functionName: {
                              name: 'abi_decode_t_string_memory_ptr_fromMemory',
                              nodeType: 'YulIdentifier',
                              src: '1167:41:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1167:74:5',
                          },
                          variableNames: [
                            {
                              name: 'value0',
                              nodeType: 'YulIdentifier',
                              src: '1157:6:5',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      nodeType: 'YulBlock',
                      src: '1261:225:5',
                      statements: [
                        {
                          nodeType: 'YulVariableDeclaration',
                          src: '1276:39:5',
                          value: {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    name: 'headStart',
                                    nodeType: 'YulIdentifier',
                                    src: '1300:9:5',
                                  },
                                  {
                                    kind: 'number',
                                    nodeType: 'YulLiteral',
                                    src: '1311:2:5',
                                    type: '',
                                    value: '32',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '1296:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '1296:18:5',
                              },
                            ],
                            functionName: {
                              name: 'mload',
                              nodeType: 'YulIdentifier',
                              src: '1290:5:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1290:25:5',
                          },
                          variables: [
                            {
                              name: 'offset',
                              nodeType: 'YulTypedName',
                              src: '1280:6:5',
                              type: '',
                            },
                          ],
                        },
                        {
                          body: {
                            nodeType: 'YulBlock',
                            src: '1362:16:5',
                            statements: [
                              {
                                expression: {
                                  arguments: [
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '1371:1:5',
                                      type: '',
                                      value: '0',
                                    },
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '1374:1:5',
                                      type: '',
                                      value: '0',
                                    },
                                  ],
                                  functionName: {
                                    name: 'revert',
                                    nodeType: 'YulIdentifier',
                                    src: '1364:6:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '1364:12:5',
                                },
                                nodeType: 'YulExpressionStatement',
                                src: '1364:12:5',
                              },
                            ],
                          },
                          condition: {
                            arguments: [
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1334:6:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1342:18:5',
                                type: '',
                                value: '0xffffffffffffffff',
                              },
                            ],
                            functionName: {
                              name: 'gt',
                              nodeType: 'YulIdentifier',
                              src: '1331:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1331:30:5',
                          },
                          nodeType: 'YulIf',
                          src: '1328:2:5',
                        },
                        {
                          nodeType: 'YulAssignment',
                          src: '1392:84:5',
                          value: {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    name: 'headStart',
                                    nodeType: 'YulIdentifier',
                                    src: '1448:9:5',
                                  },
                                  {
                                    name: 'offset',
                                    nodeType: 'YulIdentifier',
                                    src: '1459:6:5',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '1444:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '1444:22:5',
                              },
                              {
                                name: 'dataEnd',
                                nodeType: 'YulIdentifier',
                                src: '1468:7:5',
                              },
                            ],
                            functionName: {
                              name: 'abi_decode_t_string_memory_ptr_fromMemory',
                              nodeType: 'YulIdentifier',
                              src: '1402:41:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1402:74:5',
                          },
                          variableNames: [
                            {
                              name: 'value1',
                              nodeType: 'YulIdentifier',
                              src: '1392:6:5',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      nodeType: 'YulBlock',
                      src: '1496:129:5',
                      statements: [
                        {
                          nodeType: 'YulVariableDeclaration',
                          src: '1511:16:5',
                          value: {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1525:2:5',
                            type: '',
                            value: '64',
                          },
                          variables: [
                            {
                              name: 'offset',
                              nodeType: 'YulTypedName',
                              src: '1515:6:5',
                              type: '',
                            },
                          ],
                        },
                        {
                          nodeType: 'YulAssignment',
                          src: '1541:74:5',
                          value: {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    name: 'headStart',
                                    nodeType: 'YulIdentifier',
                                    src: '1587:9:5',
                                  },
                                  {
                                    name: 'offset',
                                    nodeType: 'YulIdentifier',
                                    src: '1598:6:5',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '1583:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '1583:22:5',
                              },
                              {
                                name: 'dataEnd',
                                nodeType: 'YulIdentifier',
                                src: '1607:7:5',
                              },
                            ],
                            functionName: {
                              name: 'abi_decode_t_uint256_fromMemory',
                              nodeType: 'YulIdentifier',
                              src: '1551:31:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1551:64:5',
                          },
                          variableNames: [
                            {
                              name: 'value2',
                              nodeType: 'YulIdentifier',
                              src: '1541:6:5',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                name: 'abi_decode_tuple_t_string_memory_ptrt_string_memory_ptrt_uint256_fromMemory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'headStart',
                    nodeType: 'YulTypedName',
                    src: '909:9:5',
                    type: '',
                  },
                  {
                    name: 'dataEnd',
                    nodeType: 'YulTypedName',
                    src: '920:7:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'value0',
                    nodeType: 'YulTypedName',
                    src: '932:6:5',
                    type: '',
                  },
                  {
                    name: 'value1',
                    nodeType: 'YulTypedName',
                    src: '940:6:5',
                    type: '',
                  },
                  {
                    name: 'value2',
                    nodeType: 'YulTypedName',
                    src: '948:6:5',
                    type: '',
                  },
                ],
                src: '824:808:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '1784:220:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '1794:74:5',
                      value: {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '1860:3:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1865:2:5',
                            type: '',
                            value: '31',
                          },
                        ],
                        functionName: {
                          name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                          nodeType: 'YulIdentifier',
                          src: '1801:58:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1801:67:5',
                      },
                      variableNames: [
                        {
                          name: 'pos',
                          nodeType: 'YulIdentifier',
                          src: '1794:3:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '1966:3:5',
                          },
                        ],
                        functionName: {
                          name: 'store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e',
                          nodeType: 'YulIdentifier',
                          src: '1877:88:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1877:93:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '1877:93:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1979:19:5',
                      value: {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '1990:3:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1995:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '1986:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1986:12:5',
                      },
                      variableNames: [
                        {
                          name: 'end',
                          nodeType: 'YulIdentifier',
                          src: '1979:3:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'pos',
                    nodeType: 'YulTypedName',
                    src: '1772:3:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'end',
                    nodeType: 'YulTypedName',
                    src: '1780:3:5',
                    type: '',
                  },
                ],
                src: '1638:366:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2075:53:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '2092:3:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '2115:5:5',
                              },
                            ],
                            functionName: {
                              name: 'cleanup_t_uint256',
                              nodeType: 'YulIdentifier',
                              src: '2097:17:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2097:24:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2085:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2085:37:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2085:37:5',
                    },
                  ],
                },
                name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'value',
                    nodeType: 'YulTypedName',
                    src: '2063:5:5',
                    type: '',
                  },
                  {
                    name: 'pos',
                    nodeType: 'YulTypedName',
                    src: '2070:3:5',
                    type: '',
                  },
                ],
                src: '2010:118:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2305:248:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2315:26:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2327:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2338:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2323:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2323:18:5',
                      },
                      variableNames: [
                        {
                          name: 'tail',
                          nodeType: 'YulIdentifier',
                          src: '2315:4:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '2362:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2373:1:5',
                                type: '',
                                value: '0',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '2358:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2358:17:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'tail',
                                nodeType: 'YulIdentifier',
                                src: '2381:4:5',
                              },
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '2387:9:5',
                              },
                            ],
                            functionName: {
                              name: 'sub',
                              nodeType: 'YulIdentifier',
                              src: '2377:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2377:20:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2351:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2351:47:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2351:47:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '2407:139:5',
                      value: {
                        arguments: [
                          {
                            name: 'tail',
                            nodeType: 'YulIdentifier',
                            src: '2541:4:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack',
                          nodeType: 'YulIdentifier',
                          src: '2415:124:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2415:131:5',
                      },
                      variableNames: [
                        {
                          name: 'tail',
                          nodeType: 'YulIdentifier',
                          src: '2407:4:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'headStart',
                    nodeType: 'YulTypedName',
                    src: '2285:9:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'tail',
                    nodeType: 'YulTypedName',
                    src: '2300:4:5',
                    type: '',
                  },
                ],
                src: '2134:419:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2657:124:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2667:26:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2679:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2690:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2675:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2675:18:5',
                      },
                      variableNames: [
                        {
                          name: 'tail',
                          nodeType: 'YulIdentifier',
                          src: '2667:4:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'value0',
                            nodeType: 'YulIdentifier',
                            src: '2747:6:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '2760:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2771:1:5',
                                type: '',
                                value: '0',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '2756:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2756:17:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                          nodeType: 'YulIdentifier',
                          src: '2703:43:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2703:71:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2703:71:5',
                    },
                  ],
                },
                name: 'abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'headStart',
                    nodeType: 'YulTypedName',
                    src: '2629:9:5',
                    type: '',
                  },
                  {
                    name: 'value0',
                    nodeType: 'YulTypedName',
                    src: '2641:6:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'tail',
                    nodeType: 'YulTypedName',
                    src: '2652:4:5',
                    type: '',
                  },
                ],
                src: '2559:222:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2828:88:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2838:30:5',
                      value: {
                        arguments: [],
                        functionName: {
                          name: 'allocate_unbounded',
                          nodeType: 'YulIdentifier',
                          src: '2848:18:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2848:20:5',
                      },
                      variableNames: [
                        {
                          name: 'memPtr',
                          nodeType: 'YulIdentifier',
                          src: '2838:6:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memPtr',
                            nodeType: 'YulIdentifier',
                            src: '2897:6:5',
                          },
                          {
                            name: 'size',
                            nodeType: 'YulIdentifier',
                            src: '2905:4:5',
                          },
                        ],
                        functionName: {
                          name: 'finalize_allocation',
                          nodeType: 'YulIdentifier',
                          src: '2877:19:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2877:33:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2877:33:5',
                    },
                  ],
                },
                name: 'allocate_memory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'size',
                    nodeType: 'YulTypedName',
                    src: '2812:4:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'memPtr',
                    nodeType: 'YulTypedName',
                    src: '2821:6:5',
                    type: '',
                  },
                ],
                src: '2787:129:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2962:35:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2972:19:5',
                      value: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2988:2:5',
                            type: '',
                            value: '64',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '2982:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2982:9:5',
                      },
                      variableNames: [
                        {
                          name: 'memPtr',
                          nodeType: 'YulIdentifier',
                          src: '2972:6:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'allocate_unbounded',
                nodeType: 'YulFunctionDefinition',
                returnVariables: [
                  {
                    name: 'memPtr',
                    nodeType: 'YulTypedName',
                    src: '2955:6:5',
                    type: '',
                  },
                ],
                src: '2922:75:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '3070:241:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '3175:22:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x41',
                                nodeType: 'YulIdentifier',
                                src: '3177:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '3177:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '3177:18:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '3147:6:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '3155:18:5',
                            type: '',
                            value: '0xffffffffffffffff',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '3144:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3144:30:5',
                      },
                      nodeType: 'YulIf',
                      src: '3141:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '3207:37:5',
                      value: {
                        arguments: [
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '3237:6:5',
                          },
                        ],
                        functionName: {
                          name: 'round_up_to_mul_of_32',
                          nodeType: 'YulIdentifier',
                          src: '3215:21:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3215:29:5',
                      },
                      variableNames: [
                        {
                          name: 'size',
                          nodeType: 'YulIdentifier',
                          src: '3207:4:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '3281:23:5',
                      value: {
                        arguments: [
                          {
                            name: 'size',
                            nodeType: 'YulIdentifier',
                            src: '3293:4:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '3299:4:5',
                            type: '',
                            value: '0x20',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '3289:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3289:15:5',
                      },
                      variableNames: [
                        {
                          name: 'size',
                          nodeType: 'YulIdentifier',
                          src: '3281:4:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'array_allocation_size_t_string_memory_ptr',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'length',
                    nodeType: 'YulTypedName',
                    src: '3054:6:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'size',
                    nodeType: 'YulTypedName',
                    src: '3065:4:5',
                    type: '',
                  },
                ],
                src: '3003:308:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '3413:73:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '3430:3:5',
                          },
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '3435:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '3423:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3423:19:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '3423:19:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '3451:29:5',
                      value: {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '3470:3:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '3475:4:5',
                            type: '',
                            value: '0x20',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '3466:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3466:14:5',
                      },
                      variableNames: [
                        {
                          name: 'updated_pos',
                          nodeType: 'YulIdentifier',
                          src: '3451:11:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'pos',
                    nodeType: 'YulTypedName',
                    src: '3385:3:5',
                    type: '',
                  },
                  {
                    name: 'length',
                    nodeType: 'YulTypedName',
                    src: '3390:6:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'updated_pos',
                    nodeType: 'YulTypedName',
                    src: '3401:11:5',
                    type: '',
                  },
                ],
                src: '3317:169:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '3536:261:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '3546:25:5',
                      value: {
                        arguments: [
                          {
                            name: 'x',
                            nodeType: 'YulIdentifier',
                            src: '3569:1:5',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '3551:17:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3551:20:5',
                      },
                      variableNames: [
                        {
                          name: 'x',
                          nodeType: 'YulIdentifier',
                          src: '3546:1:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '3580:25:5',
                      value: {
                        arguments: [
                          {
                            name: 'y',
                            nodeType: 'YulIdentifier',
                            src: '3603:1:5',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '3585:17:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3585:20:5',
                      },
                      variableNames: [
                        {
                          name: 'y',
                          nodeType: 'YulIdentifier',
                          src: '3580:1:5',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '3743:22:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x11',
                                nodeType: 'YulIdentifier',
                                src: '3745:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '3745:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '3745:18:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'x',
                            nodeType: 'YulIdentifier',
                            src: '3664:1:5',
                          },
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '3671:66:5',
                                type: '',
                                value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                              },
                              {
                                name: 'y',
                                nodeType: 'YulIdentifier',
                                src: '3739:1:5',
                              },
                            ],
                            functionName: {
                              name: 'sub',
                              nodeType: 'YulIdentifier',
                              src: '3667:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3667:74:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '3661:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3661:81:5',
                      },
                      nodeType: 'YulIf',
                      src: '3658:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '3775:16:5',
                      value: {
                        arguments: [
                          {
                            name: 'x',
                            nodeType: 'YulIdentifier',
                            src: '3786:1:5',
                          },
                          {
                            name: 'y',
                            nodeType: 'YulIdentifier',
                            src: '3789:1:5',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '3782:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3782:9:5',
                      },
                      variableNames: [
                        {
                          name: 'sum',
                          nodeType: 'YulIdentifier',
                          src: '3775:3:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'checked_add_t_uint256',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'x',
                    nodeType: 'YulTypedName',
                    src: '3523:1:5',
                    type: '',
                  },
                  {
                    name: 'y',
                    nodeType: 'YulTypedName',
                    src: '3526:1:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'sum',
                    nodeType: 'YulTypedName',
                    src: '3532:3:5',
                    type: '',
                  },
                ],
                src: '3492:305:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '3848:32:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '3858:16:5',
                      value: {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '3869:5:5',
                      },
                      variableNames: [
                        {
                          name: 'cleaned',
                          nodeType: 'YulIdentifier',
                          src: '3858:7:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'cleanup_t_uint256',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'value',
                    nodeType: 'YulTypedName',
                    src: '3830:5:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'cleaned',
                    nodeType: 'YulTypedName',
                    src: '3840:7:5',
                    type: '',
                  },
                ],
                src: '3803:77:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '3935:258:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '3945:10:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '3954:1:5',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'i',
                          nodeType: 'YulTypedName',
                          src: '3949:1:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '4014:63:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  arguments: [
                                    {
                                      name: 'dst',
                                      nodeType: 'YulIdentifier',
                                      src: '4039:3:5',
                                    },
                                    {
                                      name: 'i',
                                      nodeType: 'YulIdentifier',
                                      src: '4044:1:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'add',
                                    nodeType: 'YulIdentifier',
                                    src: '4035:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '4035:11:5',
                                },
                                {
                                  arguments: [
                                    {
                                      arguments: [
                                        {
                                          name: 'src',
                                          nodeType: 'YulIdentifier',
                                          src: '4058:3:5',
                                        },
                                        {
                                          name: 'i',
                                          nodeType: 'YulIdentifier',
                                          src: '4063:1:5',
                                        },
                                      ],
                                      functionName: {
                                        name: 'add',
                                        nodeType: 'YulIdentifier',
                                        src: '4054:3:5',
                                      },
                                      nodeType: 'YulFunctionCall',
                                      src: '4054:11:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'mload',
                                    nodeType: 'YulIdentifier',
                                    src: '4048:5:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '4048:18:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '4028:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '4028:39:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '4028:39:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'i',
                            nodeType: 'YulIdentifier',
                            src: '3975:1:5',
                          },
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '3978:6:5',
                          },
                        ],
                        functionName: {
                          name: 'lt',
                          nodeType: 'YulIdentifier',
                          src: '3972:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3972:13:5',
                      },
                      nodeType: 'YulForLoop',
                      post: {
                        nodeType: 'YulBlock',
                        src: '3986:19:5',
                        statements: [
                          {
                            nodeType: 'YulAssignment',
                            src: '3988:15:5',
                            value: {
                              arguments: [
                                {
                                  name: 'i',
                                  nodeType: 'YulIdentifier',
                                  src: '3997:1:5',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '4000:2:5',
                                  type: '',
                                  value: '32',
                                },
                              ],
                              functionName: {
                                name: 'add',
                                nodeType: 'YulIdentifier',
                                src: '3993:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '3993:10:5',
                            },
                            variableNames: [
                              {
                                name: 'i',
                                nodeType: 'YulIdentifier',
                                src: '3988:1:5',
                              },
                            ],
                          },
                        ],
                      },
                      pre: {
                        nodeType: 'YulBlock',
                        src: '3968:3:5',
                        statements: [],
                      },
                      src: '3964:113:5',
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '4111:76:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  arguments: [
                                    {
                                      name: 'dst',
                                      nodeType: 'YulIdentifier',
                                      src: '4161:3:5',
                                    },
                                    {
                                      name: 'length',
                                      nodeType: 'YulIdentifier',
                                      src: '4166:6:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'add',
                                    nodeType: 'YulIdentifier',
                                    src: '4157:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '4157:16:5',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '4175:1:5',
                                  type: '',
                                  value: '0',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '4150:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '4150:27:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '4150:27:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'i',
                            nodeType: 'YulIdentifier',
                            src: '4092:1:5',
                          },
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '4095:6:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '4089:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4089:13:5',
                      },
                      nodeType: 'YulIf',
                      src: '4086:2:5',
                    },
                  ],
                },
                name: 'copy_memory_to_memory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'src',
                    nodeType: 'YulTypedName',
                    src: '3917:3:5',
                    type: '',
                  },
                  {
                    name: 'dst',
                    nodeType: 'YulTypedName',
                    src: '3922:3:5',
                    type: '',
                  },
                  {
                    name: 'length',
                    nodeType: 'YulTypedName',
                    src: '3927:6:5',
                    type: '',
                  },
                ],
                src: '3886:307:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '4250:269:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '4260:22:5',
                      value: {
                        arguments: [
                          {
                            name: 'data',
                            nodeType: 'YulIdentifier',
                            src: '4274:4:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4280:1:5',
                            type: '',
                            value: '2',
                          },
                        ],
                        functionName: {
                          name: 'div',
                          nodeType: 'YulIdentifier',
                          src: '4270:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4270:12:5',
                      },
                      variableNames: [
                        {
                          name: 'length',
                          nodeType: 'YulIdentifier',
                          src: '4260:6:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '4291:38:5',
                      value: {
                        arguments: [
                          {
                            name: 'data',
                            nodeType: 'YulIdentifier',
                            src: '4321:4:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4327:1:5',
                            type: '',
                            value: '1',
                          },
                        ],
                        functionName: {
                          name: 'and',
                          nodeType: 'YulIdentifier',
                          src: '4317:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4317:12:5',
                      },
                      variables: [
                        {
                          name: 'outOfPlaceEncoding',
                          nodeType: 'YulTypedName',
                          src: '4295:18:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '4368:51:5',
                        statements: [
                          {
                            nodeType: 'YulAssignment',
                            src: '4382:27:5',
                            value: {
                              arguments: [
                                {
                                  name: 'length',
                                  nodeType: 'YulIdentifier',
                                  src: '4396:6:5',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '4404:4:5',
                                  type: '',
                                  value: '0x7f',
                                },
                              ],
                              functionName: {
                                name: 'and',
                                nodeType: 'YulIdentifier',
                                src: '4392:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '4392:17:5',
                            },
                            variableNames: [
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '4382:6:5',
                              },
                            ],
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'outOfPlaceEncoding',
                            nodeType: 'YulIdentifier',
                            src: '4348:18:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '4341:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4341:26:5',
                      },
                      nodeType: 'YulIf',
                      src: '4338:2:5',
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '4471:42:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x22',
                                nodeType: 'YulIdentifier',
                                src: '4485:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '4485:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '4485:18:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'outOfPlaceEncoding',
                            nodeType: 'YulIdentifier',
                            src: '4435:18:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '4458:6:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4466:2:5',
                                type: '',
                                value: '32',
                              },
                            ],
                            functionName: {
                              name: 'lt',
                              nodeType: 'YulIdentifier',
                              src: '4455:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4455:14:5',
                          },
                        ],
                        functionName: {
                          name: 'eq',
                          nodeType: 'YulIdentifier',
                          src: '4432:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4432:38:5',
                      },
                      nodeType: 'YulIf',
                      src: '4429:2:5',
                    },
                  ],
                },
                name: 'extract_byte_array_length',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'data',
                    nodeType: 'YulTypedName',
                    src: '4234:4:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'length',
                    nodeType: 'YulTypedName',
                    src: '4243:6:5',
                    type: '',
                  },
                ],
                src: '4199:320:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '4568:238:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '4578:58:5',
                      value: {
                        arguments: [
                          {
                            name: 'memPtr',
                            nodeType: 'YulIdentifier',
                            src: '4600:6:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'size',
                                nodeType: 'YulIdentifier',
                                src: '4630:4:5',
                              },
                            ],
                            functionName: {
                              name: 'round_up_to_mul_of_32',
                              nodeType: 'YulIdentifier',
                              src: '4608:21:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4608:27:5',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '4596:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4596:40:5',
                      },
                      variables: [
                        {
                          name: 'newFreePtr',
                          nodeType: 'YulTypedName',
                          src: '4582:10:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '4747:22:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x41',
                                nodeType: 'YulIdentifier',
                                src: '4749:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '4749:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '4749:18:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'newFreePtr',
                                nodeType: 'YulIdentifier',
                                src: '4690:10:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4702:18:5',
                                type: '',
                                value: '0xffffffffffffffff',
                              },
                            ],
                            functionName: {
                              name: 'gt',
                              nodeType: 'YulIdentifier',
                              src: '4687:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4687:34:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'newFreePtr',
                                nodeType: 'YulIdentifier',
                                src: '4726:10:5',
                              },
                              {
                                name: 'memPtr',
                                nodeType: 'YulIdentifier',
                                src: '4738:6:5',
                              },
                            ],
                            functionName: {
                              name: 'lt',
                              nodeType: 'YulIdentifier',
                              src: '4723:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4723:22:5',
                          },
                        ],
                        functionName: {
                          name: 'or',
                          nodeType: 'YulIdentifier',
                          src: '4684:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4684:62:5',
                      },
                      nodeType: 'YulIf',
                      src: '4681:2:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4785:2:5',
                            type: '',
                            value: '64',
                          },
                          {
                            name: 'newFreePtr',
                            nodeType: 'YulIdentifier',
                            src: '4789:10:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '4778:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4778:22:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '4778:22:5',
                    },
                  ],
                },
                name: 'finalize_allocation',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'memPtr',
                    nodeType: 'YulTypedName',
                    src: '4554:6:5',
                    type: '',
                  },
                  {
                    name: 'size',
                    nodeType: 'YulTypedName',
                    src: '4562:4:5',
                    type: '',
                  },
                ],
                src: '4525:281:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '4840:152:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4857:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4860:77:5',
                            type: '',
                            value: '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '4850:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4850:88:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '4850:88:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4954:1:5',
                            type: '',
                            value: '4',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4957:4:5',
                            type: '',
                            value: '0x11',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '4947:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4947:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '4947:15:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4978:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4981:4:5',
                            type: '',
                            value: '0x24',
                          },
                        ],
                        functionName: {
                          name: 'revert',
                          nodeType: 'YulIdentifier',
                          src: '4971:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4971:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '4971:15:5',
                    },
                  ],
                },
                name: 'panic_error_0x11',
                nodeType: 'YulFunctionDefinition',
                src: '4812:180:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '5026:152:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5043:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5046:77:5',
                            type: '',
                            value: '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '5036:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5036:88:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5036:88:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5140:1:5',
                            type: '',
                            value: '4',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5143:4:5',
                            type: '',
                            value: '0x22',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '5133:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5133:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5133:15:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5164:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5167:4:5',
                            type: '',
                            value: '0x24',
                          },
                        ],
                        functionName: {
                          name: 'revert',
                          nodeType: 'YulIdentifier',
                          src: '5157:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5157:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5157:15:5',
                    },
                  ],
                },
                name: 'panic_error_0x22',
                nodeType: 'YulFunctionDefinition',
                src: '4998:180:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '5212:152:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5229:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5232:77:5',
                            type: '',
                            value: '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '5222:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5222:88:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5222:88:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5326:1:5',
                            type: '',
                            value: '4',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5329:4:5',
                            type: '',
                            value: '0x41',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '5319:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5319:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5319:15:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5350:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5353:4:5',
                            type: '',
                            value: '0x24',
                          },
                        ],
                        functionName: {
                          name: 'revert',
                          nodeType: 'YulIdentifier',
                          src: '5343:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5343:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5343:15:5',
                    },
                  ],
                },
                name: 'panic_error_0x41',
                nodeType: 'YulFunctionDefinition',
                src: '5184:180:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '5418:54:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '5428:38:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '5446:5:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '5453:2:5',
                                type: '',
                                value: '31',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '5442:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '5442:14:5',
                          },
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '5462:2:5',
                                type: '',
                                value: '31',
                              },
                            ],
                            functionName: {
                              name: 'not',
                              nodeType: 'YulIdentifier',
                              src: '5458:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '5458:7:5',
                          },
                        ],
                        functionName: {
                          name: 'and',
                          nodeType: 'YulIdentifier',
                          src: '5438:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5438:28:5',
                      },
                      variableNames: [
                        {
                          name: 'result',
                          nodeType: 'YulIdentifier',
                          src: '5428:6:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'round_up_to_mul_of_32',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'value',
                    nodeType: 'YulTypedName',
                    src: '5401:5:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'result',
                    nodeType: 'YulTypedName',
                    src: '5411:6:5',
                    type: '',
                  },
                ],
                src: '5370:102:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '5584:75:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'memPtr',
                                nodeType: 'YulIdentifier',
                                src: '5606:6:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '5614:1:5',
                                type: '',
                                value: '0',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '5602:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '5602:14:5',
                          },
                          {
                            kind: 'string',
                            nodeType: 'YulLiteral',
                            src: '5618:33:5',
                            type: '',
                            value: 'ERC20: mint to the zero address',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '5595:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5595:57:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5595:57:5',
                    },
                  ],
                },
                name: 'store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'memPtr',
                    nodeType: 'YulTypedName',
                    src: '5576:6:5',
                    type: '',
                  },
                ],
                src: '5478:181:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '5708:79:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '5765:16:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '5774:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '5777:1:5',
                                  type: '',
                                  value: '0',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '5767:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '5767:12:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '5767:12:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '5731:5:5',
                              },
                              {
                                arguments: [
                                  {
                                    name: 'value',
                                    nodeType: 'YulIdentifier',
                                    src: '5756:5:5',
                                  },
                                ],
                                functionName: {
                                  name: 'cleanup_t_uint256',
                                  nodeType: 'YulIdentifier',
                                  src: '5738:17:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '5738:24:5',
                              },
                            ],
                            functionName: {
                              name: 'eq',
                              nodeType: 'YulIdentifier',
                              src: '5728:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '5728:35:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '5721:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5721:43:5',
                      },
                      nodeType: 'YulIf',
                      src: '5718:2:5',
                    },
                  ],
                },
                name: 'validator_revert_t_uint256',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'value',
                    nodeType: 'YulTypedName',
                    src: '5701:5:5',
                    type: '',
                  },
                ],
                src: '5665:122:5',
              },
            ],
          },
          contents: '{\n\n    function abi_decode_available_length_t_string_memory_ptr_fromMemory(src, length, end) -> array {\n        array := allocate_memory(array_allocation_size_t_string_memory_ptr(length))\n        mstore(array, length)\n        let dst := add(array, 0x20)\n        if gt(add(src, length), end) { revert(0, 0) }\n        copy_memory_to_memory(src, dst, length)\n    }\n\n    // string\n    function abi_decode_t_string_memory_ptr_fromMemory(offset, end) -> array {\n        if iszero(slt(add(offset, 0x1f), end)) { revert(0, 0) }\n        let length := mload(offset)\n        array := abi_decode_available_length_t_string_memory_ptr_fromMemory(add(offset, 0x20), length, end)\n    }\n\n    function abi_decode_t_uint256_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_string_memory_ptrt_string_memory_ptrt_uint256_fromMemory(headStart, dataEnd) -> value0, value1, value2 {\n        if slt(sub(dataEnd, headStart), 96) { revert(0, 0) }\n\n        {\n\n            let offset := mload(add(headStart, 0))\n            if gt(offset, 0xffffffffffffffff) { revert(0, 0) }\n\n            value0 := abi_decode_t_string_memory_ptr_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := mload(add(headStart, 32))\n            if gt(offset, 0xffffffffffffffff) { revert(0, 0) }\n\n            value1 := abi_decode_t_string_memory_ptr_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 64\n\n            value2 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 31)\n        store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function allocate_memory(size) -> memPtr {\n        memPtr := allocate_unbounded()\n        finalize_allocation(memPtr, size)\n    }\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function array_allocation_size_t_string_memory_ptr(length) -> size {\n        // Make sure we can allocate memory without overflow\n        if gt(length, 0xffffffffffffffff) { panic_error_0x41() }\n\n        size := round_up_to_mul_of_32(length)\n\n        // add length slot\n        size := add(size, 0x20)\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x > (maxValue - y)\n        if gt(x, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, y)) { panic_error_0x11() }\n\n        sum := add(x, y)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function copy_memory_to_memory(src, dst, length) {\n        let i := 0\n        for { } lt(i, length) { i := add(i, 32) }\n        {\n            mstore(add(dst, i), mload(add(src, i)))\n        }\n        if gt(i, length)\n        {\n            // clear end\n            mstore(add(dst, length), 0)\n        }\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function finalize_allocation(memPtr, size) {\n        let newFreePtr := add(memPtr, round_up_to_mul_of_32(size))\n        // protect against overflow\n        if or(gt(newFreePtr, 0xffffffffffffffff), lt(newFreePtr, memPtr)) { panic_error_0x41() }\n        mstore(64, newFreePtr)\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function panic_error_0x41() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n\n    function round_up_to_mul_of_32(value) -> result {\n        result := and(add(value, 31), not(31))\n    }\n\n    function store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e(memPtr) {\n\n        mstore(add(memPtr, 0), "ERC20: mint to the zero address")\n\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n}\n',
          id: 5,
          language: 'Yul',
          name: '#utility.yul',
        },
      ],
      linkReferences: {},
      object: '60806040523480156200001157600080fd5b5060405162001a4238038062001a42833981810160405281019062000037919062000344565b82828160039080519060200190620000519291906200020b565b5080600490805190602001906200006a9291906200020b565b5050506200007f33826200008860201b60201c565b5050506200069d565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415620000fb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000f29062000404565b60405180910390fd5b6200010f600083836200020160201b60201c565b8060026000828254620001239190620004b3565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200017a9190620004b3565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001e1919062000426565b60405180910390a3620001fd600083836200020660201b60201c565b5050565b505050565b505050565b828054620002199062000550565b90600052602060002090601f0160209004810192826200023d576000855562000289565b82601f106200025857805160ff191683800117855562000289565b8280016001018555821562000289579182015b82811115620002885782518255916020019190600101906200026b565b5b5090506200029891906200029c565b5090565b5b80821115620002b75760008160009055506001016200029d565b5090565b6000620002d2620002cc846200046c565b62000443565b905082815260208101848484011115620002eb57600080fd5b620002f88482856200051a565b509392505050565b600082601f8301126200031257600080fd5b815162000324848260208601620002bb565b91505092915050565b6000815190506200033e8162000683565b92915050565b6000806000606084860312156200035a57600080fd5b600084015167ffffffffffffffff8111156200037557600080fd5b620003838682870162000300565b935050602084015167ffffffffffffffff811115620003a157600080fd5b620003af8682870162000300565b9250506040620003c2868287016200032d565b9150509250925092565b6000620003db601f83620004a2565b9150620003e8826200065a565b602082019050919050565b620003fe8162000510565b82525050565b600060208201905081810360008301526200041f81620003cc565b9050919050565b60006020820190506200043d6000830184620003f3565b92915050565b60006200044f62000462565b90506200045d828262000586565b919050565b6000604051905090565b600067ffffffffffffffff8211156200048a57620004896200061a565b5b620004958262000649565b9050602081019050919050565b600082825260208201905092915050565b6000620004c08262000510565b9150620004cd8362000510565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620005055762000504620005bc565b5b828201905092915050565b6000819050919050565b60005b838110156200053a5780820151818401526020810190506200051d565b838111156200054a576000848401525b50505050565b600060028204905060018216806200056957607f821691505b6020821081141562000580576200057f620005eb565b5b50919050565b620005918262000649565b810181811067ffffffffffffffff82111715620005b357620005b26200061a565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6200068e8162000510565b81146200069a57600080fd5b50565b61139580620006ad6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610e35565b60405180910390f35b6100e660048036038101906100e19190610c83565b610308565b6040516100f39190610e1a565b60405180910390f35b610104610326565b6040516101119190610f37565b60405180910390f35b610134600480360381019061012f9190610c34565b610330565b6040516101419190610e1a565b60405180910390f35b610152610428565b60405161015f9190610f52565b60405180910390f35b610182600480360381019061017d9190610c83565b610431565b60405161018f9190610e1a565b60405180910390f35b6101b260048036038101906101ad9190610bcf565b6104dd565b6040516101bf9190610f37565b60405180910390f35b6101d0610525565b6040516101dd9190610e35565b60405180910390f35b61020060048036038101906101fb9190610c83565b6105b7565b60405161020d9190610e1a565b60405180910390f35b610230600480360381019061022b9190610c83565b6106a2565b60405161023d9190610e1a565b60405180910390f35b610260600480360381019061025b9190610bf8565b6106c0565b60405161026d9190610f37565b60405180910390f35b60606003805461028590611067565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190611067565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b600061031c610315610747565b848461074f565b6001905092915050565b6000600254905090565b600061033d84848461091a565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610388610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610408576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ff90610eb7565b60405180910390fd5b61041c85610414610747565b85840361074f565b60019150509392505050565b60006012905090565b60006104d361043e610747565b84846001600061044c610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104ce9190610f89565b61074f565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461053490611067565b80601f016020809104026020016040519081016040528092919081815260200182805461056090611067565b80156105ad5780601f10610582576101008083540402835291602001916105ad565b820191906000526020600020905b81548152906001019060200180831161059057829003601f168201915b5050505050905090565b600080600160006105c6610747565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610683576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067a90610f17565b60405180910390fd5b61069761068e610747565b8585840361074f565b600191505092915050565b60006106b66106af610747565b848461091a565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156107bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b690610ef7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561082f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082690610e77565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405161090d9190610f37565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561098a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098190610ed7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156109fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f190610e57565b60405180910390fd5b610a05838383610b9b565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a8b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8290610e97565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b1e9190610f89565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b829190610f37565b60405180910390a3610b95848484610ba0565b50505050565b505050565b505050565b600081359050610bb481611331565b92915050565b600081359050610bc981611348565b92915050565b600060208284031215610be157600080fd5b6000610bef84828501610ba5565b91505092915050565b60008060408385031215610c0b57600080fd5b6000610c1985828601610ba5565b9250506020610c2a85828601610ba5565b9150509250929050565b600080600060608486031215610c4957600080fd5b6000610c5786828701610ba5565b9350506020610c6886828701610ba5565b9250506040610c7986828701610bba565b9150509250925092565b60008060408385031215610c9657600080fd5b6000610ca485828601610ba5565b9250506020610cb585828601610bba565b9150509250929050565b610cc881610ff1565b82525050565b6000610cd982610f6d565b610ce38185610f78565b9350610cf3818560208601611034565b610cfc816110f7565b840191505092915050565b6000610d14602383610f78565b9150610d1f82611108565b604082019050919050565b6000610d37602283610f78565b9150610d4282611157565b604082019050919050565b6000610d5a602683610f78565b9150610d65826111a6565b604082019050919050565b6000610d7d602883610f78565b9150610d88826111f5565b604082019050919050565b6000610da0602583610f78565b9150610dab82611244565b604082019050919050565b6000610dc3602483610f78565b9150610dce82611293565b604082019050919050565b6000610de6602583610f78565b9150610df1826112e2565b604082019050919050565b610e058161101d565b82525050565b610e1481611027565b82525050565b6000602082019050610e2f6000830184610cbf565b92915050565b60006020820190508181036000830152610e4f8184610cce565b905092915050565b60006020820190508181036000830152610e7081610d07565b9050919050565b60006020820190508181036000830152610e9081610d2a565b9050919050565b60006020820190508181036000830152610eb081610d4d565b9050919050565b60006020820190508181036000830152610ed081610d70565b9050919050565b60006020820190508181036000830152610ef081610d93565b9050919050565b60006020820190508181036000830152610f1081610db6565b9050919050565b60006020820190508181036000830152610f3081610dd9565b9050919050565b6000602082019050610f4c6000830184610dfc565b92915050565b6000602082019050610f676000830184610e0b565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610f948261101d565b9150610f9f8361101d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610fd457610fd3611099565b5b828201905092915050565b6000610fea82610ffd565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015611052578082015181840152602081019050611037565b83811115611061576000848401525b50505050565b6000600282049050600182168061107f57607f821691505b60208210811415611093576110926110c8565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b61133a81610fdf565b811461134557600080fd5b50565b6113518161101d565b811461135c57600080fd5b5056fea2646970667358221220f84c3cfd48c68776dbba4640dd3e4c3f0f15e0f168e074d7ebfe60fd90474d4764736f6c63430008040033',
      opcodes: 'PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH3 0x11 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH3 0x1A42 CODESIZE SUB DUP1 PUSH3 0x1A42 DUP4 CODECOPY DUP2 DUP2 ADD PUSH1 0x40 MSTORE DUP2 ADD SWAP1 PUSH3 0x37 SWAP2 SWAP1 PUSH3 0x344 JUMP JUMPDEST DUP3 DUP3 DUP2 PUSH1 0x3 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0x51 SWAP3 SWAP2 SWAP1 PUSH3 0x20B JUMP JUMPDEST POP DUP1 PUSH1 0x4 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0x6A SWAP3 SWAP2 SWAP1 PUSH3 0x20B JUMP JUMPDEST POP POP POP PUSH3 0x7F CALLER DUP3 PUSH3 0x88 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST POP POP POP PUSH3 0x69D JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH3 0xFB JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH3 0xF2 SWAP1 PUSH3 0x404 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH3 0x10F PUSH1 0x0 DUP4 DUP4 PUSH3 0x201 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST DUP1 PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH3 0x123 SWAP2 SWAP1 PUSH3 0x4B3 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP1 PUSH1 0x0 DUP1 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH3 0x17A SWAP2 SWAP1 PUSH3 0x4B3 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP4 PUSH1 0x40 MLOAD PUSH3 0x1E1 SWAP2 SWAP1 PUSH3 0x426 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 PUSH3 0x1FD PUSH1 0x0 DUP4 DUP4 PUSH3 0x206 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH3 0x219 SWAP1 PUSH3 0x550 JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH3 0x23D JUMPI PUSH1 0x0 DUP6 SSTORE PUSH3 0x289 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH3 0x258 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH3 0x289 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH3 0x289 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x288 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0x26B JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH3 0x298 SWAP2 SWAP1 PUSH3 0x29C JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x2B7 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH3 0x29D JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH3 0x2D2 PUSH3 0x2CC DUP5 PUSH3 0x46C JUMP JUMPDEST PUSH3 0x443 JUMP JUMPDEST SWAP1 POP DUP3 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP5 DUP5 DUP5 ADD GT ISZERO PUSH3 0x2EB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH3 0x2F8 DUP5 DUP3 DUP6 PUSH3 0x51A JUMP JUMPDEST POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH3 0x312 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 MLOAD PUSH3 0x324 DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH3 0x2BB JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH3 0x33E DUP2 PUSH3 0x683 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH3 0x35A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP5 ADD MLOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH3 0x375 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH3 0x383 DUP7 DUP3 DUP8 ADD PUSH3 0x300 JUMP JUMPDEST SWAP4 POP POP PUSH1 0x20 DUP5 ADD MLOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH3 0x3A1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH3 0x3AF DUP7 DUP3 DUP8 ADD PUSH3 0x300 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x40 PUSH3 0x3C2 DUP7 DUP3 DUP8 ADD PUSH3 0x32D JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 PUSH3 0x3DB PUSH1 0x1F DUP4 PUSH3 0x4A2 JUMP JUMPDEST SWAP2 POP PUSH3 0x3E8 DUP3 PUSH3 0x65A JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH3 0x3FE DUP2 PUSH3 0x510 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH3 0x41F DUP2 PUSH3 0x3CC JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH3 0x43D PUSH1 0x0 DUP4 ADD DUP5 PUSH3 0x3F3 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x44F PUSH3 0x462 JUMP JUMPDEST SWAP1 POP PUSH3 0x45D DUP3 DUP3 PUSH3 0x586 JUMP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH3 0x48A JUMPI PUSH3 0x489 PUSH3 0x61A JUMP JUMPDEST JUMPDEST PUSH3 0x495 DUP3 PUSH3 0x649 JUMP JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x4C0 DUP3 PUSH3 0x510 JUMP JUMPDEST SWAP2 POP PUSH3 0x4CD DUP4 PUSH3 0x510 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH3 0x505 JUMPI PUSH3 0x504 PUSH3 0x5BC JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH3 0x53A JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH3 0x51D JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH3 0x54A JUMPI PUSH1 0x0 DUP5 DUP5 ADD MSTORE JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH3 0x569 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH3 0x580 JUMPI PUSH3 0x57F PUSH3 0x5EB JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH3 0x591 DUP3 PUSH3 0x649 JUMP JUMPDEST DUP2 ADD DUP2 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR ISZERO PUSH3 0x5B3 JUMPI PUSH3 0x5B2 PUSH3 0x61A JUMP JUMPDEST JUMPDEST DUP1 PUSH1 0x40 MSTORE POP POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x45524332303A206D696E7420746F20746865207A65726F206164647265737300 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH3 0x68E DUP2 PUSH3 0x510 JUMP JUMPDEST DUP2 EQ PUSH3 0x69A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x1395 DUP1 PUSH3 0x6AD PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0xA9 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x39509351 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0x39509351 EQ PUSH2 0x168 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x198 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x1C8 JUMPI DUP1 PUSH4 0xA457C2D7 EQ PUSH2 0x1E6 JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x216 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x246 JUMPI PUSH2 0xA9 JUMP JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0xAE JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0xCC JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0xFC JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x11A JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x14A JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xB6 PUSH2 0x276 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xC3 SWAP2 SWAP1 PUSH2 0xE35 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0xE6 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0xE1 SWAP2 SWAP1 PUSH2 0xC83 JUMP JUMPDEST PUSH2 0x308 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xF3 SWAP2 SWAP1 PUSH2 0xE1A JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x104 PUSH2 0x326 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x111 SWAP2 SWAP1 PUSH2 0xF37 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x134 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x12F SWAP2 SWAP1 PUSH2 0xC34 JUMP JUMPDEST PUSH2 0x330 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x141 SWAP2 SWAP1 PUSH2 0xE1A JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x152 PUSH2 0x428 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x15F SWAP2 SWAP1 PUSH2 0xF52 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x182 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x17D SWAP2 SWAP1 PUSH2 0xC83 JUMP JUMPDEST PUSH2 0x431 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x18F SWAP2 SWAP1 PUSH2 0xE1A JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x1B2 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1AD SWAP2 SWAP1 PUSH2 0xBCF JUMP JUMPDEST PUSH2 0x4DD JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1BF SWAP2 SWAP1 PUSH2 0xF37 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x1D0 PUSH2 0x525 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1DD SWAP2 SWAP1 PUSH2 0xE35 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x200 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1FB SWAP2 SWAP1 PUSH2 0xC83 JUMP JUMPDEST PUSH2 0x5B7 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x20D SWAP2 SWAP1 PUSH2 0xE1A JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x230 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x22B SWAP2 SWAP1 PUSH2 0xC83 JUMP JUMPDEST PUSH2 0x6A2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x23D SWAP2 SWAP1 PUSH2 0xE1A JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x260 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x25B SWAP2 SWAP1 PUSH2 0xBF8 JUMP JUMPDEST PUSH2 0x6C0 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x26D SWAP2 SWAP1 PUSH2 0xF37 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x3 DUP1 SLOAD PUSH2 0x285 SWAP1 PUSH2 0x1067 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x2B1 SWAP1 PUSH2 0x1067 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x2FE JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x2D3 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x2FE JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x2E1 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x31C PUSH2 0x315 PUSH2 0x747 JUMP JUMPDEST DUP5 DUP5 PUSH2 0x74F JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x33D DUP5 DUP5 DUP5 PUSH2 0x91A JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 DUP7 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x388 PUSH2 0x747 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP DUP3 DUP2 LT ISZERO PUSH2 0x408 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3FF SWAP1 PUSH2 0xEB7 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x41C DUP6 PUSH2 0x414 PUSH2 0x747 JUMP JUMPDEST DUP6 DUP5 SUB PUSH2 0x74F JUMP JUMPDEST PUSH1 0x1 SWAP2 POP POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x12 SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x4D3 PUSH2 0x43E PUSH2 0x747 JUMP JUMPDEST DUP5 DUP5 PUSH1 0x1 PUSH1 0x0 PUSH2 0x44C PUSH2 0x747 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP9 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0x4CE SWAP2 SWAP1 PUSH2 0xF89 JUMP JUMPDEST PUSH2 0x74F JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 SLOAD PUSH2 0x534 SWAP1 PUSH2 0x1067 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x560 SWAP1 PUSH2 0x1067 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x5AD JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x582 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x5AD JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x590 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x1 PUSH1 0x0 PUSH2 0x5C6 PUSH2 0x747 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP DUP3 DUP2 LT ISZERO PUSH2 0x683 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x67A SWAP1 PUSH2 0xF17 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x697 PUSH2 0x68E PUSH2 0x747 JUMP JUMPDEST DUP6 DUP6 DUP5 SUB PUSH2 0x74F JUMP JUMPDEST PUSH1 0x1 SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6B6 PUSH2 0x6AF PUSH2 0x747 JUMP JUMPDEST DUP5 DUP5 PUSH2 0x91A JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x7BF JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x7B6 SWAP1 PUSH2 0xEF7 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x82F JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x826 SWAP1 PUSH2 0xE77 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x1 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 DUP4 PUSH1 0x40 MLOAD PUSH2 0x90D SWAP2 SWAP1 PUSH2 0xF37 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x98A JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x981 SWAP1 PUSH2 0xED7 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x9FA JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x9F1 SWAP1 PUSH2 0xE57 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xA05 DUP4 DUP4 DUP4 PUSH2 0xB9B JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP DUP2 DUP2 LT ISZERO PUSH2 0xA8B JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xA82 SWAP1 PUSH2 0xE97 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP2 DUP2 SUB PUSH1 0x0 DUP1 DUP7 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xB1E SWAP2 SWAP1 PUSH2 0xF89 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP5 PUSH1 0x40 MLOAD PUSH2 0xB82 SWAP2 SWAP1 PUSH2 0xF37 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 PUSH2 0xB95 DUP5 DUP5 DUP5 PUSH2 0xBA0 JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xBB4 DUP2 PUSH2 0x1331 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xBC9 DUP2 PUSH2 0x1348 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xBE1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xBEF DUP5 DUP3 DUP6 ADD PUSH2 0xBA5 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0xC0B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xC19 DUP6 DUP3 DUP7 ADD PUSH2 0xBA5 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0xC2A DUP6 DUP3 DUP7 ADD PUSH2 0xBA5 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0xC49 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xC57 DUP7 DUP3 DUP8 ADD PUSH2 0xBA5 JUMP JUMPDEST SWAP4 POP POP PUSH1 0x20 PUSH2 0xC68 DUP7 DUP3 DUP8 ADD PUSH2 0xBA5 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x40 PUSH2 0xC79 DUP7 DUP3 DUP8 ADD PUSH2 0xBBA JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0xC96 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xCA4 DUP6 DUP3 DUP7 ADD PUSH2 0xBA5 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0xCB5 DUP6 DUP3 DUP7 ADD PUSH2 0xBBA JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH2 0xCC8 DUP2 PUSH2 0xFF1 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xCD9 DUP3 PUSH2 0xF6D JUMP JUMPDEST PUSH2 0xCE3 DUP2 DUP6 PUSH2 0xF78 JUMP JUMPDEST SWAP4 POP PUSH2 0xCF3 DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x1034 JUMP JUMPDEST PUSH2 0xCFC DUP2 PUSH2 0x10F7 JUMP JUMPDEST DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD14 PUSH1 0x23 DUP4 PUSH2 0xF78 JUMP JUMPDEST SWAP2 POP PUSH2 0xD1F DUP3 PUSH2 0x1108 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD37 PUSH1 0x22 DUP4 PUSH2 0xF78 JUMP JUMPDEST SWAP2 POP PUSH2 0xD42 DUP3 PUSH2 0x1157 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD5A PUSH1 0x26 DUP4 PUSH2 0xF78 JUMP JUMPDEST SWAP2 POP PUSH2 0xD65 DUP3 PUSH2 0x11A6 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD7D PUSH1 0x28 DUP4 PUSH2 0xF78 JUMP JUMPDEST SWAP2 POP PUSH2 0xD88 DUP3 PUSH2 0x11F5 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xDA0 PUSH1 0x25 DUP4 PUSH2 0xF78 JUMP JUMPDEST SWAP2 POP PUSH2 0xDAB DUP3 PUSH2 0x1244 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xDC3 PUSH1 0x24 DUP4 PUSH2 0xF78 JUMP JUMPDEST SWAP2 POP PUSH2 0xDCE DUP3 PUSH2 0x1293 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xDE6 PUSH1 0x25 DUP4 PUSH2 0xF78 JUMP JUMPDEST SWAP2 POP PUSH2 0xDF1 DUP3 PUSH2 0x12E2 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xE05 DUP2 PUSH2 0x101D JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0xE14 DUP2 PUSH2 0x1027 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xE2F PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xCBF JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xE4F DUP2 DUP5 PUSH2 0xCCE JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xE70 DUP2 PUSH2 0xD07 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xE90 DUP2 PUSH2 0xD2A JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xEB0 DUP2 PUSH2 0xD4D JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xED0 DUP2 PUSH2 0xD70 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xEF0 DUP2 PUSH2 0xD93 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xF10 DUP2 PUSH2 0xDB6 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xF30 DUP2 PUSH2 0xDD9 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xF4C PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xDFC JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xF67 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xE0B JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xF94 DUP3 PUSH2 0x101D JUMP JUMPDEST SWAP2 POP PUSH2 0xF9F DUP4 PUSH2 0x101D JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH2 0xFD4 JUMPI PUSH2 0xFD3 PUSH2 0x1099 JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xFEA DUP3 PUSH2 0xFFD JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 ISZERO ISZERO SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0xFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x1052 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x1037 JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0x1061 JUMPI PUSH1 0x0 DUP5 DUP5 ADD MSTORE JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH2 0x107F JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x1093 JUMPI PUSH2 0x1092 PUSH2 0x10C8 JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E7366657220746F20746865207A65726F2061646472 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6573730000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A20617070726F766520746F20746865207A65726F206164647265 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7373000000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E7366657220616D6F756E7420657863656564732062 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x616C616E63650000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E7366657220616D6F756E7420657863656564732061 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6C6C6F77616E6365000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E736665722066726F6D20746865207A65726F206164 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6472657373000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A20617070726F76652066726F6D20746865207A65726F20616464 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7265737300000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A2064656372656173656420616C6C6F77616E63652062656C6F77 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x207A65726F000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH2 0x133A DUP2 PUSH2 0xFDF JUMP JUMPDEST DUP2 EQ PUSH2 0x1345 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x1351 DUP2 PUSH2 0x101D JUMP JUMPDEST DUP2 EQ PUSH2 0x135C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xF8 0x4C EXTCODECOPY REVERT 0x48 0xC6 DUP8 PUSH23 0xDBBA4640DD3E4C3F0F15E0F168E074D7EBFE60FD90474D SELFBALANCE PUSH5 0x736F6C6343 STOP ADDMOD DIV STOP CALLER ',
      sourceMap: '465:272:4:-:0;;;585:150;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;670:5;677:7;1980:5:0;1972;:13;;;;;;;;;;;;:::i;:::-;;2005:7;1995;:17;;;;;;;;;;;;:::i;:::-;;1906:113;;696:32:4::1;702:10;714:13;696:5;;;:32;;:::i;:::-;585:150:::0;;;465:272;;8254:389:0;8356:1;8337:21;;:7;:21;;;;8329:65;;;;;;;;;;;;:::i;:::-;;;;;;;;;8405:49;8434:1;8438:7;8447:6;8405:20;;;:49;;:::i;:::-;8481:6;8465:12;;:22;;;;;;;:::i;:::-;;;;;;;;8519:6;8497:9;:18;8507:7;8497:18;;;;;;;;;;;;;;;;:28;;;;;;;:::i;:::-;;;;;;;;8561:7;8540:37;;8557:1;8540:37;;;8570:6;8540:37;;;;;;:::i;:::-;;;;;;;;8588:48;8616:1;8620:7;8629:6;8588:19;;;:48;;:::i;:::-;8254:389;;:::o;10916:121::-;;;;:::o;11625:120::-;;;;:::o;465:272:4:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:354:5:-;96:5;121:66;137:49;179:6;137:49;:::i;:::-;121:66;:::i;:::-;112:75;;210:6;203:5;196:21;248:4;241:5;237:16;286:3;277:6;272:3;268:16;265:25;262:2;;;303:1;300;293:12;262:2;316:39;348:6;343:3;338;316:39;:::i;:::-;102:259;;;;;;:::o;381:288::-;448:5;497:3;490:4;482:6;478:17;474:27;464:2;;515:1;512;505:12;464:2;548:6;542:13;573:90;659:3;651:6;644:4;636:6;632:17;573:90;:::i;:::-;564:99;;454:215;;;;;:::o;675:143::-;732:5;763:6;757:13;748:22;;779:33;806:5;779:33;:::i;:::-;738:80;;;;:::o;824:808::-;932:6;940;948;997:2;985:9;976:7;972:23;968:32;965:2;;;1013:1;1010;1003:12;965:2;1077:1;1066:9;1062:17;1056:24;1107:18;1099:6;1096:30;1093:2;;;1139:1;1136;1129:12;1093:2;1167:74;1233:7;1224:6;1213:9;1209:22;1167:74;:::i;:::-;1157:84;;1027:224;1311:2;1300:9;1296:18;1290:25;1342:18;1334:6;1331:30;1328:2;;;1374:1;1371;1364:12;1328:2;1402:74;1468:7;1459:6;1448:9;1444:22;1402:74;:::i;:::-;1392:84;;1261:225;1525:2;1551:64;1607:7;1598:6;1587:9;1583:22;1551:64;:::i;:::-;1541:74;;1496:129;955:677;;;;;:::o;1638:366::-;1780:3;1801:67;1865:2;1860:3;1801:67;:::i;:::-;1794:74;;1877:93;1966:3;1877:93;:::i;:::-;1995:2;1990:3;1986:12;1979:19;;1784:220;;;:::o;2010:118::-;2097:24;2115:5;2097:24;:::i;:::-;2092:3;2085:37;2075:53;;:::o;2134:419::-;2300:4;2338:2;2327:9;2323:18;2315:26;;2387:9;2381:4;2377:20;2373:1;2362:9;2358:17;2351:47;2415:131;2541:4;2415:131;:::i;:::-;2407:139;;2305:248;;;:::o;2559:222::-;2652:4;2690:2;2679:9;2675:18;2667:26;;2703:71;2771:1;2760:9;2756:17;2747:6;2703:71;:::i;:::-;2657:124;;;;:::o;2787:129::-;2821:6;2848:20;;:::i;:::-;2838:30;;2877:33;2905:4;2897:6;2877:33;:::i;:::-;2828:88;;;:::o;2922:75::-;2955:6;2988:2;2982:9;2972:19;;2962:35;:::o;3003:308::-;3065:4;3155:18;3147:6;3144:30;3141:2;;;3177:18;;:::i;:::-;3141:2;3215:29;3237:6;3215:29;:::i;:::-;3207:37;;3299:4;3293;3289:15;3281:23;;3070:241;;;:::o;3317:169::-;3401:11;3435:6;3430:3;3423:19;3475:4;3470:3;3466:14;3451:29;;3413:73;;;;:::o;3492:305::-;3532:3;3551:20;3569:1;3551:20;:::i;:::-;3546:25;;3585:20;3603:1;3585:20;:::i;:::-;3580:25;;3739:1;3671:66;3667:74;3664:1;3661:81;3658:2;;;3745:18;;:::i;:::-;3658:2;3789:1;3786;3782:9;3775:16;;3536:261;;;;:::o;3803:77::-;3840:7;3869:5;3858:16;;3848:32;;;:::o;3886:307::-;3954:1;3964:113;3978:6;3975:1;3972:13;3964:113;;;4063:1;4058:3;4054:11;4048:18;4044:1;4039:3;4035:11;4028:39;4000:2;3997:1;3993:10;3988:15;;3964:113;;;4095:6;4092:1;4089:13;4086:2;;;4175:1;4166:6;4161:3;4157:16;4150:27;4086:2;3935:258;;;;:::o;4199:320::-;4243:6;4280:1;4274:4;4270:12;4260:22;;4327:1;4321:4;4317:12;4348:18;4338:2;;4404:4;4396:6;4392:17;4382:27;;4338:2;4466;4458:6;4455:14;4435:18;4432:38;4429:2;;;4485:18;;:::i;:::-;4429:2;4250:269;;;;:::o;4525:281::-;4608:27;4630:4;4608:27;:::i;:::-;4600:6;4596:40;4738:6;4726:10;4723:22;4702:18;4690:10;4687:34;4684:62;4681:2;;;4749:18;;:::i;:::-;4681:2;4789:10;4785:2;4778:22;4568:238;;;:::o;4812:180::-;4860:77;4857:1;4850:88;4957:4;4954:1;4947:15;4981:4;4978:1;4971:15;4998:180;5046:77;5043:1;5036:88;5143:4;5140:1;5133:15;5167:4;5164:1;5157:15;5184:180;5232:77;5229:1;5222:88;5329:4;5326:1;5319:15;5353:4;5350:1;5343:15;5370:102;5411:6;5462:2;5458:7;5453:2;5446:5;5442:14;5438:28;5428:38;;5418:54;;;:::o;5478:181::-;5618:33;5614:1;5606:6;5602:14;5595:57;5584:75;:::o;5665:122::-;5738:24;5756:5;5738:24;:::i;:::-;5731:5;5728:35;5718:2;;5777:1;5774;5767:12;5718:2;5708:79;:::o;465:272:4:-;;;;;;;',
    };
    const reef20Contract = new ContractFactory(reef20Abi, reef20Bytecode, signer.signer);
    const cArgs = [tokenName, symbol, initialSupply];
    // const contract = await reef20Contract.deploy(...cArgs);
    const contract = new Contract('0xCAeF76fe01C4f5d66c7A69dBD508C01d57021023', reef20Abi, signer.signer);
    const bal = (await contract.balanceOf(signer.evmAddress)).toString();
    console.log('deployed =', (contract.address), 'bal=', bal);
    verifyContract(contract, {

    },
        cArgs,
        currentNetwork.reefscanUrl
        )
  };

  return (
    <>
      { !resultMessage
    && (
    <>
      <ComponentCenter>
        <Card>
          <CardHeader>
            <CardHeaderBlank />
            <CardTitle title="Create Token" />
            <CardHeaderBlank />
          </CardHeader>

          <MT size="2">
            <Input
              value={tokenName}
              maxLength={42}
              onChange={setTokenName}
              placeholder="Token Name"
              disabled={isLoading}
            />
          </MT>
          <MT size="2">
            <Input
              value={symbol}
              maxLength={42}
              onChange={setSymbol}
              placeholder="Token Symbol"
              disabled={isLoading}
            />
          </MT>
          <MT size="2">
            <Input
              value={initialSupply.toString()}
              maxLength={42}
              onChange={(e) => { setTotalSupply(utils.parseEther(e).toString()); }}
              placeholder="Token Total Supply Number"
              disabled={isLoading}
            />
          </MT>
          <Button onClick={createToken} />
          {/* <MT size="2">
            <CenterColumn>
              <OpenModalButton id="txModalToggle" disabled={!!validationError || isLoading}>
                {isLoading ? (
                  <LoadingButtonIconWithText
                    text="Sending"
                  />
                ) : validationError || 'Send'}
              </OpenModalButton>
            </CenterColumn>
          </MT> */}
        </Card>
      </ComponentCenter>

      {/* <ConfirmationModal id="txModalToggle" title="Confirm and Send" confirmFun={onConfirmed} closeOnConfirm>
        <TokenAmountView
          name={txToken.name}
          amount={txToken.amount}
          usdAmount={calculateUsdAmount(txToken)}
          placeholder="Send Token"
        />
        <Margin size="3">
          <ConfirmLabel title="Send To" value={`${to.substr(0, 10)} ... ${to.substr(to.length - 10)}`} />
        </Margin>
      </ConfirmationModal> */}
    </>
    )}

      {/* {resultMessage && (
      <ComponentCenter>
        <Card>
          <CardHeader>
            <CardHeaderBlank />
            <CardTitle title={resultMessage} />
            <CardHeaderBlank />
          </CardHeader>
          <MT size="3">
            <div className="text-center">No tokens sent.</div>
          </MT>
          <MT size="2">
            <ModalFooter>
              <Button onClick={initTransfer}>Close</Button>
            </ModalFooter>
          </MT>
        </Card>
      </ComponentCenter>
      )} */}
    </>
  );
};
