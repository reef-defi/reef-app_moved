import {AddressToNumber, appState, hooks, ReefSigner, TokenWithAmount} from '@reef-defi/react-lib';
import React, {useEffect, useMemo, useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NftContext from '../context/NftContext';
import PoolContext from '../context/PoolContext';
import TokenContext from '../context/TokenContext';
import TokenPrices from '../context/TokenPricesContext';
import {
  ADD_LIQUIDITY_URL, BIND_URL, BONDS_URL, CREATE_ERC20_TOKEN_URL,
  DASHBOARD_URL,
  POOLS_URL, POOL_CHART_URL, REMOVE_LIQUIDITY_URL, SPECIFIED_SWAP_URL, TRANSFER_TOKEN,
} from '../urls';
import Bind from './bind/Bind';
import { Bonds } from './bonds/Bonds';
import { Creator } from './creator/Creator';
import Dashboard from './dashboard/Dashboard';
import AddLiqudity from './pools/AddLiquidity';
import Pool from './pools/Pool/Pool';
import Pools from './pools/Pools';
import RemoveLiquidity from './pools/RemoveLiquidity';
import Swap from './swap/Swap';
import { Transfer } from './transfer/Transfer';

const ContentRouter = (): JSX.Element => {
  const currentSigner: ReefSigner|undefined|null = hooks.useObservableState(appState.selectedSigner$);
  const reefPrice = hooks.useObservableState(appState.reefPrice$);
  // const [tokenPrices, setTokenPrices] = useState({} as AddressToNumber<number>);
  // Its not appropriet to have token state in this component, but the problem was apollo client.
  // Once its decared properlly in App move TokenContext in the parent component (App.tsx)

  const tokens = hooks.useObservableState<TokenWithAmount[]|null>(appState.tokenPrices$, []);
  const [nfts, nftsLoading] = hooks.useAllNfts();
  const pools = hooks.useObservableState(appState.poolReserves$, []);
  // TODO use when we have pools graphql - const pools = hooks.useAllPools();
  const tokenPrices = useMemo(
    () => tokens?tokens.reduce((prices: AddressToNumber<number>, tkn)=>{
      prices[tkn.address] = tkn.price;
      return prices;
    }, {}) : [],
    [tokens],
  );
/*
const tokenPrices = useMemo(
    () => hooks.estimatePrice(tokens||[], pools, reefPrice || 0),
    [tokens, pools, reefPrice],
  );
*/

  return (
    <div className="content">
      <TokenContext.Provider value={{ tokens: tokens||[], loading: tokens==null }}>
        <NftContext.Provider value={{ nfts, loading: nftsLoading }}>
          <PoolContext.Provider value={pools}>
            <TokenPrices.Provider value={tokenPrices as AddressToNumber<number>}>
              <Switch>
                <Route path={SPECIFIED_SWAP_URL} component={Swap} />
                <Route exact path={POOLS_URL} component={Pools} />
                <Route exact path={DASHBOARD_URL} component={Dashboard} />
                <Route path={ADD_LIQUIDITY_URL} component={AddLiqudity} />
                <Route exact path={ADD_LIQUIDITY_URL} component={AddLiqudity} />
                <Route path={POOL_CHART_URL} component={Pool} />
                <Route path={REMOVE_LIQUIDITY_URL} component={RemoveLiquidity} />
                <Route exact path={TRANSFER_TOKEN} component={Transfer} />
                <Route exact path={CREATE_ERC20_TOKEN_URL} component={Creator} />
                <Route exact path={BONDS_URL} component={Bonds} />
                <Route path={BIND_URL} component={Bind} />
                <Route path="/" render={() => (<Redirect to={DASHBOARD_URL} />)} />
              </Switch>
            </TokenPrices.Provider>
          </PoolContext.Provider>
        </NftContext.Provider>
      </TokenContext.Provider>
    </div>
  );
};

export default ContentRouter;
