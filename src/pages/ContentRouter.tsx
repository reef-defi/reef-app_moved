import React, { useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ApolloClient } from '@apollo/client';
import {
  ReefSigner, graphql, hooks, appState,
} from '@reef-defi/react-lib';
import {
  ADD_LIQUIDITY_URL,
  CREATE_ERC20_TOKEN_URL,
  DASHBOARD_URL,
  POOLS_URL,
  REMOVE_LIQUIDITY_URL,
  TRANSFER_TOKEN,
  BONDS_URL,
  POOL_CHART_URL,
  SPECIFIED_SWAP_URL,
  BIND_URL,
} from '../urls';
import AddLiqudity from './pools/AddLiquidity';
import Pools from './pools/Pools';
import RemoveLiquidity from './pools/RemoveLiquidity';
import Swap from './swap/Swap';
import Dashboard from './dashboard/Dashboard';
import { Transfer } from './transfer/Transfer';
import { Creator } from './creator/Creator';
import { Bonds } from './bonds/Bonds';
import PoolContext from '../context/PoolContext';
import TokenContext from '../context/TokenContext';
import TokenPrices from '../context/TokenPricesContext';
import Bind from './bind/Bind';
import Pool from './pools/Pool/Pool';

const ContentRouter = (): JSX.Element => {
  const currentSigner: ReefSigner|undefined|null = hooks.useObservableState(appState.selectedSigner$);
  const apollo: ApolloClient<any>|undefined = hooks.useObservableState(graphql.apolloClientInstance$);
  const reefPrice = hooks.useObservableState(appState.reefPrice$);
  // Its not appropriet to have token state in this component, but the problem was apollo client.
  // Once its decared properlly in App move TokenContext in the parent component (App.tsx)

  const tokens = hooks.useAllTokens(currentSigner?.address, apollo);
  const pools = hooks.useAllPools();
  const tokenPrices = useMemo(
    () => hooks.estimatePrice(tokens, pools, reefPrice || 0),
    [tokens, pools, reefPrice],
  );

  return (
    <div className="content">
      <TokenContext.Provider value={tokens}>
        <PoolContext.Provider value={pools}>
          <TokenPrices.Provider value={tokenPrices}>
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
      </TokenContext.Provider>
    </div>
  );
};

export default ContentRouter;
