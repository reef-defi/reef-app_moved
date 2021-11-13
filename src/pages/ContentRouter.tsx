import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  ADD_LIQUIDITY_URL,
  CREATE_ERC20_TOKEN_URL,
  DASHBOARD_URL,
  POOLS_URL,
  REMOVE_LIQUIDITY_URL,
  SETTINGS_URL,
  SWAP_URL,
  TRANSFER_TOKEN,
} from '../urls';
import AddLiqudity from './pools/AddLiquidity';
import Pools from './pools/Pools';
import RemoveLiquidity from './pools/RemoveLiquidity';
import Swap from './swap/Swap';
import Dashboard from './dashboard/Dashboard';
import { Transfer } from './transfer/Transfer';
import { Creator } from './creator/Creator';

const ContentRouter = (): JSX.Element => (
  <div className="content">
    <Switch>
      <Route exact path={SWAP_URL} component={Swap} />
      <Route exact path={POOLS_URL} component={Pools} />
      <Route exact path={DASHBOARD_URL} component={Dashboard} />
      <Route exact path={ADD_LIQUIDITY_URL} component={AddLiqudity} />
      <Route path={REMOVE_LIQUIDITY_URL} component={RemoveLiquidity} />
      <Route exact path={TRANSFER_TOKEN} component={Transfer} />
      <Route exact path={CREATE_ERC20_TOKEN_URL} component={Creator} />
      <Route path="/" render={() => (<Redirect to={DASHBOARD_URL} />)} />
    </Switch>
  </div>
);

export default ContentRouter;
