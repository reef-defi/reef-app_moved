import {
  appState, hooks, ReefSigner,
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import BigNumber from 'bignumber.js';
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import NftContext from '../../context/NftContext';
import TokenContext from '../../context/TokenContext';
import TokenPricesContext from '../../context/TokenPricesContext';
import Bind from '../bind/Bind';
import { bonds } from '../bonds/utils/bonds';
import BuyReefButton from './BuyReefButton';
import { Balance } from './Balance';
import { Rewards } from './Rewards';
import './Dashboard.css';
import { Nfts } from './Nfts';
import { Staking } from './Staking';
import { TokenActivity } from './TokenActivity';
import { TokenBalances } from './TokenBalances';

const Dashboard = (): JSX.Element => {
  const { nfts } = useContext(NftContext);

  let tabs = (() => {
    const list = [{ value: 'tokens', text: 'Tokens' }];
    // @todo Tab should display only bonds that have user's funds staked. Display tab if there's at least one bond to display.
    if (bonds.length) list.push({ value: 'bonds', text: 'Bonds' });
    if (nfts.length) list.push({ value: 'nfts', text: 'NFTs' });

    return list;
  })();

  const { tokens, loading } = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);

  // const signerTokenBalances: TokenWithAmount[]|undefined = hooks.useObservableState(appState.tokenPrices$);
  // const signerNfts = hooks.useObservableState(appState.selectedSignerNFTs$);
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
          {
            tabs.length > 1
              ? (
                <Uik.Tabs
                  className="dashboard__tabs"
                  options={tabs}
                  value={tab}
                  onChange={(e) => setTab(e)}
                />
              )
              : <Uik.Text type="title" text="Tokens" />
          }

          { tab === 'tokens' ? <TokenBalances tokens={tokens} /> : '' }
          { tab === 'bonds' ? <Staking /> : '' }
          { tab === 'nfts' ? <Nfts nfts={nfts} /> : '' }
          { tab === 'bind' ? <Bind /> : '' }
        </div>

        <div className="dashboard__right">
          <TokenActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
