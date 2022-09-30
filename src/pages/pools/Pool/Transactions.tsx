import React, { useState } from 'react';
import Uik from '@reef-defi/ui-kit';
import { utils, hooks } from '@reef-defi/react-lib';
import { faRepeat, faCoins, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import Identicon from '@polkadot/react-identicon';
import { Tabs, Tokens } from './PoolTransactions';

const { formatAgoDate, formatAmount, shortAddress } = utils;
const {
  usePoolTransactionCountSubscription,
  usePoolTransactionSubscription,
} = hooks;

export interface Props {
  tab: Tabs,
  address: string,
  reefscanUrl?: string,
  tokens?: Tokens
}

const icons = {
  Swap: {
    icon: faRepeat,
    type: 'trade',
  },
  Mint: {
    icon: faCoins,
    type: 'stake',
  },
  Burn: {
    icon: faArrowUpFromBracket,
    type: 'unstake',
  },
};

const Transactions = ({
  tab, address, reefscanUrl, tokens,
}: Props): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0);

  const { loading: loadingTransactions, data: transactionData } = usePoolTransactionSubscription(address, tab, pageIndex, 10);
  const { data } = usePoolTransactionCountSubscription(address, tab);

  const maxPage = data
    ? Math.ceil(data.verified_pool_event_aggregate.aggregate.count / 10)
    : 1;

  const nextPage = (): void => setPageIndex(Math.min(maxPage - 1, pageIndex + 1));
  const prevPage = (): void => setPageIndex(Math.max(0, pageIndex - 1));

  const getType = (poolType: Tabs, amount_1: number, tokenSymbol1: string, tokenSymbol2: string): string => {
    switch (poolType) {
      case 'Swap': return `Traded ${amount_1 > 0 ? tokenSymbol1 : tokenSymbol2} for ${amount_1 > 0 ? tokenSymbol2 : tokenSymbol1}`;
      case 'Burn': return 'Unstaked';
      case 'Mint': return 'Staked';
      default: return '';
    }
  };

  if (loadingTransactions || !transactionData) {
    return (<div />);
  }

  if (!transactionData?.verified_pool_event.length) {
    return (
      <Uik.Text type="light">It appears there&apos;s no transactions in this category</Uik.Text>
    );
  }

  return (
    <Uik.Table seamless>
      <Uik.THead>
        <Uik.Th>Type</Uik.Th>
        <Uik.Th>Account</Uik.Th>
        <Uik.Th align="center">Time</Uik.Th>
        <Uik.Th align="right">
          { tokens?.firstToken?.symbol }
          {' '}
          Amount
        </Uik.Th>
        <Uik.Th align="right">
          { tokens?.secondToken?.symbol }
          {' '}
          Amount
        </Uik.Th>
      </Uik.THead>

      <Uik.TBody>
        {
            transactionData.verified_pool_event.map(({
              amount_1,
              amount_2,
              timestamp,
              to_address,
              type: transactionType,
              amount_in_1,
              amount_in_2,
              evm_event: {
                event: {
                  id,
                  extrinsic: {
                    hash,
                    signer,
                  },
                },
              },
              pool: {
                token_contract_1,
                token_contract_2,
              },
            }) => {
              const symbol1 = token_contract_1.verified_contract?.contract_data.symbol || '?';
              const decimal1 = token_contract_1.verified_contract?.contract_data.decimals || 18;
              const symbol2 = token_contract_2.verified_contract?.contract_data.symbol || '?';
              const decimal2 = token_contract_2.verified_contract?.contract_data.decimals || 18;

              return (
                <Uik.Tr
                  key={id}
                  onClick={() => window.open(`${reefscanUrl}/extrinsic/${hash}`)}
                >
                  <Uik.Td>
                    <Uik.Icon
                      icon={icons[transactionType].icon}
                      className={`
                        pool-transactions__transaction-icon
                        pool-transactions__transaction-icon--${icons[transactionType].type}
                      `}
                    />
                    <span>{ getType(transactionType, amount_1, symbol1, symbol2) }</span>
                  </Uik.Td>

                  <Uik.Td>
                    <a
                      href={`${reefscanUrl}/account/${to_address || signer}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      rel="noreferrer"
                    >
                      <Identicon value={signer} size={18} className="pool-transactions__transaction-account-identicon" />
                      <span>{ shortAddress(to_address || signer) }</span>
                    </a>
                  </Uik.Td>

                  <Uik.Td align="center">{ formatAgoDate(timestamp) }</Uik.Td>

                  <Uik.Td align="right">{formatAmount(amount_1 > 0 ? amount_1 : amount_in_1, decimal1)}</Uik.Td>

                  <Uik.Td align="right">{formatAmount(amount_2 > 0 ? amount_2 : amount_in_2, decimal2)}</Uik.Td>
                </Uik.Tr>
              );
            })
          }
      </Uik.TBody>
    </Uik.Table>
  );
};

export default Transactions;
