import React, { useState } from 'react';
import { Components, hooks } from '@reef-defi/react-lib';
import './pool-transactions.css';
import Uik from '@reef-defi/ui-kit';
import Transactions from './Transactions';

const { OverlayAction } = Components;

export interface Tokens {
  firstToken?: hooks.TokenStats,
  secondToken?: hooks.TokenStats
}

export interface Props {
  tokens?: Tokens,
  address: string,
  reefscanUrl?: string,
  isOpen: boolean,
  onClose: () => void
}

export type Tabs = 'All' | 'Swap' | 'Mint' | 'Burn'

const PoolSelect = ({
  isOpen,
  onClose,
  address,
  reefscanUrl,
  tokens,
}: Props): JSX.Element => {
  const [tab, setTab] = useState<Tabs>('All');

  return (
    <OverlayAction
      title="Transactions"
      className="pool-transactions"
      isOpen={isOpen}
      onClose={onClose}
      onOpened={() => setTab('All')}
    >
      <Uik.Tabs
        value={tab}
        options={[
          { value: 'All', text: 'All' },
          { value: 'Swap', text: 'Trade' },
          { value: 'Mint', text: 'Stake' },
          { value: 'Burn', text: 'Unstake' },
        ]}
        onChange={(e) => setTab(e)}
      />
      <Transactions
        key={tab}
        address={address}
        reefscanUrl={reefscanUrl || ''}
        tab={tab}
        tokens={tokens}
      />
    </OverlayAction>
  );
};

export default PoolSelect;
