import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  TokenWithAmount, utils as reefUtils, utils, appState, hooks, Token, ReefSigner,
} from '@reef-defi/react-lib';
import { Balance } from './Balance';
import { ActionButtons } from './ActionButtons';
import './Dashboard.css';
import { TokenBalances } from './TokenBalances';
import { TokenActivity } from './TokenActivity';
import { Nfts } from './Nfts';
import { Staking } from './Staking';
import Tabs from '../../common/Tabs';
import { bonds } from '../bonds/utils/bonds';
import Bind from '../bind/Bind';
import TokenContext from '../../context/TokenContext';
import TokenPricesContext from '../../context/TokenPricesContext';
import BigNumber from 'bignumber.js';
import NftContext from '../../context/NftContext';

const {
  DataProgress, isDataSet,
} = reefUtils;

const DEFAULT_TABS = [
  {
    key: 'tokens',
    title: 'Tokens',
  },
  {
    key: 'staking',
    title: 'Staking',
    notification: bonds?.length,
  },
  {
    key: 'nfts',
    title: 'NFTs',
  },
  {
    key: 'activity',
    title: 'Activity',
  },
];

const Dashboard = (): JSX.Element => {
  let tabs = DEFAULT_TABS;

  const {nfts} = useContext(NftContext);
  const {tokens, loading} = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);

  // const signerTokenBalances: TokenWithAmount[]|undefined = hooks.useObservableState(appState.tokenPrices$);
  // const signerNfts = hooks.useObservableState(appState.selectedSignerNFTs$);
  const selectedSigner: ReefSigner|undefined | null = hooks.useObservableState(appState.selectedSigner$);
  const [tab, setTab] = useState<string>('');

  // If account is not bound, add bind tab to 'tabs' array
  if (!!selectedSigner && !selectedSigner.isEvmClaimed) {
    const bindTab = { key: 'bind', title: 'Bind Account' };
    tabs = [bindTab, ...tabs];
  }

  useEffect(() => {
    setTab(tabs[0].key);
  }, [selectedSigner]);

  const totalBalance = useMemo(() => tokens.reduce(
      (acc, { balance, decimals, address }) =>
        acc.plus(
          new BigNumber(balance.toString())
            .div(new BigNumber(10).pow(decimals))
            .multipliedBy(tokenPrices[address] || 0)
        ),
      new BigNumber(0)
    ).toNumber(), 
    [tokenPrices, tokens]
  );

  const availableTokens = useMemo(
    () => tokens.filter(({ balance }) => balance.gt(0)),
    [tokens]
  );

  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <Balance balance={totalBalance} loading={loading} />
        <ActionButtons />
      </div>

      <div className="dashboard__main">
        <div className="dashboard__left">
          <Tabs tabs={tabs} selected={tab} onChange={(e) => setTab(e)} />

          { tab === 'tokens' ? <TokenBalances tokens={availableTokens} /> : '' }
          { tab === 'staking' ? <Staking /> : '' }
          { tab === 'nfts' ? <Nfts nfts={nfts} /> : '' }
          { tab === 'activity' ? <TokenActivity address={selectedSigner?.evmAddress} /> : '' }
          { tab === 'bind' ? <Bind /> : '' }
        </div>

        <div className="dashboard__right">
          <TokenActivity address={selectedSigner?.evmAddress} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
