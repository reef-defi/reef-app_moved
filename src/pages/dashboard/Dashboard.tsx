import React, { useEffect, useState } from 'react';
import {
  TokenWithAmount, utils as reefUtils, utils, appState, hooks, Token, ReefSigner,
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
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

const {
  DataProgress, isDataSet,
} = reefUtils;

const DEFAULT_TABS = [
  {
    value: 'tokens',
    text: 'Tokens',
  },
  {
    value: 'staking',
    text: 'Staking',
    indicator: bonds?.length,
  },
  {
    value: 'nfts',
    text: 'NFTs',
  },
];

const Dashboard = (): JSX.Element => {
  let tabs = DEFAULT_TABS;
  const signerTokenBalances: TokenWithAmount[]|undefined = hooks.useObservableState(appState.tokenPrices$);
  const signerNfts = hooks.useObservableState(appState.selectedSignerNFTs$);
  const selectedSigner: ReefSigner|undefined | null = hooks.useObservableState(appState.selectedSigner$);
  const [tab, setTab] = useState<string>('');

  // If account is not bound, add bind tab to 'tabs' array
  if (!!selectedSigner && !selectedSigner.isEvmClaimed) {
    const bindTab = { value: 'bind', text: 'Bind Account' };
    tabs = [bindTab, ...tabs];
  }

  useEffect(() => {
    setTab(tabs[0].value);
  }, [selectedSigner]);

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

  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <Balance balance={totalBalance} />
        <ActionButtons />
      </div>

      <div className="dashboard__main">
        <div className="dashboard__left">
          <Uik.Tabs options={tabs} value={tab} onChange={(e) => setTab(e)} />

          { tab === 'tokens' ? <TokenBalances tokens={signerTokenBalances as utils.DataWithProgress<TokenWithAmount[]>} /> : '' }
          { tab === 'staking' ? <Staking /> : '' }
          { tab === 'nfts' ? <Nfts tokens={signerNfts} /> : '' }
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
