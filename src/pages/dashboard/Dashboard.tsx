import Uik from '@reef-defi/ui-kit';
import BigNumber from 'bignumber.js';
import React, {
  useContext, useMemo, useState,
} from 'react';
import NftContext from '../../context/NftContext';
import TokenContext from '../../context/TokenContext';
import TokenPricesContext from '../../context/TokenPricesContext';
import { bonds } from '../bonds/utils/bonds';
import BuyReefButton from './BuyReefButton';
import { Balance } from './Balance';
import { Rewards } from './Rewards';
import './Dashboard.css';
import { Nfts } from './Nfts';
import { Staking } from './Staking';
import { Activity } from './Activity/Activity';
import { TokenBalances } from './TokenBalances';
import { appState, hooks } from '@reef-defi/react-lib';

const Dashboard = (): JSX.Element => {
  const { nfts } = useContext(NftContext);
  const network = hooks.useObservableState(appState.currentNetwork$);
  const tabs = (() => {
    const list = [
      { value: 'tokens', text: 'Tokens' },
      { value: 'bonds', text: 'Bonds', indicator: bonds.filter((bond) => bond.network === network?.name).length },
      { value: 'nfts', text: 'NFTs' },
    ];

    return list;
  })();

  const { tokens, loading } = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);

  const [tab, setTab] = useState<string>(tabs[0].value);

  const totalBalance = useMemo(() => tokens.reduce(
    (acc, { balance, decimals, address }) => acc.plus(
      new BigNumber(balance.toString())
        .div(new BigNumber(10).pow(decimals))
        .multipliedBy(tokenPrices[address] || 0),
    ),
    new BigNumber(0),
  ).toNumber(),
  [tokenPrices, tokens]);

  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <div className="dashboard__top-left">
          <Balance balance={totalBalance} loading={loading} />
          <Rewards rewards={0} />
        </div>
        <div className="dashboard__top-right">
          <BuyReefButton />
        </div>
      </div>

      <div className="dashboard__main">
        <div className="dashboard__left">
          <Uik.Tabs
            className="dashboard__tabs"
            options={tabs}
            value={tab}
            onChange={(e) => setTab(e)}
          />

          { tab === 'tokens' ? <TokenBalances tokens={tokens} /> : '' }
          { tab === 'bonds' ? <Staking /> : '' }
          { tab === 'nfts' ? <Nfts nfts={nfts} /> : '' }
        </div>

        <div className="dashboard__right">
          <Activity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
