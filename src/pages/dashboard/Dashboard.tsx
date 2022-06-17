import React, { useState } from 'react';
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

const {
  DataProgress, isDataSet,
} = reefUtils;

const Dashboard = (): JSX.Element => {
  const signerTokenBalances: TokenWithAmount[]|undefined = hooks.useObservableState(appState.tokenPrices$);
  const signerNfts = hooks.useObservableState(appState.selectedSignerNFTs$);
  const selectedSigner: ReefSigner|undefined | null= hooks.useObservableState(appState.selectedSigner$);

  const totalBalance: reefUtils.DataWithProgress<number> = isDataSet(signerTokenBalances) && signerTokenBalances?.length ? (signerTokenBalances).reduce((state: reefUtils.DataWithProgress<number>, curr) => {
    if (Number.isNaN(curr.balance) || Number.isNaN(curr.price) || !isDataSet(curr.balance)) {
      return state;
    }
    const balVal = utils.calculateBalanceValue(curr);
    if (!Number.isNaN(balVal) && isDataSet(balVal)) {
      const stateNr = isDataSet(state) ? state as number : 0;
      return stateNr + (balVal as number);
    }
    return state;
  }, DataProgress.LOADING) : DataProgress.LOADING;

  const tabs = [
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

  const [tab, setTab] = useState(tabs[0].key);

  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <Balance balance={totalBalance} />
        <ActionButtons />
      </div>

      <div className="dashboard__main">
        <div className="dashboard__left">
          <Tabs tabs={tabs} selected={tab} onChange={(e) => setTab(e)} />

          { tab === 'tokens' ? <TokenBalances tokens={signerTokenBalances as utils.DataWithProgress<TokenWithAmount[]>} /> : '' }
          { tab === 'staking' ? <Staking /> : '' }
          { tab === 'nfts' ? <Nfts tokens={signerNfts} /> : '' }
          { tab === 'activity' ? <TokenActivity address={selectedSigner?.evmAddress} /> : '' }
        </div>

        <div className="dashboard__right">
          <TokenActivity address={selectedSigner?.evmAddress} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
