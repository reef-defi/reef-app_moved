export const metadataReef20Deploy = {
  data: {
    bytecode: {
      generatedSources: [
        {
          ast: {
            nodeType: 'YulBlock',
            src: '0:2876:5',
            statements: [
              {
                nodeType: 'YulBlock',
                src: '6:3:5',
                statements: [],
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '78:845:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '127:24:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '136:5:5',
                                },
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '143:5:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '129:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '129:20:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '129:20:5',
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
                                    src: '106:6:5',
                                  },
                                  {
                                    kind: 'number',
                                    nodeType: 'YulLiteral',
                                    src: '114:4:5',
                                    type: '',
                                    value: '0x1f',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '102:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '102:17:5',
                              },
                              {
                                name: 'end',
                                nodeType: 'YulIdentifier',
                                src: '121:3:5',
                              },
                            ],
                            functionName: {
                              name: 'slt',
                              nodeType: 'YulIdentifier',
                              src: '98:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '98:27:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '91:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '91:35:5',
                      },
                      nodeType: 'YulIf',
                      src: '88:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '160:23:5',
                      value: {
                        arguments: [
                          {
                            name: 'offset',
                            nodeType: 'YulIdentifier',
                            src: '176:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '170:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '170:13:5',
                      },
                      variables: [
                        {
                          name: '_1',
                          nodeType: 'YulTypedName',
                          src: '164:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '192:28:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '210:2:5',
                                type: '',
                                value: '64',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '214:1:5',
                                type: '',
                                value: '1',
                              },
                            ],
                            functionName: {
                              name: 'shl',
                              nodeType: 'YulIdentifier',
                              src: '206:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '206:10:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '218:1:5',
                            type: '',
                            value: '1',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '202:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '202:18:5',
                      },
                      variables: [
                        {
                          name: '_2',
                          nodeType: 'YulTypedName',
                          src: '196:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '243:22:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x41',
                                nodeType: 'YulIdentifier',
                                src: '245:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '245:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '245:18:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '235:2:5',
                          },
                          {
                            name: '_2',
                            nodeType: 'YulIdentifier',
                            src: '239:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '232:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '232:10:5',
                      },
                      nodeType: 'YulIf',
                      src: '229:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '274:17:5',
                      value: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '288:2:5',
                            type: '',
                            value: '31',
                          },
                        ],
                        functionName: {
                          name: 'not',
                          nodeType: 'YulIdentifier',
                          src: '284:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '284:7:5',
                      },
                      variables: [
                        {
                          name: '_3',
                          nodeType: 'YulTypedName',
                          src: '278:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '300:23:5',
                      value: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '320:2:5',
                            type: '',
                            value: '64',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '314:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '314:9:5',
                      },
                      variables: [
                        {
                          name: 'memPtr',
                          nodeType: 'YulTypedName',
                          src: '304:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '332:71:5',
                      value: {
                        arguments: [
                          {
                            name: 'memPtr',
                            nodeType: 'YulIdentifier',
                            src: '354:6:5',
                          },
                          {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    arguments: [
                                      {
                                        arguments: [
                                          {
                                            name: '_1',
                                            nodeType: 'YulIdentifier',
                                            src: '378:2:5',
                                          },
                                          {
                                            kind: 'number',
                                            nodeType: 'YulLiteral',
                                            src: '382:4:5',
                                            type: '',
                                            value: '0x1f',
                                          },
                                        ],
                                        functionName: {
                                          name: 'add',
                                          nodeType: 'YulIdentifier',
                                          src: '374:3:5',
                                        },
                                        nodeType: 'YulFunctionCall',
                                        src: '374:13:5',
                                      },
                                      {
                                        name: '_3',
                                        nodeType: 'YulIdentifier',
                                        src: '389:2:5',
                                      },
                                    ],
                                    functionName: {
                                      name: 'and',
                                      nodeType: 'YulIdentifier',
                                      src: '370:3:5',
                                    },
                                    nodeType: 'YulFunctionCall',
                                    src: '370:22:5',
                                  },
                                  {
                                    kind: 'number',
                                    nodeType: 'YulLiteral',
                                    src: '394:2:5',
                                    type: '',
                                    value: '63',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '366:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '366:31:5',
                              },
                              {
                                name: '_3',
                                nodeType: 'YulIdentifier',
                                src: '399:2:5',
                              },
                            ],
                            functionName: {
                              name: 'and',
                              nodeType: 'YulIdentifier',
                              src: '362:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '362:40:5',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '350:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '350:53:5',
                      },
                      variables: [
                        {
                          name: 'newFreePtr',
                          nodeType: 'YulTypedName',
                          src: '336:10:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '462:22:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x41',
                                nodeType: 'YulIdentifier',
                                src: '464:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '464:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '464:18:5',
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
                                src: '421:10:5',
                              },
                              {
                                name: '_2',
                                nodeType: 'YulIdentifier',
                                src: '433:2:5',
                              },
                            ],
                            functionName: {
                              name: 'gt',
                              nodeType: 'YulIdentifier',
                              src: '418:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '418:18:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'newFreePtr',
                                nodeType: 'YulIdentifier',
                                src: '441:10:5',
                              },
                              {
                                name: 'memPtr',
                                nodeType: 'YulIdentifier',
                                src: '453:6:5',
                              },
                            ],
                            functionName: {
                              name: 'lt',
                              nodeType: 'YulIdentifier',
                              src: '438:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '438:22:5',
                          },
                        ],
                        functionName: {
                          name: 'or',
                          nodeType: 'YulIdentifier',
                          src: '415:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '415:46:5',
                      },
                      nodeType: 'YulIf',
                      src: '412:2:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '500:2:5',
                            type: '',
                            value: '64',
                          },
                          {
                            name: 'newFreePtr',
                            nodeType: 'YulIdentifier',
                            src: '504:10:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '493:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '493:22:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '493:22:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memPtr',
                            nodeType: 'YulIdentifier',
                            src: '531:6:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '539:2:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '524:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '524:18:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '524:18:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '551:14:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '561:4:5',
                        type: '',
                        value: '0x20',
                      },
                      variables: [
                        {
                          name: '_4',
                          nodeType: 'YulTypedName',
                          src: '555:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '611:24:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '620:5:5',
                                },
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '627:5:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '613:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '613:20:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '613:20:5',
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
                                    src: '588:6:5',
                                  },
                                  {
                                    name: '_1',
                                    nodeType: 'YulIdentifier',
                                    src: '596:2:5',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '584:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '584:15:5',
                              },
                              {
                                name: '_4',
                                nodeType: 'YulIdentifier',
                                src: '601:2:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '580:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '580:24:5',
                          },
                          {
                            name: 'end',
                            nodeType: 'YulIdentifier',
                            src: '606:3:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '577:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '577:33:5',
                      },
                      nodeType: 'YulIf',
                      src: '574:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '644:14:5',
                      value: {
                        name: 'array',
                        nodeType: 'YulIdentifier',
                        src: '653:5:5',
                      },
                      variables: [
                        {
                          name: 'i',
                          nodeType: 'YulTypedName',
                          src: '648:1:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '713:87:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  arguments: [
                                    {
                                      arguments: [
                                        {
                                          name: 'memPtr',
                                          nodeType: 'YulIdentifier',
                                          src: '742:6:5',
                                        },
                                        {
                                          name: 'i',
                                          nodeType: 'YulIdentifier',
                                          src: '750:1:5',
                                        },
                                      ],
                                      functionName: {
                                        name: 'add',
                                        nodeType: 'YulIdentifier',
                                        src: '738:3:5',
                                      },
                                      nodeType: 'YulFunctionCall',
                                      src: '738:14:5',
                                    },
                                    {
                                      name: '_4',
                                      nodeType: 'YulIdentifier',
                                      src: '754:2:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'add',
                                    nodeType: 'YulIdentifier',
                                    src: '734:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '734:23:5',
                                },
                                {
                                  arguments: [
                                    {
                                      arguments: [
                                        {
                                          arguments: [
                                            {
                                              name: 'offset',
                                              nodeType: 'YulIdentifier',
                                              src: '773:6:5',
                                            },
                                            {
                                              name: 'i',
                                              nodeType: 'YulIdentifier',
                                              src: '781:1:5',
                                            },
                                          ],
                                          functionName: {
                                            name: 'add',
                                            nodeType: 'YulIdentifier',
                                            src: '769:3:5',
                                          },
                                          nodeType: 'YulFunctionCall',
                                          src: '769:14:5',
                                        },
                                        {
                                          name: '_4',
                                          nodeType: 'YulIdentifier',
                                          src: '785:2:5',
                                        },
                                      ],
                                      functionName: {
                                        name: 'add',
                                        nodeType: 'YulIdentifier',
                                        src: '765:3:5',
                                      },
                                      nodeType: 'YulFunctionCall',
                                      src: '765:23:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'mload',
                                    nodeType: 'YulIdentifier',
                                    src: '759:5:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '759:30:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '727:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '727:63:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '727:63:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'i',
                            nodeType: 'YulIdentifier',
                            src: '678:1:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '681:2:5',
                          },
                        ],
                        functionName: {
                          name: 'lt',
                          nodeType: 'YulIdentifier',
                          src: '675:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '675:9:5',
                      },
                      nodeType: 'YulForLoop',
                      post: {
                        nodeType: 'YulBlock',
                        src: '685:19:5',
                        statements: [
                          {
                            nodeType: 'YulAssignment',
                            src: '687:15:5',
                            value: {
                              arguments: [
                                {
                                  name: 'i',
                                  nodeType: 'YulIdentifier',
                                  src: '696:1:5',
                                },
                                {
                                  name: '_4',
                                  nodeType: 'YulIdentifier',
                                  src: '699:2:5',
                                },
                              ],
                              functionName: {
                                name: 'add',
                                nodeType: 'YulIdentifier',
                                src: '692:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '692:10:5',
                            },
                            variableNames: [
                              {
                                name: 'i',
                                nodeType: 'YulIdentifier',
                                src: '687:1:5',
                              },
                            ],
                          },
                        ],
                      },
                      pre: {
                        nodeType: 'YulBlock',
                        src: '671:3:5',
                        statements: [],
                      },
                      src: '667:133:5',
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '830:63:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  arguments: [
                                    {
                                      arguments: [
                                        {
                                          name: 'memPtr',
                                          nodeType: 'YulIdentifier',
                                          src: '859:6:5',
                                        },
                                        {
                                          name: '_1',
                                          nodeType: 'YulIdentifier',
                                          src: '867:2:5',
                                        },
                                      ],
                                      functionName: {
                                        name: 'add',
                                        nodeType: 'YulIdentifier',
                                        src: '855:3:5',
                                      },
                                      nodeType: 'YulFunctionCall',
                                      src: '855:15:5',
                                    },
                                    {
                                      name: '_4',
                                      nodeType: 'YulIdentifier',
                                      src: '872:2:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'add',
                                    nodeType: 'YulIdentifier',
                                    src: '851:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '851:24:5',
                                },
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '877:5:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '844:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '844:39:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '844:39:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'i',
                            nodeType: 'YulIdentifier',
                            src: '815:1:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '818:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '812:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '812:9:5',
                      },
                      nodeType: 'YulIf',
                      src: '809:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '902:15:5',
                      value: {
                        name: 'memPtr',
                        nodeType: 'YulIdentifier',
                        src: '911:6:5',
                      },
                      variableNames: [
                        {
                          name: 'array',
                          nodeType: 'YulIdentifier',
                          src: '902:5:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'abi_decode_string_fromMemory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'offset',
                    nodeType: 'YulTypedName',
                    src: '52:6:5',
                    type: '',
                  },
                  {
                    name: 'end',
                    nodeType: 'YulTypedName',
                    src: '60:3:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'array',
                    nodeType: 'YulTypedName',
                    src: '68:5:5',
                    type: '',
                  },
                ],
                src: '14:909:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '1063:518:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '1109:26:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1118:6:5',
                                },
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1126:6:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '1111:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '1111:22:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '1111:22:5',
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
                                src: '1084:7:5',
                              },
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1093:9:5',
                              },
                            ],
                            functionName: {
                              name: 'sub',
                              nodeType: 'YulIdentifier',
                              src: '1080:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1080:23:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1105:2:5',
                            type: '',
                            value: '96',
                          },
                        ],
                        functionName: {
                          name: 'slt',
                          nodeType: 'YulIdentifier',
                          src: '1076:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1076:32:5',
                      },
                      nodeType: 'YulIf',
                      src: '1073:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1144:30:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1164:9:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '1158:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1158:16:5',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1148:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1183:28:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1201:2:5',
                                type: '',
                                value: '64',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1205:1:5',
                                type: '',
                                value: '1',
                              },
                            ],
                            functionName: {
                              name: 'shl',
                              nodeType: 'YulIdentifier',
                              src: '1197:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1197:10:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1209:1:5',
                            type: '',
                            value: '1',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '1193:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1193:18:5',
                      },
                      variables: [
                        {
                          name: '_1',
                          nodeType: 'YulTypedName',
                          src: '1187:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '1238:26:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1247:6:5',
                                },
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1255:6:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '1240:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '1240:22:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '1240:22:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'offset',
                            nodeType: 'YulIdentifier',
                            src: '1226:6:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '1234:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '1223:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1223:14:5',
                      },
                      nodeType: 'YulIf',
                      src: '1220:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1273:71:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1316:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1327:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1312:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1312:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1336:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_string_fromMemory',
                          nodeType: 'YulIdentifier',
                          src: '1283:28:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1283:61:5',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '1273:6:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1353:41:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1379:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1390:2:5',
                                type: '',
                                value: '32',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1375:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1375:18:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '1369:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1369:25:5',
                      },
                      variables: [
                        {
                          name: 'offset_1',
                          nodeType: 'YulTypedName',
                          src: '1357:8:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '1423:26:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'value1',
                                  nodeType: 'YulIdentifier',
                                  src: '1432:6:5',
                                },
                                {
                                  name: 'value1',
                                  nodeType: 'YulIdentifier',
                                  src: '1440:6:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '1425:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '1425:22:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '1425:22:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'offset_1',
                            nodeType: 'YulIdentifier',
                            src: '1409:8:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '1419:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '1406:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1406:16:5',
                      },
                      nodeType: 'YulIf',
                      src: '1403:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1458:73:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1501:9:5',
                              },
                              {
                                name: 'offset_1',
                                nodeType: 'YulIdentifier',
                                src: '1512:8:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1497:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1497:24:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1523:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_string_fromMemory',
                          nodeType: 'YulIdentifier',
                          src: '1468:28:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1468:63:5',
                      },
                      variableNames: [
                        {
                          name: 'value1',
                          nodeType: 'YulIdentifier',
                          src: '1458:6:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1540:35:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1560:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1571:2:5',
                                type: '',
                                value: '64',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1556:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1556:18:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '1550:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1550:25:5',
                      },
                      variableNames: [
                        {
                          name: 'value2',
                          nodeType: 'YulIdentifier',
                          src: '1540:6:5',
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
                    src: '1013:9:5',
                    type: '',
                  },
                  {
                    name: 'dataEnd',
                    nodeType: 'YulTypedName',
                    src: '1024:7:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'value0',
                    nodeType: 'YulTypedName',
                    src: '1036:6:5',
                    type: '',
                  },
                  {
                    name: 'value1',
                    nodeType: 'YulTypedName',
                    src: '1044:6:5',
                    type: '',
                  },
                  {
                    name: 'value2',
                    nodeType: 'YulTypedName',
                    src: '1052:6:5',
                    type: '',
                  },
                ],
                src: '928:653:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '1760:181:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1777:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1788:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '1770:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1770:21:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '1770:21:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1811:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1822:2:5',
                                type: '',
                                value: '32',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1807:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1807:18:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1827:2:5',
                            type: '',
                            value: '31',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '1800:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1800:30:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '1800:30:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1850:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1861:2:5',
                                type: '',
                                value: '64',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1846:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1846:18:5',
                          },
                          {
                            kind: 'string',
                            nodeType: 'YulLiteral',
                            src: '1866:33:5',
                            type: '',
                            value: 'ERC20: mint to the zero address',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '1839:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1839:61:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '1839:61:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1909:26:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1921:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1932:2:5',
                            type: '',
                            value: '96',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '1917:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1917:18:5',
                      },
                      variableNames: [
                        {
                          name: 'tail',
                          nodeType: 'YulIdentifier',
                          src: '1909:4:5',
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
                    src: '1737:9:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'tail',
                    nodeType: 'YulTypedName',
                    src: '1751:4:5',
                    type: '',
                  },
                ],
                src: '1586:355:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2047:76:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2057:26:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2069:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2080:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2065:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2065:18:5',
                      },
                      variableNames: [
                        {
                          name: 'tail',
                          nodeType: 'YulIdentifier',
                          src: '2057:4:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2099:9:5',
                          },
                          {
                            name: 'value0',
                            nodeType: 'YulIdentifier',
                            src: '2110:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2092:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2092:25:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2092:25:5',
                    },
                  ],
                },
                name: 'abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'headStart',
                    nodeType: 'YulTypedName',
                    src: '2016:9:5',
                    type: '',
                  },
                  {
                    name: 'value0',
                    nodeType: 'YulTypedName',
                    src: '2027:6:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'tail',
                    nodeType: 'YulTypedName',
                    src: '2038:4:5',
                    type: '',
                  },
                ],
                src: '1946:177:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2176:181:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '2211:115:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'sum',
                                  nodeType: 'YulIdentifier',
                                  src: '2232:3:5',
                                },
                                {
                                  arguments: [
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2241:3:5',
                                      type: '',
                                      value: '224',
                                    },
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2246:10:5',
                                      type: '',
                                      value: '0x4e487b71',
                                    },
                                  ],
                                  functionName: {
                                    name: 'shl',
                                    nodeType: 'YulIdentifier',
                                    src: '2237:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '2237:20:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2225:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2225:33:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2225:33:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2278:1:5',
                                  type: '',
                                  value: '4',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2281:4:5',
                                  type: '',
                                  value: '0x11',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2271:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2271:15:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2271:15:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'sum',
                                  nodeType: 'YulIdentifier',
                                  src: '2306:3:5',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2311:4:5',
                                  type: '',
                                  value: '0x24',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '2299:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2299:17:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2299:17:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'x',
                            nodeType: 'YulIdentifier',
                            src: '2192:1:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'y',
                                nodeType: 'YulIdentifier',
                                src: '2199:1:5',
                              },
                            ],
                            functionName: {
                              name: 'not',
                              nodeType: 'YulIdentifier',
                              src: '2195:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2195:6:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '2189:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2189:13:5',
                      },
                      nodeType: 'YulIf',
                      src: '2186:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '2335:16:5',
                      value: {
                        arguments: [
                          {
                            name: 'x',
                            nodeType: 'YulIdentifier',
                            src: '2346:1:5',
                          },
                          {
                            name: 'y',
                            nodeType: 'YulIdentifier',
                            src: '2349:1:5',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2342:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2342:9:5',
                      },
                      variableNames: [
                        {
                          name: 'sum',
                          nodeType: 'YulIdentifier',
                          src: '2335:3:5',
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
                    src: '2159:1:5',
                    type: '',
                  },
                  {
                    name: 'y',
                    nodeType: 'YulTypedName',
                    src: '2162:1:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'sum',
                    nodeType: 'YulTypedName',
                    src: '2168:3:5',
                    type: '',
                  },
                ],
                src: '2128:229:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2417:325:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2427:22:5',
                      value: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2441:1:5',
                            type: '',
                            value: '1',
                          },
                          {
                            name: 'data',
                            nodeType: 'YulIdentifier',
                            src: '2444:4:5',
                          },
                        ],
                        functionName: {
                          name: 'shr',
                          nodeType: 'YulIdentifier',
                          src: '2437:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2437:12:5',
                      },
                      variableNames: [
                        {
                          name: 'length',
                          nodeType: 'YulIdentifier',
                          src: '2427:6:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '2458:38:5',
                      value: {
                        arguments: [
                          {
                            name: 'data',
                            nodeType: 'YulIdentifier',
                            src: '2488:4:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2494:1:5',
                            type: '',
                            value: '1',
                          },
                        ],
                        functionName: {
                          name: 'and',
                          nodeType: 'YulIdentifier',
                          src: '2484:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2484:12:5',
                      },
                      variables: [
                        {
                          name: 'outOfPlaceEncoding',
                          nodeType: 'YulTypedName',
                          src: '2462:18:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '2535:31:5',
                        statements: [
                          {
                            nodeType: 'YulAssignment',
                            src: '2537:27:5',
                            value: {
                              arguments: [
                                {
                                  name: 'length',
                                  nodeType: 'YulIdentifier',
                                  src: '2551:6:5',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2559:4:5',
                                  type: '',
                                  value: '0x7f',
                                },
                              ],
                              functionName: {
                                name: 'and',
                                nodeType: 'YulIdentifier',
                                src: '2547:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2547:17:5',
                            },
                            variableNames: [
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '2537:6:5',
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
                            src: '2515:18:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '2508:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2508:26:5',
                      },
                      nodeType: 'YulIf',
                      src: '2505:2:5',
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '2625:111:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2646:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  arguments: [
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2653:3:5',
                                      type: '',
                                      value: '224',
                                    },
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2658:10:5',
                                      type: '',
                                      value: '0x4e487b71',
                                    },
                                  ],
                                  functionName: {
                                    name: 'shl',
                                    nodeType: 'YulIdentifier',
                                    src: '2649:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '2649:20:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2639:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2639:31:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2639:31:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2690:1:5',
                                  type: '',
                                  value: '4',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2693:4:5',
                                  type: '',
                                  value: '0x22',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2683:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2683:15:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2683:15:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2718:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2721:4:5',
                                  type: '',
                                  value: '0x24',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '2711:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2711:15:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2711:15:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'outOfPlaceEncoding',
                            nodeType: 'YulIdentifier',
                            src: '2581:18:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '2604:6:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2612:2:5',
                                type: '',
                                value: '32',
                              },
                            ],
                            functionName: {
                              name: 'lt',
                              nodeType: 'YulIdentifier',
                              src: '2601:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2601:14:5',
                          },
                        ],
                        functionName: {
                          name: 'eq',
                          nodeType: 'YulIdentifier',
                          src: '2578:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2578:38:5',
                      },
                      nodeType: 'YulIf',
                      src: '2575:2:5',
                    },
                  ],
                },
                name: 'extract_byte_array_length',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'data',
                    nodeType: 'YulTypedName',
                    src: '2397:4:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'length',
                    nodeType: 'YulTypedName',
                    src: '2406:6:5',
                    type: '',
                  },
                ],
                src: '2362:380:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2779:95:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2796:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2803:3:5',
                                type: '',
                                value: '224',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2808:10:5',
                                type: '',
                                value: '0x4e487b71',
                              },
                            ],
                            functionName: {
                              name: 'shl',
                              nodeType: 'YulIdentifier',
                              src: '2799:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2799:20:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2789:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2789:31:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2789:31:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2836:1:5',
                            type: '',
                            value: '4',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2839:4:5',
                            type: '',
                            value: '0x41',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2829:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2829:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2829:15:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2860:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2863:4:5',
                            type: '',
                            value: '0x24',
                          },
                        ],
                        functionName: {
                          name: 'revert',
                          nodeType: 'YulIdentifier',
                          src: '2853:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2853:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2853:15:5',
                    },
                  ],
                },
                name: 'panic_error_0x41',
                nodeType: 'YulFunctionDefinition',
                src: '2747:127:5',
              },
            ],
          },
          contents: '{\n    { }\n    function abi_decode_string_fromMemory(offset, end) -> array\n    {\n        if iszero(slt(add(offset, 0x1f), end)) { revert(array, array) }\n        let _1 := mload(offset)\n        let _2 := sub(shl(64, 1), 1)\n        if gt(_1, _2) { panic_error_0x41() }\n        let _3 := not(31)\n        let memPtr := mload(64)\n        let newFreePtr := add(memPtr, and(add(and(add(_1, 0x1f), _3), 63), _3))\n        if or(gt(newFreePtr, _2), lt(newFreePtr, memPtr)) { panic_error_0x41() }\n        mstore(64, newFreePtr)\n        mstore(memPtr, _1)\n        let _4 := 0x20\n        if gt(add(add(offset, _1), _4), end) { revert(array, array) }\n        let i := array\n        for { } lt(i, _1) { i := add(i, _4) }\n        {\n            mstore(add(add(memPtr, i), _4), mload(add(add(offset, i), _4)))\n        }\n        if gt(i, _1)\n        {\n            mstore(add(add(memPtr, _1), _4), array)\n        }\n        array := memPtr\n    }\n    function abi_decode_tuple_t_string_memory_ptrt_string_memory_ptrt_uint256_fromMemory(headStart, dataEnd) -> value0, value1, value2\n    {\n        if slt(sub(dataEnd, headStart), 96) { revert(value0, value0) }\n        let offset := mload(headStart)\n        let _1 := sub(shl(64, 1), 1)\n        if gt(offset, _1) { revert(value0, value0) }\n        value0 := abi_decode_string_fromMemory(add(headStart, offset), dataEnd)\n        let offset_1 := mload(add(headStart, 32))\n        if gt(offset_1, _1) { revert(value1, value1) }\n        value1 := abi_decode_string_fromMemory(add(headStart, offset_1), dataEnd)\n        value2 := mload(add(headStart, 64))\n    }\n    function abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 31)\n        mstore(add(headStart, 64), "ERC20: mint to the zero address")\n        tail := add(headStart, 96)\n    }\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function checked_add_t_uint256(x, y) -> sum\n    {\n        if gt(x, not(y))\n        {\n            mstore(sum, shl(224, 0x4e487b71))\n            mstore(4, 0x11)\n            revert(sum, 0x24)\n        }\n        sum := add(x, y)\n    }\n    function extract_byte_array_length(data) -> length\n    {\n        length := shr(1, data)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) { length := and(length, 0x7f) }\n        if eq(outOfPlaceEncoding, lt(length, 32))\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x22)\n            revert(0, 0x24)\n        }\n    }\n    function panic_error_0x41()\n    {\n        mstore(0, shl(224, 0x4e487b71))\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n}',
          id: 5,
          language: 'Yul',
          name: '#utility.yul',
        },
      ],
      linkReferences: {},
      object: '60806040523480156200001157600080fd5b5060405162000c7638038062000c768339810160408190526200003491620002c2565b8251839083906200004d90600390602085019062000169565b5080516200006390600490602084019062000169565b5050506200007833826200008160201b60201c565b505050620003aa565b6001600160a01b038216620000dc5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000f0919062000332565b90915550506001600160a01b038216600090815260208190526040812080548392906200011f90849062000332565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001779062000357565b90600052602060002090601f0160209004810192826200019b5760008555620001e6565b82601f10620001b657805160ff1916838001178555620001e6565b82800160010185558215620001e6579182015b82811115620001e6578251825591602001919060010190620001c9565b50620001f4929150620001f8565b5090565b5b80821115620001f45760008155600101620001f9565b600082601f83011262000220578081fd5b81516001600160401b03808211156200023d576200023d62000394565b604051601f8301601f19908116603f0116810190828211818310171562000268576200026862000394565b8160405283815260209250868385880101111562000284578485fd5b8491505b83821015620002a7578582018301518183018401529082019062000288565b83821115620002b857848385830101525b9695505050505050565b600080600060608486031215620002d7578283fd5b83516001600160401b0380821115620002ee578485fd5b620002fc878388016200020f565b9450602086015191508082111562000312578384fd5b5062000321868287016200020f565b925050604084015190509250925092565b600082198211156200035257634e487b7160e01b81526011600452602481fd5b500190565b600181811c908216806200036c57607f821691505b602082108114156200038e57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6108bc80620003ba6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101c6565b6040516100c391906107d4565b60405180910390f35b6100df6100da3660046107ab565b610258565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610770565b61026e565b604051601281526020016100c3565b6100df6101313660046107ab565b61031d565b6100f361014436600461071d565b6001600160a01b031660009081526020819052604090205490565b6100b6610359565b6100df6101753660046107ab565b610368565b6100df6101883660046107ab565b610401565b6100f361019b36600461073e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101d59061084b565b80601f01602080910402602001604051908101604052809291908181526020018280546102019061084b565b801561024e5780601f106102235761010080835404028352916020019161024e565b820191906000526020600020905b81548152906001019060200180831161023157829003601f168201915b5050505050905090565b600061026533848461040e565b50600192915050565b600061027b848484610532565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156103055760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b610312853385840361040e565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091610265918590610354908690610827565b61040e565b6060600480546101d59061084b565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156103ea5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016102fc565b6103f7338585840361040e565b5060019392505050565b6000610265338484610532565b6001600160a01b0383166104705760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016102fc565b6001600160a01b0382166104d15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102fc565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105965760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102fc565b6001600160a01b0382166105f85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102fc565b6001600160a01b038316600090815260208190526040902054818110156106705760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016102fc565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106a7908490610827565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106f391815260200190565b60405180910390a350505050565b80356001600160a01b038116811461071857600080fd5b919050565b60006020828403121561072e578081fd5b61073782610701565b9392505050565b60008060408385031215610750578081fd5b61075983610701565b915061076760208401610701565b90509250929050565b600080600060608486031215610784578081fd5b61078d84610701565b925061079b60208501610701565b9150604084013590509250925092565b600080604083850312156107bd578182fd5b6107c683610701565b946020939093013593505050565b6000602080835283518082850152825b81811015610800578581018301518582016040015282016107e4565b818111156108115783604083870101525b50601f01601f1916929092016040019392505050565b6000821982111561084657634e487b7160e01b81526011600452602481fd5b500190565b600181811c9082168061085f57607f821691505b6020821081141561088057634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220cdd11c7f45caa26807388b7400653bba9ce712a0068d2f948e2bef2cbb323b1e64736f6c63430008040033',
      opcodes: 'PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH3 0x11 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH3 0xC76 CODESIZE SUB DUP1 PUSH3 0xC76 DUP4 CODECOPY DUP2 ADD PUSH1 0x40 DUP2 SWAP1 MSTORE PUSH3 0x34 SWAP2 PUSH3 0x2C2 JUMP JUMPDEST DUP3 MLOAD DUP4 SWAP1 DUP4 SWAP1 PUSH3 0x4D SWAP1 PUSH1 0x3 SWAP1 PUSH1 0x20 DUP6 ADD SWAP1 PUSH3 0x169 JUMP JUMPDEST POP DUP1 MLOAD PUSH3 0x63 SWAP1 PUSH1 0x4 SWAP1 PUSH1 0x20 DUP5 ADD SWAP1 PUSH3 0x169 JUMP JUMPDEST POP POP POP PUSH3 0x78 CALLER DUP3 PUSH3 0x81 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST POP POP POP PUSH3 0x3AA JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH3 0xDC JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1F PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A206D696E7420746F20746865207A65726F206164647265737300 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH3 0xF0 SWAP2 SWAP1 PUSH3 0x332 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD DUP4 SWAP3 SWAP1 PUSH3 0x11F SWAP1 DUP5 SWAP1 PUSH3 0x332 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x40 MLOAD DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP1 PUSH1 0x0 SWAP1 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP1 PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH3 0x177 SWAP1 PUSH3 0x357 JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH3 0x19B JUMPI PUSH1 0x0 DUP6 SSTORE PUSH3 0x1E6 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH3 0x1B6 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH3 0x1E6 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH3 0x1E6 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x1E6 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0x1C9 JUMP JUMPDEST POP PUSH3 0x1F4 SWAP3 SWAP2 POP PUSH3 0x1F8 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x1F4 JUMPI PUSH1 0x0 DUP2 SSTORE PUSH1 0x1 ADD PUSH3 0x1F9 JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH3 0x220 JUMPI DUP1 DUP2 REVERT JUMPDEST DUP2 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP1 DUP3 GT ISZERO PUSH3 0x23D JUMPI PUSH3 0x23D PUSH3 0x394 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1F DUP4 ADD PUSH1 0x1F NOT SWAP1 DUP2 AND PUSH1 0x3F ADD AND DUP2 ADD SWAP1 DUP3 DUP3 GT DUP2 DUP4 LT OR ISZERO PUSH3 0x268 JUMPI PUSH3 0x268 PUSH3 0x394 JUMP JUMPDEST DUP2 PUSH1 0x40 MSTORE DUP4 DUP2 MSTORE PUSH1 0x20 SWAP3 POP DUP7 DUP4 DUP6 DUP9 ADD ADD GT ISZERO PUSH3 0x284 JUMPI DUP5 DUP6 REVERT JUMPDEST DUP5 SWAP2 POP JUMPDEST DUP4 DUP3 LT ISZERO PUSH3 0x2A7 JUMPI DUP6 DUP3 ADD DUP4 ADD MLOAD DUP2 DUP4 ADD DUP5 ADD MSTORE SWAP1 DUP3 ADD SWAP1 PUSH3 0x288 JUMP JUMPDEST DUP4 DUP3 GT ISZERO PUSH3 0x2B8 JUMPI DUP5 DUP4 DUP6 DUP4 ADD ADD MSTORE JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH3 0x2D7 JUMPI DUP3 DUP4 REVERT JUMPDEST DUP4 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP1 DUP3 GT ISZERO PUSH3 0x2EE JUMPI DUP5 DUP6 REVERT JUMPDEST PUSH3 0x2FC DUP8 DUP4 DUP9 ADD PUSH3 0x20F JUMP JUMPDEST SWAP5 POP PUSH1 0x20 DUP7 ADD MLOAD SWAP2 POP DUP1 DUP3 GT ISZERO PUSH3 0x312 JUMPI DUP4 DUP5 REVERT JUMPDEST POP PUSH3 0x321 DUP7 DUP3 DUP8 ADD PUSH3 0x20F JUMP JUMPDEST SWAP3 POP POP PUSH1 0x40 DUP5 ADD MLOAD SWAP1 POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 DUP3 NOT DUP3 GT ISZERO PUSH3 0x352 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 DUP2 REVERT JUMPDEST POP ADD SWAP1 JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH3 0x36C JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH3 0x38E JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH2 0x8BC DUP1 PUSH3 0x3BA PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0xA9 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x39509351 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0x39509351 EQ PUSH2 0x123 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x136 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x15F JUMPI DUP1 PUSH4 0xA457C2D7 EQ PUSH2 0x167 JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x17A JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x18D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0xAE JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0xCC JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0xEF JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x101 JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x114 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xB6 PUSH2 0x1C6 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xC3 SWAP2 SWAP1 PUSH2 0x7D4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0xDF PUSH2 0xDA CALLDATASIZE PUSH1 0x4 PUSH2 0x7AB JUMP JUMPDEST PUSH2 0x258 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xC3 JUMP JUMPDEST PUSH1 0x2 SLOAD JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xC3 JUMP JUMPDEST PUSH2 0xDF PUSH2 0x10F CALLDATASIZE PUSH1 0x4 PUSH2 0x770 JUMP JUMPDEST PUSH2 0x26E JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x12 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xC3 JUMP JUMPDEST PUSH2 0xDF PUSH2 0x131 CALLDATASIZE PUSH1 0x4 PUSH2 0x7AB JUMP JUMPDEST PUSH2 0x31D JUMP JUMPDEST PUSH2 0xF3 PUSH2 0x144 CALLDATASIZE PUSH1 0x4 PUSH2 0x71D JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD SWAP1 JUMP JUMPDEST PUSH2 0xB6 PUSH2 0x359 JUMP JUMPDEST PUSH2 0xDF PUSH2 0x175 CALLDATASIZE PUSH1 0x4 PUSH2 0x7AB JUMP JUMPDEST PUSH2 0x368 JUMP JUMPDEST PUSH2 0xDF PUSH2 0x188 CALLDATASIZE PUSH1 0x4 PUSH2 0x7AB JUMP JUMPDEST PUSH2 0x401 JUMP JUMPDEST PUSH2 0xF3 PUSH2 0x19B CALLDATASIZE PUSH1 0x4 PUSH2 0x73E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP2 DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP4 SWAP1 SWAP5 AND DUP3 MSTORE SWAP2 SWAP1 SWAP2 MSTORE KECCAK256 SLOAD SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x3 DUP1 SLOAD PUSH2 0x1D5 SWAP1 PUSH2 0x84B JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x201 SWAP1 PUSH2 0x84B JUMP JUMPDEST DUP1 ISZERO PUSH2 0x24E JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x223 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x24E JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x231 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x265 CALLER DUP5 DUP5 PUSH2 0x40E JUMP JUMPDEST POP PUSH1 0x1 SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x27B DUP5 DUP5 DUP5 PUSH2 0x532 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP5 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE SWAP1 KECCAK256 SLOAD DUP3 DUP2 LT ISZERO PUSH2 0x305 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x28 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A207472616E7366657220616D6F756E7420657863656564732061 PUSH1 0x44 DUP3 ADD MSTORE PUSH8 0x6C6C6F77616E6365 PUSH1 0xC0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x312 DUP6 CALLER DUP6 DUP5 SUB PUSH2 0x40E JUMP JUMPDEST POP PUSH1 0x1 SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST CALLER PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP8 AND DUP5 MSTORE SWAP1 SWAP2 MSTORE DUP2 KECCAK256 SLOAD SWAP1 SWAP2 PUSH2 0x265 SWAP2 DUP6 SWAP1 PUSH2 0x354 SWAP1 DUP7 SWAP1 PUSH2 0x827 JUMP JUMPDEST PUSH2 0x40E JUMP JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 SLOAD PUSH2 0x1D5 SWAP1 PUSH2 0x84B JUMP JUMPDEST CALLER PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP7 AND DUP5 MSTORE SWAP1 SWAP2 MSTORE DUP2 KECCAK256 SLOAD DUP3 DUP2 LT ISZERO PUSH2 0x3EA JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x25 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A2064656372656173656420616C6C6F77616E63652062656C6F77 PUSH1 0x44 DUP3 ADD MSTORE PUSH5 0x207A65726F PUSH1 0xD8 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x2FC JUMP JUMPDEST PUSH2 0x3F7 CALLER DUP6 DUP6 DUP5 SUB PUSH2 0x40E JUMP JUMPDEST POP PUSH1 0x1 SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x265 CALLER DUP5 DUP5 PUSH2 0x532 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH2 0x470 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP1 DUP3 ADD MSTORE PUSH32 0x45524332303A20617070726F76652066726F6D20746865207A65726F20616464 PUSH1 0x44 DUP3 ADD MSTORE PUSH4 0x72657373 PUSH1 0xE0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x2FC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0x4D1 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x22 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A20617070726F766520746F20746865207A65726F206164647265 PUSH1 0x44 DUP3 ADD MSTORE PUSH2 0x7373 PUSH1 0xF0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x2FC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 DUP8 AND DUP1 DUP5 MSTORE SWAP5 DUP3 MSTORE SWAP2 DUP3 SWAP1 KECCAK256 DUP6 SWAP1 SSTORE SWAP1 MLOAD DUP5 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH2 0x596 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x25 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A207472616E736665722066726F6D20746865207A65726F206164 PUSH1 0x44 DUP3 ADD MSTORE PUSH5 0x6472657373 PUSH1 0xD8 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x2FC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0x5F8 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x23 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A207472616E7366657220746F20746865207A65726F2061646472 PUSH1 0x44 DUP3 ADD MSTORE PUSH3 0x657373 PUSH1 0xE8 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x2FC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP2 DUP2 LT ISZERO PUSH2 0x670 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x26 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A207472616E7366657220616D6F756E7420657863656564732062 PUSH1 0x44 DUP3 ADD MSTORE PUSH6 0x616C616E6365 PUSH1 0xD0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x2FC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP1 DUP6 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP1 DUP3 KECCAK256 DUP6 DUP6 SUB SWAP1 SSTORE SWAP2 DUP6 AND DUP2 MSTORE SWAP1 DUP2 KECCAK256 DUP1 SLOAD DUP5 SWAP3 SWAP1 PUSH2 0x6A7 SWAP1 DUP5 SWAP1 PUSH2 0x827 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP3 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP5 PUSH1 0x40 MLOAD PUSH2 0x6F3 SWAP2 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP POP JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x718 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x72E JUMPI DUP1 DUP2 REVERT JUMPDEST PUSH2 0x737 DUP3 PUSH2 0x701 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x750 JUMPI DUP1 DUP2 REVERT JUMPDEST PUSH2 0x759 DUP4 PUSH2 0x701 JUMP JUMPDEST SWAP2 POP PUSH2 0x767 PUSH1 0x20 DUP5 ADD PUSH2 0x701 JUMP JUMPDEST SWAP1 POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0x784 JUMPI DUP1 DUP2 REVERT JUMPDEST PUSH2 0x78D DUP5 PUSH2 0x701 JUMP JUMPDEST SWAP3 POP PUSH2 0x79B PUSH1 0x20 DUP6 ADD PUSH2 0x701 JUMP JUMPDEST SWAP2 POP PUSH1 0x40 DUP5 ADD CALLDATALOAD SWAP1 POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x7BD JUMPI DUP2 DUP3 REVERT JUMPDEST PUSH2 0x7C6 DUP4 PUSH2 0x701 JUMP JUMPDEST SWAP5 PUSH1 0x20 SWAP4 SWAP1 SWAP4 ADD CALLDATALOAD SWAP4 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP1 DUP4 MSTORE DUP4 MLOAD DUP1 DUP3 DUP6 ADD MSTORE DUP3 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0x800 JUMPI DUP6 DUP2 ADD DUP4 ADD MLOAD DUP6 DUP3 ADD PUSH1 0x40 ADD MSTORE DUP3 ADD PUSH2 0x7E4 JUMP JUMPDEST DUP2 DUP2 GT ISZERO PUSH2 0x811 JUMPI DUP4 PUSH1 0x40 DUP4 DUP8 ADD ADD MSTORE JUMPDEST POP PUSH1 0x1F ADD PUSH1 0x1F NOT AND SWAP3 SWAP1 SWAP3 ADD PUSH1 0x40 ADD SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 NOT DUP3 GT ISZERO PUSH2 0x846 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 DUP2 REVERT JUMPDEST POP ADD SWAP1 JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0x85F JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x880 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xCD 0xD1 SHR PUSH32 0x45CAA26807388B7400653BBA9CE712A0068D2F948E2BEF2CBB323B1E64736F6C PUSH4 0x43000804 STOP CALLER ',
      sourceMap: '465:272:4:-:0;;;585:150;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;2029:13:0;;670:5:4;;677:7;;2029:13:0;;:5;;:13;;;;;:::i;:::-;-1:-1:-1;2052:17:0;;;;:7;;:17;;;;;:::i;:::-;;1963:113;;696:32:4::1;702:10;714:13;696:5;;;:32;;:::i;:::-;585:150:::0;;;465:272;;8311:389:0;-1:-1:-1;;;;;8394:21:0;;8386:65;;;;-1:-1:-1;;;8386:65:0;;1788:2:5;8386:65:0;;;1770:21:5;1827:2;1807:18;;;1800:30;1866:33;1846:18;;;1839:61;1917:18;;8386:65:0;;;;;;;;8538:6;8522:12;;:22;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;;;8554:18:0;;:9;:18;;;;;;;;;;:28;;8576:6;;8554:9;:28;;8576:6;;8554:28;:::i;:::-;;;;-1:-1:-1;;8597:37:0;;2092:25:5;;;-1:-1:-1;;;;;8597:37:0;;;8614:1;;8597:37;;2080:2:5;2065:18;8597:37:0;;;;;;;8311:389;;:::o;465:272:4:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;465:272:4;;;-1:-1:-1;465:272:4;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;14:909:5;68:5;121:3;114:4;106:6;102:17;98:27;88:2;;143:5;136;129:20;88:2;170:13;;-1:-1:-1;;;;;232:10:5;;;229:2;;;245:18;;:::i;:::-;320:2;314:9;288:2;374:13;;-1:-1:-1;;370:22:5;;;394:2;366:31;362:40;350:53;;;418:18;;;438:22;;;415:46;412:2;;;464:18;;:::i;:::-;504:10;500:2;493:22;539:2;531:6;524:18;561:4;551:14;;606:3;601:2;596;588:6;584:15;580:24;577:33;574:2;;;627:5;620;613:20;574:2;653:5;644:14;;667:133;681:2;678:1;675:9;667:133;;;769:14;;;765:23;;759:30;738:14;;;734:23;;727:63;692:10;;;;667:133;;;818:2;815:1;812:9;809:2;;;877:5;872:2;867;859:6;855:15;851:24;844:39;809:2;911:6;78:845;-1:-1:-1;;;;;;78:845:5:o;928:653::-;1036:6;1044;1052;1105:2;1093:9;1084:7;1080:23;1076:32;1073:2;;;1126:6;1118;1111:22;1073:2;1158:16;;-1:-1:-1;;;;;1223:14:5;;;1220:2;;;1255:6;1247;1240:22;1220:2;1283:61;1336:7;1327:6;1316:9;1312:22;1283:61;:::i;:::-;1273:71;;1390:2;1379:9;1375:18;1369:25;1353:41;;1419:2;1409:8;1406:16;1403:2;;;1440:6;1432;1425:22;1403:2;;1468:63;1523:7;1512:8;1501:9;1497:24;1468:63;:::i;:::-;1458:73;;;1571:2;1560:9;1556:18;1550:25;1540:35;;1063:518;;;;;:::o;2128:229::-;2168:3;2199:1;2195:6;2192:1;2189:13;2186:2;;;-1:-1:-1;;;2225:33:5;;2281:4;2278:1;2271:15;2311:4;2232:3;2299:17;2186:2;-1:-1:-1;2342:9:5;;2176:181::o;2362:380::-;2441:1;2437:12;;;;2484;;;2505:2;;2559:4;2551:6;2547:17;2537:27;;2505:2;2612;2604:6;2601:14;2581:18;2578:38;2575:2;;;2658:10;2653:3;2649:20;2646:1;2639:31;2693:4;2690:1;2683:15;2721:4;2718:1;2711:15;2575:2;;2417:325;;;:::o;2747:127::-;2808:10;2803:3;2799:20;2796:1;2789:31;2839:4;2836:1;2829:15;2863:4;2860:1;2853:15;2779:95;465:272:4;;;;;;',
    },
  },
  abi: [
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
  ],
};

export const contractsReef20Deploy = {
  '@openzeppelin/contracts/token/ERC20/ERC20.sol': "// SPDX-License-Identifier: MIT\n\npragma solidity ^0.8.0;\n\nimport \"./IERC20.sol\";\nimport \"./extensions/IERC20Metadata.sol\";\nimport \"../../utils/Context.sol\";\n\n/**\n * @dev Implementation of the {IERC20} interface.\n *\n * This implementation is agnostic to the way tokens are created. This means\n * that a supply mechanism has to be added in a derived contract using {_mint}.\n * For a generic mechanism see {ERC20PresetMinterPauser}.\n *\n * TIP: For a detailed writeup see our guide\n * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How\n * to implement supply mechanisms].\n *\n * We have followed general OpenZeppelin Contracts guidelines: functions revert\n * instead returning `false` on failure. This behavior is nonetheless\n * conventional and does not conflict with the expectations of ERC20\n * applications.\n *\n * Additionally, an {Approval} event is emitted on calls to {transferFrom}.\n * This allows applications to reconstruct the allowance for all accounts just\n * by listening to said events. Other implementations of the EIP may not emit\n * these events, as it isn't required by the specification.\n *\n * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}\n * functions have been added to mitigate the well-known issues around setting\n * allowances. See {IERC20-approve}.\n */\ncontract ERC20 is Context, IERC20, IERC20Metadata {\n    mapping(address => uint256) private _balances;\n\n    mapping(address => mapping(address => uint256)) private _allowances;\n\n    uint256 private _totalSupply;\n\n    string private _name;\n    string private _symbol;\n\n    /**\n     * @dev Sets the values for {name} and {symbol}.\n     *\n     * The default value of {decimals} is 18. To select a different value for\n     * {decimals} you should overload it.\n     *\n     * All two of these values are immutable: they can only be set once during\n     * construction.\n     */\n    constructor(string memory name_, string memory symbol_) {\n        _name = name_;\n        _symbol = symbol_;\n    }\n\n    /**\n     * @dev Returns the name of the token.\n     */\n    function name() public view virtual override returns (string memory) {\n        return _name;\n    }\n\n    /**\n     * @dev Returns the symbol of the token, usually a shorter version of the\n     * name.\n     */\n    function symbol() public view virtual override returns (string memory) {\n        return _symbol;\n    }\n\n    /**\n     * @dev Returns the number of decimals used to get its user representation.\n     * For example, if `decimals` equals `2`, a balance of `505` tokens should\n     * be displayed to a user as `5.05` (`505 / 10 ** 2`).\n     *\n     * Tokens usually opt for a value of 18, imitating the relationship between\n     * Ether and Wei. This is the value {ERC20} uses, unless this function is\n     * overridden;\n     *\n     * NOTE: This information is only used for _display_ purposes: it in\n     * no way affects any of the arithmetic of the contract, including\n     * {IERC20-balanceOf} and {IERC20-transfer}.\n     */\n    function decimals() public view virtual override returns (uint8) {\n        return 18;\n    }\n\n    /**\n     * @dev See {IERC20-totalSupply}.\n     */\n    function totalSupply() public view virtual override returns (uint256) {\n        return _totalSupply;\n    }\n\n    /**\n     * @dev See {IERC20-balanceOf}.\n     */\n    function balanceOf(address account) public view virtual override returns (uint256) {\n        return _balances[account];\n    }\n\n    /**\n     * @dev See {IERC20-transfer}.\n     *\n     * Requirements:\n     *\n     * - `recipient` cannot be the zero address.\n     * - the caller must have a balance of at least `amount`.\n     */\n    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {\n        _transfer(_msgSender(), recipient, amount);\n        return true;\n    }\n\n    /**\n     * @dev See {IERC20-allowance}.\n     */\n    function allowance(address owner, address spender) public view virtual override returns (uint256) {\n        return _allowances[owner][spender];\n    }\n\n    /**\n     * @dev See {IERC20-approve}.\n     *\n     * Requirements:\n     *\n     * - `spender` cannot be the zero address.\n     */\n    function approve(address spender, uint256 amount) public virtual override returns (bool) {\n        _approve(_msgSender(), spender, amount);\n        return true;\n    }\n\n    /**\n     * @dev See {IERC20-transferFrom}.\n     *\n     * Emits an {Approval} event indicating the updated allowance. This is not\n     * required by the EIP. See the note at the beginning of {ERC20}.\n     *\n     * Requirements:\n     *\n     * - `sender` and `recipient` cannot be the zero address.\n     * - `sender` must have a balance of at least `amount`.\n     * - the caller must have allowance for ``sender``'s tokens of at least\n     * `amount`.\n     */\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint256 amount\n    ) public virtual override returns (bool) {\n        _transfer(sender, recipient, amount);\n\n        uint256 currentAllowance = _allowances[sender][_msgSender()];\n        require(currentAllowance >= amount, \"ERC20: transfer amount exceeds allowance\");\n        unchecked {\n            _approve(sender, _msgSender(), currentAllowance - amount);\n        }\n\n        return true;\n    }\n\n    /**\n     * @dev Atomically increases the allowance granted to `spender` by the caller.\n     *\n     * This is an alternative to {approve} that can be used as a mitigation for\n     * problems described in {IERC20-approve}.\n     *\n     * Emits an {Approval} event indicating the updated allowance.\n     *\n     * Requirements:\n     *\n     * - `spender` cannot be the zero address.\n     */\n    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {\n        _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);\n        return true;\n    }\n\n    /**\n     * @dev Atomically decreases the allowance granted to `spender` by the caller.\n     *\n     * This is an alternative to {approve} that can be used as a mitigation for\n     * problems described in {IERC20-approve}.\n     *\n     * Emits an {Approval} event indicating the updated allowance.\n     *\n     * Requirements:\n     *\n     * - `spender` cannot be the zero address.\n     * - `spender` must have allowance for the caller of at least\n     * `subtractedValue`.\n     */\n    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {\n        uint256 currentAllowance = _allowances[_msgSender()][spender];\n        require(currentAllowance >= subtractedValue, \"ERC20: decreased allowance below zero\");\n        unchecked {\n            _approve(_msgSender(), spender, currentAllowance - subtractedValue);\n        }\n\n        return true;\n    }\n\n    /**\n     * @dev Moves `amount` of tokens from `sender` to `recipient`.\n     *\n     * This internal function is equivalent to {transfer}, and can be used to\n     * e.g. implement automatic token fees, slashing mechanisms, etc.\n     *\n     * Emits a {Transfer} event.\n     *\n     * Requirements:\n     *\n     * - `sender` cannot be the zero address.\n     * - `recipient` cannot be the zero address.\n     * - `sender` must have a balance of at least `amount`.\n     */\n    function _transfer(\n        address sender,\n        address recipient,\n        uint256 amount\n    ) internal virtual {\n        require(sender != address(0), \"ERC20: transfer from the zero address\");\n        require(recipient != address(0), \"ERC20: transfer to the zero address\");\n\n        _beforeTokenTransfer(sender, recipient, amount);\n\n        uint256 senderBalance = _balances[sender];\n        require(senderBalance >= amount, \"ERC20: transfer amount exceeds balance\");\n        unchecked {\n            _balances[sender] = senderBalance - amount;\n        }\n        _balances[recipient] += amount;\n\n        emit Transfer(sender, recipient, amount);\n\n        _afterTokenTransfer(sender, recipient, amount);\n    }\n\n    /** @dev Creates `amount` tokens and assigns them to `account`, increasing\n     * the total supply.\n     *\n     * Emits a {Transfer} event with `from` set to the zero address.\n     *\n     * Requirements:\n     *\n     * - `account` cannot be the zero address.\n     */\n    function _mint(address account, uint256 amount) internal virtual {\n        require(account != address(0), \"ERC20: mint to the zero address\");\n\n        _beforeTokenTransfer(address(0), account, amount);\n\n        _totalSupply += amount;\n        _balances[account] += amount;\n        emit Transfer(address(0), account, amount);\n\n        _afterTokenTransfer(address(0), account, amount);\n    }\n\n    /**\n     * @dev Destroys `amount` tokens from `account`, reducing the\n     * total supply.\n     *\n     * Emits a {Transfer} event with `to` set to the zero address.\n     *\n     * Requirements:\n     *\n     * - `account` cannot be the zero address.\n     * - `account` must have at least `amount` tokens.\n     */\n    function _burn(address account, uint256 amount) internal virtual {\n        require(account != address(0), \"ERC20: burn from the zero address\");\n\n        _beforeTokenTransfer(account, address(0), amount);\n\n        uint256 accountBalance = _balances[account];\n        require(accountBalance >= amount, \"ERC20: burn amount exceeds balance\");\n        unchecked {\n            _balances[account] = accountBalance - amount;\n        }\n        _totalSupply -= amount;\n\n        emit Transfer(account, address(0), amount);\n\n        _afterTokenTransfer(account, address(0), amount);\n    }\n\n    /**\n     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.\n     *\n     * This internal function is equivalent to `approve`, and can be used to\n     * e.g. set automatic allowances for certain subsystems, etc.\n     *\n     * Emits an {Approval} event.\n     *\n     * Requirements:\n     *\n     * - `owner` cannot be the zero address.\n     * - `spender` cannot be the zero address.\n     */\n    function _approve(\n        address owner,\n        address spender,\n        uint256 amount\n    ) internal virtual {\n        require(owner != address(0), \"ERC20: approve from the zero address\");\n        require(spender != address(0), \"ERC20: approve to the zero address\");\n\n        _allowances[owner][spender] = amount;\n        emit Approval(owner, spender, amount);\n    }\n\n    /**\n     * @dev Hook that is called before any transfer of tokens. This includes\n     * minting and burning.\n     *\n     * Calling conditions:\n     *\n     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens\n     * will be transferred to `to`.\n     * - when `from` is zero, `amount` tokens will be minted for `to`.\n     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.\n     * - `from` and `to` are never both zero.\n     *\n     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].\n     */\n    function _beforeTokenTransfer(\n        address from,\n        address to,\n        uint256 amount\n    ) internal virtual {}\n\n    /**\n     * @dev Hook that is called after any transfer of tokens. This includes\n     * minting and burning.\n     *\n     * Calling conditions:\n     *\n     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens\n     * has been transferred to `to`.\n     * - when `from` is zero, `amount` tokens have been minted for `to`.\n     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.\n     * - `from` and `to` are never both zero.\n     *\n     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].\n     */\n    function _afterTokenTransfer(\n        address from,\n        address to,\n        uint256 amount\n    ) internal virtual {}\n}\n",
  '@openzeppelin/contracts/token/ERC20/IERC20.sol': "// SPDX-License-Identifier: MIT\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Interface of the ERC20 standard as defined in the EIP.\n */\ninterface IERC20 {\n    /**\n     * @dev Returns the amount of tokens in existence.\n     */\n    function totalSupply() external view returns (uint256);\n\n    /**\n     * @dev Returns the amount of tokens owned by `account`.\n     */\n    function balanceOf(address account) external view returns (uint256);\n\n    /**\n     * @dev Moves `amount` tokens from the caller's account to `recipient`.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transfer(address recipient, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Returns the remaining number of tokens that `spender` will be\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\n     * zero by default.\n     *\n     * This value changes when {approve} or {transferFrom} are called.\n     */\n    function allowance(address owner, address spender) external view returns (uint256);\n\n    /**\n     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\n     * that someone may use both the old and the new allowance by unfortunate\n     * transaction ordering. One possible solution to mitigate this race\n     * condition is to first reduce the spender's allowance to 0 and set the\n     * desired value afterwards:\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n     *\n     * Emits an {Approval} event.\n     */\n    function approve(address spender, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Moves `amount` tokens from `sender` to `recipient` using the\n     * allowance mechanism. `amount` is then deducted from the caller's\n     * allowance.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint256 amount\n    ) external returns (bool);\n\n    /**\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\n     * another (`to`).\n     *\n     * Note that `value` may be zero.\n     */\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    /**\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\n     * a call to {approve}. `value` is the new allowance.\n     */\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n}\n",
  '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol': '// SPDX-License-Identifier: MIT\n\npragma solidity ^0.8.0;\n\nimport "../IERC20.sol";\n\n/**\n * @dev Interface for the optional metadata functions from the ERC20 standard.\n *\n * _Available since v4.1._\n */\ninterface IERC20Metadata is IERC20 {\n    /**\n     * @dev Returns the name of the token.\n     */\n    function name() external view returns (string memory);\n\n    /**\n     * @dev Returns the symbol of the token.\n     */\n    function symbol() external view returns (string memory);\n\n    /**\n     * @dev Returns the decimals places of the token.\n     */\n    function decimals() external view returns (uint8);\n}\n',
  '@openzeppelin/contracts/utils/Context.sol': '// SPDX-License-Identifier: MIT\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Provides information about the current execution context, including the\n * sender of the transaction and its data. While these are generally available\n * via msg.sender and msg.data, they should not be accessed in such a direct\n * manner, since when dealing with meta-transactions the account sending and\n * paying for execution may not be the actual sender (as far as an application\n * is concerned).\n *\n * This contract is only required for intermediate, library-like contracts.\n */\nabstract contract Context {\n    function _msgSender() internal view virtual returns (address) {\n        return msg.sender;\n    }\n\n    function _msgData() internal view virtual returns (bytes calldata) {\n        return msg.data;\n    }\n}\n',
  'contracts/4_Token_ERC20.sol': '// SPDX-License-Identifier: MIT\n\npragma solidity >=0.7.0 <0.9.0;\n\nimport "@openzeppelin/contracts/token/ERC20/ERC20.sol";\n\n/**\n * @title ERC20Contract\n * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.\n * Note they can later distribute these tokens as they wish using transfer and other\n * ERC20 functions.\n * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/examples/SimpleToken.sol\n */\ncontract TestToken is ERC20 {\n    /**\n     * @dev Constructor that gives msg.sender all of existing tokens.\n     */\n    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name,symbol) {\n        _mint(msg.sender, initialSupply);\n    }\n}',
};

export const metadataArtifactReef20Deploy = {
  compiler: {
    version: '0.8.4+commit.c7e474f2',
  },
  output: {
    abi: [
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
    ],
  },
  settings: {
    compilationTarget: {
      'contracts/4_Token_ERC20.sol': 'TestToken',
    },
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  version: 1,
};

export const deployTokens = {
  noMontNoBurn: {
    abi: [
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
            name: 'to',
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
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
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
    ],
    bytecode: {
      generatedSources: [
        {
          ast: {
            nodeType: 'YulBlock',
            src: '0:2876:5',
            statements: [
              {
                nodeType: 'YulBlock',
                src: '6:3:5',
                statements: [],
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '78:845:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '127:24:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '136:5:5',
                                },
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '143:5:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '129:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '129:20:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '129:20:5',
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
                                    src: '106:6:5',
                                  },
                                  {
                                    kind: 'number',
                                    nodeType: 'YulLiteral',
                                    src: '114:4:5',
                                    type: '',
                                    value: '0x1f',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '102:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '102:17:5',
                              },
                              {
                                name: 'end',
                                nodeType: 'YulIdentifier',
                                src: '121:3:5',
                              },
                            ],
                            functionName: {
                              name: 'slt',
                              nodeType: 'YulIdentifier',
                              src: '98:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '98:27:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '91:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '91:35:5',
                      },
                      nodeType: 'YulIf',
                      src: '88:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '160:23:5',
                      value: {
                        arguments: [
                          {
                            name: 'offset',
                            nodeType: 'YulIdentifier',
                            src: '176:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '170:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '170:13:5',
                      },
                      variables: [
                        {
                          name: '_1',
                          nodeType: 'YulTypedName',
                          src: '164:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '192:28:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '210:2:5',
                                type: '',
                                value: '64',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '214:1:5',
                                type: '',
                                value: '1',
                              },
                            ],
                            functionName: {
                              name: 'shl',
                              nodeType: 'YulIdentifier',
                              src: '206:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '206:10:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '218:1:5',
                            type: '',
                            value: '1',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '202:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '202:18:5',
                      },
                      variables: [
                        {
                          name: '_2',
                          nodeType: 'YulTypedName',
                          src: '196:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '243:22:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x41',
                                nodeType: 'YulIdentifier',
                                src: '245:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '245:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '245:18:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '235:2:5',
                          },
                          {
                            name: '_2',
                            nodeType: 'YulIdentifier',
                            src: '239:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '232:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '232:10:5',
                      },
                      nodeType: 'YulIf',
                      src: '229:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '274:17:5',
                      value: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '288:2:5',
                            type: '',
                            value: '31',
                          },
                        ],
                        functionName: {
                          name: 'not',
                          nodeType: 'YulIdentifier',
                          src: '284:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '284:7:5',
                      },
                      variables: [
                        {
                          name: '_3',
                          nodeType: 'YulTypedName',
                          src: '278:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '300:23:5',
                      value: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '320:2:5',
                            type: '',
                            value: '64',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '314:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '314:9:5',
                      },
                      variables: [
                        {
                          name: 'memPtr',
                          nodeType: 'YulTypedName',
                          src: '304:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '332:71:5',
                      value: {
                        arguments: [
                          {
                            name: 'memPtr',
                            nodeType: 'YulIdentifier',
                            src: '354:6:5',
                          },
                          {
                            arguments: [
                              {
                                arguments: [
                                  {
                                    arguments: [
                                      {
                                        arguments: [
                                          {
                                            name: '_1',
                                            nodeType: 'YulIdentifier',
                                            src: '378:2:5',
                                          },
                                          {
                                            kind: 'number',
                                            nodeType: 'YulLiteral',
                                            src: '382:4:5',
                                            type: '',
                                            value: '0x1f',
                                          },
                                        ],
                                        functionName: {
                                          name: 'add',
                                          nodeType: 'YulIdentifier',
                                          src: '374:3:5',
                                        },
                                        nodeType: 'YulFunctionCall',
                                        src: '374:13:5',
                                      },
                                      {
                                        name: '_3',
                                        nodeType: 'YulIdentifier',
                                        src: '389:2:5',
                                      },
                                    ],
                                    functionName: {
                                      name: 'and',
                                      nodeType: 'YulIdentifier',
                                      src: '370:3:5',
                                    },
                                    nodeType: 'YulFunctionCall',
                                    src: '370:22:5',
                                  },
                                  {
                                    kind: 'number',
                                    nodeType: 'YulLiteral',
                                    src: '394:2:5',
                                    type: '',
                                    value: '63',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '366:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '366:31:5',
                              },
                              {
                                name: '_3',
                                nodeType: 'YulIdentifier',
                                src: '399:2:5',
                              },
                            ],
                            functionName: {
                              name: 'and',
                              nodeType: 'YulIdentifier',
                              src: '362:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '362:40:5',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '350:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '350:53:5',
                      },
                      variables: [
                        {
                          name: 'newFreePtr',
                          nodeType: 'YulTypedName',
                          src: '336:10:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '462:22:5',
                        statements: [
                          {
                            expression: {
                              arguments: [],
                              functionName: {
                                name: 'panic_error_0x41',
                                nodeType: 'YulIdentifier',
                                src: '464:16:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '464:18:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '464:18:5',
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
                                src: '421:10:5',
                              },
                              {
                                name: '_2',
                                nodeType: 'YulIdentifier',
                                src: '433:2:5',
                              },
                            ],
                            functionName: {
                              name: 'gt',
                              nodeType: 'YulIdentifier',
                              src: '418:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '418:18:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'newFreePtr',
                                nodeType: 'YulIdentifier',
                                src: '441:10:5',
                              },
                              {
                                name: 'memPtr',
                                nodeType: 'YulIdentifier',
                                src: '453:6:5',
                              },
                            ],
                            functionName: {
                              name: 'lt',
                              nodeType: 'YulIdentifier',
                              src: '438:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '438:22:5',
                          },
                        ],
                        functionName: {
                          name: 'or',
                          nodeType: 'YulIdentifier',
                          src: '415:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '415:46:5',
                      },
                      nodeType: 'YulIf',
                      src: '412:2:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '500:2:5',
                            type: '',
                            value: '64',
                          },
                          {
                            name: 'newFreePtr',
                            nodeType: 'YulIdentifier',
                            src: '504:10:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '493:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '493:22:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '493:22:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memPtr',
                            nodeType: 'YulIdentifier',
                            src: '531:6:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '539:2:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '524:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '524:18:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '524:18:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '551:14:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '561:4:5',
                        type: '',
                        value: '0x20',
                      },
                      variables: [
                        {
                          name: '_4',
                          nodeType: 'YulTypedName',
                          src: '555:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '611:24:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '620:5:5',
                                },
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '627:5:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '613:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '613:20:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '613:20:5',
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
                                    src: '588:6:5',
                                  },
                                  {
                                    name: '_1',
                                    nodeType: 'YulIdentifier',
                                    src: '596:2:5',
                                  },
                                ],
                                functionName: {
                                  name: 'add',
                                  nodeType: 'YulIdentifier',
                                  src: '584:3:5',
                                },
                                nodeType: 'YulFunctionCall',
                                src: '584:15:5',
                              },
                              {
                                name: '_4',
                                nodeType: 'YulIdentifier',
                                src: '601:2:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '580:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '580:24:5',
                          },
                          {
                            name: 'end',
                            nodeType: 'YulIdentifier',
                            src: '606:3:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '577:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '577:33:5',
                      },
                      nodeType: 'YulIf',
                      src: '574:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '644:14:5',
                      value: {
                        name: 'array',
                        nodeType: 'YulIdentifier',
                        src: '653:5:5',
                      },
                      variables: [
                        {
                          name: 'i',
                          nodeType: 'YulTypedName',
                          src: '648:1:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '713:87:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  arguments: [
                                    {
                                      arguments: [
                                        {
                                          name: 'memPtr',
                                          nodeType: 'YulIdentifier',
                                          src: '742:6:5',
                                        },
                                        {
                                          name: 'i',
                                          nodeType: 'YulIdentifier',
                                          src: '750:1:5',
                                        },
                                      ],
                                      functionName: {
                                        name: 'add',
                                        nodeType: 'YulIdentifier',
                                        src: '738:3:5',
                                      },
                                      nodeType: 'YulFunctionCall',
                                      src: '738:14:5',
                                    },
                                    {
                                      name: '_4',
                                      nodeType: 'YulIdentifier',
                                      src: '754:2:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'add',
                                    nodeType: 'YulIdentifier',
                                    src: '734:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '734:23:5',
                                },
                                {
                                  arguments: [
                                    {
                                      arguments: [
                                        {
                                          arguments: [
                                            {
                                              name: 'offset',
                                              nodeType: 'YulIdentifier',
                                              src: '773:6:5',
                                            },
                                            {
                                              name: 'i',
                                              nodeType: 'YulIdentifier',
                                              src: '781:1:5',
                                            },
                                          ],
                                          functionName: {
                                            name: 'add',
                                            nodeType: 'YulIdentifier',
                                            src: '769:3:5',
                                          },
                                          nodeType: 'YulFunctionCall',
                                          src: '769:14:5',
                                        },
                                        {
                                          name: '_4',
                                          nodeType: 'YulIdentifier',
                                          src: '785:2:5',
                                        },
                                      ],
                                      functionName: {
                                        name: 'add',
                                        nodeType: 'YulIdentifier',
                                        src: '765:3:5',
                                      },
                                      nodeType: 'YulFunctionCall',
                                      src: '765:23:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'mload',
                                    nodeType: 'YulIdentifier',
                                    src: '759:5:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '759:30:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '727:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '727:63:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '727:63:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'i',
                            nodeType: 'YulIdentifier',
                            src: '678:1:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '681:2:5',
                          },
                        ],
                        functionName: {
                          name: 'lt',
                          nodeType: 'YulIdentifier',
                          src: '675:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '675:9:5',
                      },
                      nodeType: 'YulForLoop',
                      post: {
                        nodeType: 'YulBlock',
                        src: '685:19:5',
                        statements: [
                          {
                            nodeType: 'YulAssignment',
                            src: '687:15:5',
                            value: {
                              arguments: [
                                {
                                  name: 'i',
                                  nodeType: 'YulIdentifier',
                                  src: '696:1:5',
                                },
                                {
                                  name: '_4',
                                  nodeType: 'YulIdentifier',
                                  src: '699:2:5',
                                },
                              ],
                              functionName: {
                                name: 'add',
                                nodeType: 'YulIdentifier',
                                src: '692:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '692:10:5',
                            },
                            variableNames: [
                              {
                                name: 'i',
                                nodeType: 'YulIdentifier',
                                src: '687:1:5',
                              },
                            ],
                          },
                        ],
                      },
                      pre: {
                        nodeType: 'YulBlock',
                        src: '671:3:5',
                        statements: [],
                      },
                      src: '667:133:5',
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '830:63:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  arguments: [
                                    {
                                      arguments: [
                                        {
                                          name: 'memPtr',
                                          nodeType: 'YulIdentifier',
                                          src: '859:6:5',
                                        },
                                        {
                                          name: '_1',
                                          nodeType: 'YulIdentifier',
                                          src: '867:2:5',
                                        },
                                      ],
                                      functionName: {
                                        name: 'add',
                                        nodeType: 'YulIdentifier',
                                        src: '855:3:5',
                                      },
                                      nodeType: 'YulFunctionCall',
                                      src: '855:15:5',
                                    },
                                    {
                                      name: '_4',
                                      nodeType: 'YulIdentifier',
                                      src: '872:2:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'add',
                                    nodeType: 'YulIdentifier',
                                    src: '851:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '851:24:5',
                                },
                                {
                                  name: 'array',
                                  nodeType: 'YulIdentifier',
                                  src: '877:5:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '844:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '844:39:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '844:39:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'i',
                            nodeType: 'YulIdentifier',
                            src: '815:1:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '818:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '812:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '812:9:5',
                      },
                      nodeType: 'YulIf',
                      src: '809:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '902:15:5',
                      value: {
                        name: 'memPtr',
                        nodeType: 'YulIdentifier',
                        src: '911:6:5',
                      },
                      variableNames: [
                        {
                          name: 'array',
                          nodeType: 'YulIdentifier',
                          src: '902:5:5',
                        },
                      ],
                    },
                  ],
                },
                name: 'abi_decode_string_fromMemory',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'offset',
                    nodeType: 'YulTypedName',
                    src: '52:6:5',
                    type: '',
                  },
                  {
                    name: 'end',
                    nodeType: 'YulTypedName',
                    src: '60:3:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'array',
                    nodeType: 'YulTypedName',
                    src: '68:5:5',
                    type: '',
                  },
                ],
                src: '14:909:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '1063:518:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '1109:26:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1118:6:5',
                                },
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1126:6:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '1111:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '1111:22:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '1111:22:5',
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
                                src: '1084:7:5',
                              },
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1093:9:5',
                              },
                            ],
                            functionName: {
                              name: 'sub',
                              nodeType: 'YulIdentifier',
                              src: '1080:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1080:23:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1105:2:5',
                            type: '',
                            value: '96',
                          },
                        ],
                        functionName: {
                          name: 'slt',
                          nodeType: 'YulIdentifier',
                          src: '1076:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1076:32:5',
                      },
                      nodeType: 'YulIf',
                      src: '1073:2:5',
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1144:30:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1164:9:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '1158:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1158:16:5',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1148:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1183:28:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1201:2:5',
                                type: '',
                                value: '64',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1205:1:5',
                                type: '',
                                value: '1',
                              },
                            ],
                            functionName: {
                              name: 'shl',
                              nodeType: 'YulIdentifier',
                              src: '1197:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1197:10:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1209:1:5',
                            type: '',
                            value: '1',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '1193:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1193:18:5',
                      },
                      variables: [
                        {
                          name: '_1',
                          nodeType: 'YulTypedName',
                          src: '1187:2:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '1238:26:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1247:6:5',
                                },
                                {
                                  name: 'value0',
                                  nodeType: 'YulIdentifier',
                                  src: '1255:6:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '1240:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '1240:22:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '1240:22:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'offset',
                            nodeType: 'YulIdentifier',
                            src: '1226:6:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '1234:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '1223:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1223:14:5',
                      },
                      nodeType: 'YulIf',
                      src: '1220:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1273:71:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1316:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1327:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1312:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1312:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1336:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_string_fromMemory',
                          nodeType: 'YulIdentifier',
                          src: '1283:28:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1283:61:5',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '1273:6:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1353:41:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1379:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1390:2:5',
                                type: '',
                                value: '32',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1375:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1375:18:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '1369:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1369:25:5',
                      },
                      variables: [
                        {
                          name: 'offset_1',
                          nodeType: 'YulTypedName',
                          src: '1357:8:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '1423:26:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'value1',
                                  nodeType: 'YulIdentifier',
                                  src: '1432:6:5',
                                },
                                {
                                  name: 'value1',
                                  nodeType: 'YulIdentifier',
                                  src: '1440:6:5',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '1425:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '1425:22:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '1425:22:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'offset_1',
                            nodeType: 'YulIdentifier',
                            src: '1409:8:5',
                          },
                          {
                            name: '_1',
                            nodeType: 'YulIdentifier',
                            src: '1419:2:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '1406:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1406:16:5',
                      },
                      nodeType: 'YulIf',
                      src: '1403:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1458:73:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1501:9:5',
                              },
                              {
                                name: 'offset_1',
                                nodeType: 'YulIdentifier',
                                src: '1512:8:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1497:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1497:24:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1523:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_string_fromMemory',
                          nodeType: 'YulIdentifier',
                          src: '1468:28:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1468:63:5',
                      },
                      variableNames: [
                        {
                          name: 'value1',
                          nodeType: 'YulIdentifier',
                          src: '1458:6:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1540:35:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1560:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1571:2:5',
                                type: '',
                                value: '64',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1556:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1556:18:5',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '1550:5:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1550:25:5',
                      },
                      variableNames: [
                        {
                          name: 'value2',
                          nodeType: 'YulIdentifier',
                          src: '1540:6:5',
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
                    src: '1013:9:5',
                    type: '',
                  },
                  {
                    name: 'dataEnd',
                    nodeType: 'YulTypedName',
                    src: '1024:7:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'value0',
                    nodeType: 'YulTypedName',
                    src: '1036:6:5',
                    type: '',
                  },
                  {
                    name: 'value1',
                    nodeType: 'YulTypedName',
                    src: '1044:6:5',
                    type: '',
                  },
                  {
                    name: 'value2',
                    nodeType: 'YulTypedName',
                    src: '1052:6:5',
                    type: '',
                  },
                ],
                src: '928:653:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '1760:181:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1777:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1788:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '1770:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1770:21:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '1770:21:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1811:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1822:2:5',
                                type: '',
                                value: '32',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1807:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1807:18:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1827:2:5',
                            type: '',
                            value: '31',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '1800:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1800:30:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '1800:30:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1850:9:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '1861:2:5',
                                type: '',
                                value: '64',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1846:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1846:18:5',
                          },
                          {
                            kind: 'string',
                            nodeType: 'YulLiteral',
                            src: '1866:33:5',
                            type: '',
                            value: 'ERC20: mint to the zero address',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '1839:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1839:61:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '1839:61:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1909:26:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1921:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1932:2:5',
                            type: '',
                            value: '96',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '1917:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1917:18:5',
                      },
                      variableNames: [
                        {
                          name: 'tail',
                          nodeType: 'YulIdentifier',
                          src: '1909:4:5',
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
                    src: '1737:9:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'tail',
                    nodeType: 'YulTypedName',
                    src: '1751:4:5',
                    type: '',
                  },
                ],
                src: '1586:355:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2047:76:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2057:26:5',
                      value: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2069:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2080:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2065:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2065:18:5',
                      },
                      variableNames: [
                        {
                          name: 'tail',
                          nodeType: 'YulIdentifier',
                          src: '2057:4:5',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2099:9:5',
                          },
                          {
                            name: 'value0',
                            nodeType: 'YulIdentifier',
                            src: '2110:6:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2092:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2092:25:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2092:25:5',
                    },
                  ],
                },
                name: 'abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'headStart',
                    nodeType: 'YulTypedName',
                    src: '2016:9:5',
                    type: '',
                  },
                  {
                    name: 'value0',
                    nodeType: 'YulTypedName',
                    src: '2027:6:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'tail',
                    nodeType: 'YulTypedName',
                    src: '2038:4:5',
                    type: '',
                  },
                ],
                src: '1946:177:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2176:181:5',
                  statements: [
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '2211:115:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'sum',
                                  nodeType: 'YulIdentifier',
                                  src: '2232:3:5',
                                },
                                {
                                  arguments: [
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2241:3:5',
                                      type: '',
                                      value: '224',
                                    },
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2246:10:5',
                                      type: '',
                                      value: '0x4e487b71',
                                    },
                                  ],
                                  functionName: {
                                    name: 'shl',
                                    nodeType: 'YulIdentifier',
                                    src: '2237:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '2237:20:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2225:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2225:33:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2225:33:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2278:1:5',
                                  type: '',
                                  value: '4',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2281:4:5',
                                  type: '',
                                  value: '0x11',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2271:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2271:15:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2271:15:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  name: 'sum',
                                  nodeType: 'YulIdentifier',
                                  src: '2306:3:5',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2311:4:5',
                                  type: '',
                                  value: '0x24',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '2299:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2299:17:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2299:17:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'x',
                            nodeType: 'YulIdentifier',
                            src: '2192:1:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'y',
                                nodeType: 'YulIdentifier',
                                src: '2199:1:5',
                              },
                            ],
                            functionName: {
                              name: 'not',
                              nodeType: 'YulIdentifier',
                              src: '2195:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2195:6:5',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '2189:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2189:13:5',
                      },
                      nodeType: 'YulIf',
                      src: '2186:2:5',
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '2335:16:5',
                      value: {
                        arguments: [
                          {
                            name: 'x',
                            nodeType: 'YulIdentifier',
                            src: '2346:1:5',
                          },
                          {
                            name: 'y',
                            nodeType: 'YulIdentifier',
                            src: '2349:1:5',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2342:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2342:9:5',
                      },
                      variableNames: [
                        {
                          name: 'sum',
                          nodeType: 'YulIdentifier',
                          src: '2335:3:5',
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
                    src: '2159:1:5',
                    type: '',
                  },
                  {
                    name: 'y',
                    nodeType: 'YulTypedName',
                    src: '2162:1:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'sum',
                    nodeType: 'YulTypedName',
                    src: '2168:3:5',
                    type: '',
                  },
                ],
                src: '2128:229:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2417:325:5',
                  statements: [
                    {
                      nodeType: 'YulAssignment',
                      src: '2427:22:5',
                      value: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2441:1:5',
                            type: '',
                            value: '1',
                          },
                          {
                            name: 'data',
                            nodeType: 'YulIdentifier',
                            src: '2444:4:5',
                          },
                        ],
                        functionName: {
                          name: 'shr',
                          nodeType: 'YulIdentifier',
                          src: '2437:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2437:12:5',
                      },
                      variableNames: [
                        {
                          name: 'length',
                          nodeType: 'YulIdentifier',
                          src: '2427:6:5',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '2458:38:5',
                      value: {
                        arguments: [
                          {
                            name: 'data',
                            nodeType: 'YulIdentifier',
                            src: '2488:4:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2494:1:5',
                            type: '',
                            value: '1',
                          },
                        ],
                        functionName: {
                          name: 'and',
                          nodeType: 'YulIdentifier',
                          src: '2484:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2484:12:5',
                      },
                      variables: [
                        {
                          name: 'outOfPlaceEncoding',
                          nodeType: 'YulTypedName',
                          src: '2462:18:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '2535:31:5',
                        statements: [
                          {
                            nodeType: 'YulAssignment',
                            src: '2537:27:5',
                            value: {
                              arguments: [
                                {
                                  name: 'length',
                                  nodeType: 'YulIdentifier',
                                  src: '2551:6:5',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2559:4:5',
                                  type: '',
                                  value: '0x7f',
                                },
                              ],
                              functionName: {
                                name: 'and',
                                nodeType: 'YulIdentifier',
                                src: '2547:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2547:17:5',
                            },
                            variableNames: [
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '2537:6:5',
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
                            src: '2515:18:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '2508:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2508:26:5',
                      },
                      nodeType: 'YulIf',
                      src: '2505:2:5',
                    },
                    {
                      body: {
                        nodeType: 'YulBlock',
                        src: '2625:111:5',
                        statements: [
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2646:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  arguments: [
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2653:3:5',
                                      type: '',
                                      value: '224',
                                    },
                                    {
                                      kind: 'number',
                                      nodeType: 'YulLiteral',
                                      src: '2658:10:5',
                                      type: '',
                                      value: '0x4e487b71',
                                    },
                                  ],
                                  functionName: {
                                    name: 'shl',
                                    nodeType: 'YulIdentifier',
                                    src: '2649:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '2649:20:5',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2639:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2639:31:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2639:31:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2690:1:5',
                                  type: '',
                                  value: '4',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2693:4:5',
                                  type: '',
                                  value: '0x22',
                                },
                              ],
                              functionName: {
                                name: 'mstore',
                                nodeType: 'YulIdentifier',
                                src: '2683:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2683:15:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2683:15:5',
                          },
                          {
                            expression: {
                              arguments: [
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2718:1:5',
                                  type: '',
                                  value: '0',
                                },
                                {
                                  kind: 'number',
                                  nodeType: 'YulLiteral',
                                  src: '2721:4:5',
                                  type: '',
                                  value: '0x24',
                                },
                              ],
                              functionName: {
                                name: 'revert',
                                nodeType: 'YulIdentifier',
                                src: '2711:6:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '2711:15:5',
                            },
                            nodeType: 'YulExpressionStatement',
                            src: '2711:15:5',
                          },
                        ],
                      },
                      condition: {
                        arguments: [
                          {
                            name: 'outOfPlaceEncoding',
                            nodeType: 'YulIdentifier',
                            src: '2581:18:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'length',
                                nodeType: 'YulIdentifier',
                                src: '2604:6:5',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2612:2:5',
                                type: '',
                                value: '32',
                              },
                            ],
                            functionName: {
                              name: 'lt',
                              nodeType: 'YulIdentifier',
                              src: '2601:2:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2601:14:5',
                          },
                        ],
                        functionName: {
                          name: 'eq',
                          nodeType: 'YulIdentifier',
                          src: '2578:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2578:38:5',
                      },
                      nodeType: 'YulIf',
                      src: '2575:2:5',
                    },
                  ],
                },
                name: 'extract_byte_array_length',
                nodeType: 'YulFunctionDefinition',
                parameters: [
                  {
                    name: 'data',
                    nodeType: 'YulTypedName',
                    src: '2397:4:5',
                    type: '',
                  },
                ],
                returnVariables: [
                  {
                    name: 'length',
                    nodeType: 'YulTypedName',
                    src: '2406:6:5',
                    type: '',
                  },
                ],
                src: '2362:380:5',
              },
              {
                body: {
                  nodeType: 'YulBlock',
                  src: '2779:95:5',
                  statements: [
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2796:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2803:3:5',
                                type: '',
                                value: '224',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2808:10:5',
                                type: '',
                                value: '0x4e487b71',
                              },
                            ],
                            functionName: {
                              name: 'shl',
                              nodeType: 'YulIdentifier',
                              src: '2799:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2799:20:5',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2789:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2789:31:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2789:31:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2836:1:5',
                            type: '',
                            value: '4',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2839:4:5',
                            type: '',
                            value: '0x41',
                          },
                        ],
                        functionName: {
                          name: 'mstore',
                          nodeType: 'YulIdentifier',
                          src: '2829:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2829:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2829:15:5',
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2860:1:5',
                            type: '',
                            value: '0',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2863:4:5',
                            type: '',
                            value: '0x24',
                          },
                        ],
                        functionName: {
                          name: 'revert',
                          nodeType: 'YulIdentifier',
                          src: '2853:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2853:15:5',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2853:15:5',
                    },
                  ],
                },
                name: 'panic_error_0x41',
                nodeType: 'YulFunctionDefinition',
                src: '2747:127:5',
              },
            ],
          },
          contents: '{\n    { }\n    function abi_decode_string_fromMemory(offset, end) -> array\n    {\n        if iszero(slt(add(offset, 0x1f), end)) { revert(array, array) }\n        let _1 := mload(offset)\n        let _2 := sub(shl(64, 1), 1)\n        if gt(_1, _2) { panic_error_0x41() }\n        let _3 := not(31)\n        let memPtr := mload(64)\n        let newFreePtr := add(memPtr, and(add(and(add(_1, 0x1f), _3), 63), _3))\n        if or(gt(newFreePtr, _2), lt(newFreePtr, memPtr)) { panic_error_0x41() }\n        mstore(64, newFreePtr)\n        mstore(memPtr, _1)\n        let _4 := 0x20\n        if gt(add(add(offset, _1), _4), end) { revert(array, array) }\n        let i := array\n        for { } lt(i, _1) { i := add(i, _4) }\n        {\n            mstore(add(add(memPtr, i), _4), mload(add(add(offset, i), _4)))\n        }\n        if gt(i, _1)\n        {\n            mstore(add(add(memPtr, _1), _4), array)\n        }\n        array := memPtr\n    }\n    function abi_decode_tuple_t_string_memory_ptrt_string_memory_ptrt_uint256_fromMemory(headStart, dataEnd) -> value0, value1, value2\n    {\n        if slt(sub(dataEnd, headStart), 96) { revert(value0, value0) }\n        let offset := mload(headStart)\n        let _1 := sub(shl(64, 1), 1)\n        if gt(offset, _1) { revert(value0, value0) }\n        value0 := abi_decode_string_fromMemory(add(headStart, offset), dataEnd)\n        let offset_1 := mload(add(headStart, 32))\n        if gt(offset_1, _1) { revert(value1, value1) }\n        value1 := abi_decode_string_fromMemory(add(headStart, offset_1), dataEnd)\n        value2 := mload(add(headStart, 64))\n    }\n    function abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 31)\n        mstore(add(headStart, 64), "ERC20: mint to the zero address")\n        tail := add(headStart, 96)\n    }\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function checked_add_t_uint256(x, y) -> sum\n    {\n        if gt(x, not(y))\n        {\n            mstore(sum, shl(224, 0x4e487b71))\n            mstore(4, 0x11)\n            revert(sum, 0x24)\n        }\n        sum := add(x, y)\n    }\n    function extract_byte_array_length(data) -> length\n    {\n        length := shr(1, data)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) { length := and(length, 0x7f) }\n        if eq(outOfPlaceEncoding, lt(length, 32))\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x22)\n            revert(0, 0x24)\n        }\n    }\n    function panic_error_0x41()\n    {\n        mstore(0, shl(224, 0x4e487b71))\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n}',
          id: 5,
          language: 'Yul',
          name: '#utility.yul',
        },
      ],
      linkReferences: {},
      object: '60806040523480156200001157600080fd5b5060405162000c3938038062000c398339810160408190526200003491620002c2565b8251839083906200004d90600390602085019062000169565b5080516200006390600490602084019062000169565b5050506200007833826200008160201b60201c565b505050620003aa565b6001600160a01b038216620000dc5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000f0919062000332565b90915550506001600160a01b038216600090815260208190526040812080548392906200011f90849062000332565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001779062000357565b90600052602060002090601f0160209004810192826200019b5760008555620001e6565b82601f10620001b657805160ff1916838001178555620001e6565b82800160010185558215620001e6579182015b82811115620001e6578251825591602001919060010190620001c9565b50620001f4929150620001f8565b5090565b5b80821115620001f45760008155600101620001f9565b600082601f83011262000220578081fd5b81516001600160401b03808211156200023d576200023d62000394565b604051601f8301601f19908116603f0116810190828211818310171562000268576200026862000394565b8160405283815260209250868385880101111562000284578485fd5b8491505b83821015620002a7578582018301518183018401529082019062000288565b83821115620002b857848385830101525b9695505050505050565b600080600060608486031215620002d7578283fd5b83516001600160401b0380821115620002ee578485fd5b620002fc878388016200020f565b9450602086015191508082111562000312578384fd5b5062000321868287016200020f565b925050604084015190509250925092565b600082198211156200035257634e487b7160e01b81526011600452602481fd5b500190565b600181811c908216806200036c57607f821691505b602082108114156200038e57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61087f80620003ba6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101a0565b6040516100c39190610797565b60405180910390f35b6100df6100da36600461076e565b610232565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610733565b61024a565b604051601281526020016100c3565b6100df61013136600461076e565b61026e565b6100f36101443660046106e0565b6001600160a01b031660009081526020819052604090205490565b6100b6610290565b6100df61017536600461076e565b61029f565b6100df61018836600461076e565b61031f565b6100f361019b366004610701565b61032d565b6060600380546101af9061080e565b80601f01602080910402602001604051908101604052809291908181526020018280546101db9061080e565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050905090565b600033610240818585610358565b5060019392505050565b60003361025885828561047c565b6102638585856104f6565b506001949350505050565b600033610240818585610281838361032d565b61028b91906107ea565b610358565b6060600480546101af9061080e565b600033816102ad828661032d565b9050838110156103125760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102638286868403610358565b6000336102408185856104f6565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103ba5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610309565b6001600160a01b03821661041b5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610309565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610488848461032d565b905060001981146104f057818110156104e35760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610309565b6104f08484848403610358565b50505050565b6001600160a01b03831661055a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610309565b6001600160a01b0382166105bc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610309565b6001600160a01b038316600090815260208190526040902054818110156106345760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610309565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061066b9084906107ea565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106b791815260200190565b60405180910390a36104f0565b80356001600160a01b03811681146106db57600080fd5b919050565b6000602082840312156106f1578081fd5b6106fa826106c4565b9392505050565b60008060408385031215610713578081fd5b61071c836106c4565b915061072a602084016106c4565b90509250929050565b600080600060608486031215610747578081fd5b610750846106c4565b925061075e602085016106c4565b9150604084013590509250925092565b60008060408385031215610780578182fd5b610789836106c4565b946020939093013593505050565b6000602080835283518082850152825b818110156107c3578581018301518582016040015282016107a7565b818111156107d45783604083870101525b50601f01601f1916929092016040019392505050565b6000821982111561080957634e487b7160e01b81526011600452602481fd5b500190565b600181811c9082168061082257607f821691505b6020821081141561084357634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220bf2cdfb62547fe5469d3c2c081609fbe63f5d8d64f2344f6ce69130638cc5f5864736f6c63430008040033',
      opcodes: 'PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH3 0x11 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH3 0xC39 CODESIZE SUB DUP1 PUSH3 0xC39 DUP4 CODECOPY DUP2 ADD PUSH1 0x40 DUP2 SWAP1 MSTORE PUSH3 0x34 SWAP2 PUSH3 0x2C2 JUMP JUMPDEST DUP3 MLOAD DUP4 SWAP1 DUP4 SWAP1 PUSH3 0x4D SWAP1 PUSH1 0x3 SWAP1 PUSH1 0x20 DUP6 ADD SWAP1 PUSH3 0x169 JUMP JUMPDEST POP DUP1 MLOAD PUSH3 0x63 SWAP1 PUSH1 0x4 SWAP1 PUSH1 0x20 DUP5 ADD SWAP1 PUSH3 0x169 JUMP JUMPDEST POP POP POP PUSH3 0x78 CALLER DUP3 PUSH3 0x81 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST POP POP POP PUSH3 0x3AA JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH3 0xDC JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1F PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A206D696E7420746F20746865207A65726F206164647265737300 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH3 0xF0 SWAP2 SWAP1 PUSH3 0x332 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD DUP4 SWAP3 SWAP1 PUSH3 0x11F SWAP1 DUP5 SWAP1 PUSH3 0x332 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x40 MLOAD DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP1 PUSH1 0x0 SWAP1 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP1 PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH3 0x177 SWAP1 PUSH3 0x357 JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH3 0x19B JUMPI PUSH1 0x0 DUP6 SSTORE PUSH3 0x1E6 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH3 0x1B6 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH3 0x1E6 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH3 0x1E6 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x1E6 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0x1C9 JUMP JUMPDEST POP PUSH3 0x1F4 SWAP3 SWAP2 POP PUSH3 0x1F8 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x1F4 JUMPI PUSH1 0x0 DUP2 SSTORE PUSH1 0x1 ADD PUSH3 0x1F9 JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH3 0x220 JUMPI DUP1 DUP2 REVERT JUMPDEST DUP2 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP1 DUP3 GT ISZERO PUSH3 0x23D JUMPI PUSH3 0x23D PUSH3 0x394 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1F DUP4 ADD PUSH1 0x1F NOT SWAP1 DUP2 AND PUSH1 0x3F ADD AND DUP2 ADD SWAP1 DUP3 DUP3 GT DUP2 DUP4 LT OR ISZERO PUSH3 0x268 JUMPI PUSH3 0x268 PUSH3 0x394 JUMP JUMPDEST DUP2 PUSH1 0x40 MSTORE DUP4 DUP2 MSTORE PUSH1 0x20 SWAP3 POP DUP7 DUP4 DUP6 DUP9 ADD ADD GT ISZERO PUSH3 0x284 JUMPI DUP5 DUP6 REVERT JUMPDEST DUP5 SWAP2 POP JUMPDEST DUP4 DUP3 LT ISZERO PUSH3 0x2A7 JUMPI DUP6 DUP3 ADD DUP4 ADD MLOAD DUP2 DUP4 ADD DUP5 ADD MSTORE SWAP1 DUP3 ADD SWAP1 PUSH3 0x288 JUMP JUMPDEST DUP4 DUP3 GT ISZERO PUSH3 0x2B8 JUMPI DUP5 DUP4 DUP6 DUP4 ADD ADD MSTORE JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH3 0x2D7 JUMPI DUP3 DUP4 REVERT JUMPDEST DUP4 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP1 DUP3 GT ISZERO PUSH3 0x2EE JUMPI DUP5 DUP6 REVERT JUMPDEST PUSH3 0x2FC DUP8 DUP4 DUP9 ADD PUSH3 0x20F JUMP JUMPDEST SWAP5 POP PUSH1 0x20 DUP7 ADD MLOAD SWAP2 POP DUP1 DUP3 GT ISZERO PUSH3 0x312 JUMPI DUP4 DUP5 REVERT JUMPDEST POP PUSH3 0x321 DUP7 DUP3 DUP8 ADD PUSH3 0x20F JUMP JUMPDEST SWAP3 POP POP PUSH1 0x40 DUP5 ADD MLOAD SWAP1 POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 DUP3 NOT DUP3 GT ISZERO PUSH3 0x352 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 DUP2 REVERT JUMPDEST POP ADD SWAP1 JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH3 0x36C JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH3 0x38E JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH2 0x87F DUP1 PUSH3 0x3BA PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0xA9 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x39509351 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0x39509351 EQ PUSH2 0x123 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x136 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x15F JUMPI DUP1 PUSH4 0xA457C2D7 EQ PUSH2 0x167 JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x17A JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x18D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0xAE JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0xCC JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0xEF JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x101 JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x114 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xB6 PUSH2 0x1A0 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xC3 SWAP2 SWAP1 PUSH2 0x797 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0xDF PUSH2 0xDA CALLDATASIZE PUSH1 0x4 PUSH2 0x76E JUMP JUMPDEST PUSH2 0x232 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xC3 JUMP JUMPDEST PUSH1 0x2 SLOAD JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xC3 JUMP JUMPDEST PUSH2 0xDF PUSH2 0x10F CALLDATASIZE PUSH1 0x4 PUSH2 0x733 JUMP JUMPDEST PUSH2 0x24A JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x12 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xC3 JUMP JUMPDEST PUSH2 0xDF PUSH2 0x131 CALLDATASIZE PUSH1 0x4 PUSH2 0x76E JUMP JUMPDEST PUSH2 0x26E JUMP JUMPDEST PUSH2 0xF3 PUSH2 0x144 CALLDATASIZE PUSH1 0x4 PUSH2 0x6E0 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD SWAP1 JUMP JUMPDEST PUSH2 0xB6 PUSH2 0x290 JUMP JUMPDEST PUSH2 0xDF PUSH2 0x175 CALLDATASIZE PUSH1 0x4 PUSH2 0x76E JUMP JUMPDEST PUSH2 0x29F JUMP JUMPDEST PUSH2 0xDF PUSH2 0x188 CALLDATASIZE PUSH1 0x4 PUSH2 0x76E JUMP JUMPDEST PUSH2 0x31F JUMP JUMPDEST PUSH2 0xF3 PUSH2 0x19B CALLDATASIZE PUSH1 0x4 PUSH2 0x701 JUMP JUMPDEST PUSH2 0x32D JUMP JUMPDEST PUSH1 0x60 PUSH1 0x3 DUP1 SLOAD PUSH2 0x1AF SWAP1 PUSH2 0x80E JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x1DB SWAP1 PUSH2 0x80E JUMP JUMPDEST DUP1 ISZERO PUSH2 0x228 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x1FD JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x228 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x20B JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 CALLER PUSH2 0x240 DUP2 DUP6 DUP6 PUSH2 0x358 JUMP JUMPDEST POP PUSH1 0x1 SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 CALLER PUSH2 0x258 DUP6 DUP3 DUP6 PUSH2 0x47C JUMP JUMPDEST PUSH2 0x263 DUP6 DUP6 DUP6 PUSH2 0x4F6 JUMP JUMPDEST POP PUSH1 0x1 SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x0 CALLER PUSH2 0x240 DUP2 DUP6 DUP6 PUSH2 0x281 DUP4 DUP4 PUSH2 0x32D JUMP JUMPDEST PUSH2 0x28B SWAP2 SWAP1 PUSH2 0x7EA JUMP JUMPDEST PUSH2 0x358 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 SLOAD PUSH2 0x1AF SWAP1 PUSH2 0x80E JUMP JUMPDEST PUSH1 0x0 CALLER DUP2 PUSH2 0x2AD DUP3 DUP7 PUSH2 0x32D JUMP JUMPDEST SWAP1 POP DUP4 DUP2 LT ISZERO PUSH2 0x312 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x25 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A2064656372656173656420616C6C6F77616E63652062656C6F77 PUSH1 0x44 DUP3 ADD MSTORE PUSH5 0x207A65726F PUSH1 0xD8 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x263 DUP3 DUP7 DUP7 DUP5 SUB PUSH2 0x358 JUMP JUMPDEST PUSH1 0x0 CALLER PUSH2 0x240 DUP2 DUP6 DUP6 PUSH2 0x4F6 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP2 DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP4 SWAP1 SWAP5 AND DUP3 MSTORE SWAP2 SWAP1 SWAP2 MSTORE KECCAK256 SLOAD SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH2 0x3BA JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP1 DUP3 ADD MSTORE PUSH32 0x45524332303A20617070726F76652066726F6D20746865207A65726F20616464 PUSH1 0x44 DUP3 ADD MSTORE PUSH4 0x72657373 PUSH1 0xE0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x309 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0x41B JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x22 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A20617070726F766520746F20746865207A65726F206164647265 PUSH1 0x44 DUP3 ADD MSTORE PUSH2 0x7373 PUSH1 0xF0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x309 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 DUP8 AND DUP1 DUP5 MSTORE SWAP5 DUP3 MSTORE SWAP2 DUP3 SWAP1 KECCAK256 DUP6 SWAP1 SSTORE SWAP1 MLOAD DUP5 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x488 DUP5 DUP5 PUSH2 0x32D JUMP JUMPDEST SWAP1 POP PUSH1 0x0 NOT DUP2 EQ PUSH2 0x4F0 JUMPI DUP2 DUP2 LT ISZERO PUSH2 0x4E3 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1D PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A20696E73756666696369656E7420616C6C6F77616E6365000000 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x309 JUMP JUMPDEST PUSH2 0x4F0 DUP5 DUP5 DUP5 DUP5 SUB PUSH2 0x358 JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH2 0x55A JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x25 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A207472616E736665722066726F6D20746865207A65726F206164 PUSH1 0x44 DUP3 ADD MSTORE PUSH5 0x6472657373 PUSH1 0xD8 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x309 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0x5BC JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x23 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A207472616E7366657220746F20746865207A65726F2061646472 PUSH1 0x44 DUP3 ADD MSTORE PUSH3 0x657373 PUSH1 0xE8 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x309 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP2 DUP2 LT ISZERO PUSH2 0x634 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x26 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524332303A207472616E7366657220616D6F756E7420657863656564732062 PUSH1 0x44 DUP3 ADD MSTORE PUSH6 0x616C616E6365 PUSH1 0xD0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x309 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP1 DUP6 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP1 DUP3 KECCAK256 DUP6 DUP6 SUB SWAP1 SSTORE SWAP2 DUP6 AND DUP2 MSTORE SWAP1 DUP2 KECCAK256 DUP1 SLOAD DUP5 SWAP3 SWAP1 PUSH2 0x66B SWAP1 DUP5 SWAP1 PUSH2 0x7EA JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP3 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP5 PUSH1 0x40 MLOAD PUSH2 0x6B7 SWAP2 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 PUSH2 0x4F0 JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x6DB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x6F1 JUMPI DUP1 DUP2 REVERT JUMPDEST PUSH2 0x6FA DUP3 PUSH2 0x6C4 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x713 JUMPI DUP1 DUP2 REVERT JUMPDEST PUSH2 0x71C DUP4 PUSH2 0x6C4 JUMP JUMPDEST SWAP2 POP PUSH2 0x72A PUSH1 0x20 DUP5 ADD PUSH2 0x6C4 JUMP JUMPDEST SWAP1 POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0x747 JUMPI DUP1 DUP2 REVERT JUMPDEST PUSH2 0x750 DUP5 PUSH2 0x6C4 JUMP JUMPDEST SWAP3 POP PUSH2 0x75E PUSH1 0x20 DUP6 ADD PUSH2 0x6C4 JUMP JUMPDEST SWAP2 POP PUSH1 0x40 DUP5 ADD CALLDATALOAD SWAP1 POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x780 JUMPI DUP2 DUP3 REVERT JUMPDEST PUSH2 0x789 DUP4 PUSH2 0x6C4 JUMP JUMPDEST SWAP5 PUSH1 0x20 SWAP4 SWAP1 SWAP4 ADD CALLDATALOAD SWAP4 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP1 DUP4 MSTORE DUP4 MLOAD DUP1 DUP3 DUP6 ADD MSTORE DUP3 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0x7C3 JUMPI DUP6 DUP2 ADD DUP4 ADD MLOAD DUP6 DUP3 ADD PUSH1 0x40 ADD MSTORE DUP3 ADD PUSH2 0x7A7 JUMP JUMPDEST DUP2 DUP2 GT ISZERO PUSH2 0x7D4 JUMPI DUP4 PUSH1 0x40 DUP4 DUP8 ADD ADD MSTORE JUMPDEST POP PUSH1 0x1F ADD PUSH1 0x1F NOT AND SWAP3 SWAP1 SWAP3 ADD PUSH1 0x40 ADD SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 NOT DUP3 GT ISZERO PUSH2 0x809 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 DUP2 REVERT JUMPDEST POP ADD SWAP1 JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0x822 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x843 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xBF 0x2C 0xDF 0xB6 0x25 SELFBALANCE INVALID SLOAD PUSH10 0xD3C2C081609FBE63F5D8 0xD6 0x4F 0x23 DIFFICULTY 0xF6 0xCE PUSH10 0x130638CC5F5864736F6C PUSH4 0x43000804 STOP CALLER ',
      sourceMap: '465:279:4:-:0;;;593:149;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;2044:13:0;;678:5:4;;684:7;;2044:13:0;;:5;;:13;;;;;:::i;:::-;-1:-1:-1;2067:17:0;;;;:7;;:17;;;;;:::i;:::-;;1978:113;;703:32:4::1;709:10;721:13;703:5;;;:32;;:::i;:::-;593:149:::0;;;465:279;;8411:389:0;-1:-1:-1;;;;;8494:21:0;;8486:65;;;;-1:-1:-1;;;8486:65:0;;1788:2:5;8486:65:0;;;1770:21:5;1827:2;1807:18;;;1800:30;1866:33;1846:18;;;1839:61;1917:18;;8486:65:0;;;;;;;;8638:6;8622:12;;:22;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;;;8654:18:0;;:9;:18;;;;;;;;;;:28;;8676:6;;8654:9;:28;;8676:6;;8654:28;:::i;:::-;;;;-1:-1:-1;;8697:37:0;;2092:25:5;;;-1:-1:-1;;;;;8697:37:0;;;8714:1;;8697:37;;2080:2:5;2065:18;8697:37:0;;;;;;;8411:389;;:::o;465:279:4:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;465:279:4;;;-1:-1:-1;465:279:4;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;14:909:5;68:5;121:3;114:4;106:6;102:17;98:27;88:2;;143:5;136;129:20;88:2;170:13;;-1:-1:-1;;;;;232:10:5;;;229:2;;;245:18;;:::i;:::-;320:2;314:9;288:2;374:13;;-1:-1:-1;;370:22:5;;;394:2;366:31;362:40;350:53;;;418:18;;;438:22;;;415:46;412:2;;;464:18;;:::i;:::-;504:10;500:2;493:22;539:2;531:6;524:18;561:4;551:14;;606:3;601:2;596;588:6;584:15;580:24;577:33;574:2;;;627:5;620;613:20;574:2;653:5;644:14;;667:133;681:2;678:1;675:9;667:133;;;769:14;;;765:23;;759:30;738:14;;;734:23;;727:63;692:10;;;;667:133;;;818:2;815:1;812:9;809:2;;;877:5;872:2;867;859:6;855:15;851:24;844:39;809:2;911:6;78:845;-1:-1:-1;;;;;;78:845:5:o;928:653::-;1036:6;1044;1052;1105:2;1093:9;1084:7;1080:23;1076:32;1073:2;;;1126:6;1118;1111:22;1073:2;1158:16;;-1:-1:-1;;;;;1223:14:5;;;1220:2;;;1255:6;1247;1240:22;1220:2;1283:61;1336:7;1327:6;1316:9;1312:22;1283:61;:::i;:::-;1273:71;;1390:2;1379:9;1375:18;1369:25;1353:41;;1419:2;1409:8;1406:16;1403:2;;;1440:6;1432;1425:22;1403:2;;1468:63;1523:7;1512:8;1501:9;1497:24;1468:63;:::i;:::-;1458:73;;;1571:2;1560:9;1556:18;1550:25;1540:35;;1063:518;;;;;:::o;2128:229::-;2168:3;2199:1;2195:6;2192:1;2189:13;2186:2;;;-1:-1:-1;;;2225:33:5;;2281:4;2278:1;2271:15;2311:4;2232:3;2299:17;2186:2;-1:-1:-1;2342:9:5;;2176:181::o;2362:380::-;2441:1;2437:12;;;;2484;;;2505:2;;2559:4;2551:6;2547:17;2537:27;;2505:2;2612;2604:6;2601:14;2581:18;2578:38;2575:2;;;2658:10;2653:3;2649:20;2646:1;2639:31;2693:4;2690:1;2683:15;2721:4;2718:1;2711:15;2575:2;;2417:325;;;:::o;2747:127::-;2808:10;2803:3;2799:20;2796:1;2789:31;2839:4;2836:1;2829:15;2863:4;2860:1;2853:15;2779:95;465:279:4;;;;;;',
    },
    contracts: {

      sources: {
        '@openzeppelin/contracts/token/ERC20/ERC20.sol': {
          keccak256: '0xe0c8b625a79bac0fe80f17cfb521e072805cc9cef1c96a5caf45b264e74812fa',
          license: 'MIT',
          urls: ['bzz-raw://12fd1efc9ad061ef675bd50fb0c8e3c6f2952a09f8df0e3c688b8d81b8918838', 'dweb:/ipfs/QmawN6PjTwy91pU7ANjCSgbsLc8TDA6hwu9GsFFaNSuhb5'],
        },
        '@openzeppelin/contracts/token/ERC20/IERC20.sol': {
          keccak256: '0x9750c6b834f7b43000631af5cc30001c5f547b3ceb3635488f140f60e897ea6b',
          license: 'MIT',
          urls: ['bzz-raw://5a7d5b1ef5d8d5889ad2ed89d8619c09383b80b72ab226e0fe7bde1636481e34', 'dweb:/ipfs/QmebXWgtEfumQGBdVeM6c71McLixYXQP5Bk6kKXuoY4Bmr'],
        },
        '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol': {
          keccak256: '0x8de418a5503946cabe331f35fe242d3201a73f67f77aaeb7110acb1f30423aca',
          license: 'MIT',
          urls: ['bzz-raw://5a376d3dda2cb70536c0a45c208b29b34ac560c4cb4f513a42079f96ba47d2dd', 'dweb:/ipfs/QmZQg6gn1sUpM8wHzwNvSnihumUCAhxD119MpXeKp8B9s8'],
        },
        '@openzeppelin/contracts/utils/Context.sol': {
          keccak256: '0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7',
          license: 'MIT',
          urls: ['bzz-raw://6df0ddf21ce9f58271bdfaa85cde98b200ef242a05a3f85c2bc10a8294800a92', 'dweb:/ipfs/QmRK2Y5Yc6BK7tGKkgsgn3aJEQGi5aakeSPZvS65PV8Xp3'],
        },
        'contracts/TokenNoMintNoBurn.sol': {
          keccak256: '0x4dc0c840a851c41217e190cfb245d353efbef8e5cb427b8ec624f63d59ff1a8e',
          license: 'MIT',
          urls: ['bzz-raw://229e08757271d79799e50d0f89e4f7f465716c0e5e9adda292c4860224ec51e2', 'dweb:/ipfs/QmUqavuHeBdvYt5wYtqT47SSrg8Ym8Jp1WSrruPjByFS7S'],
        },
      },
    },
  },
};
