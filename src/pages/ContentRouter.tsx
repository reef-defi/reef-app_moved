import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  ADD_LIQUIDITY_URL, CREATE_ERC20_TOKEN_URL, DASHBOARD_URL, REMOVE_LIQUIDITY_URL, SETTINGS_URL, SWAP_URL,
} from '../urls';
import Swap from './swap/Swap';
import Dashboard from './dashboard/Dashboard';

const ContentRouter = (): JSX.Element => (
  <div className="content">
    <Switch>
      <Route exact path={SWAP_URL} component={Swap} />
      <Route exact path={DASHBOARD_URL} render={() => Dashboard} />
      <Route exact path={ADD_LIQUIDITY_URL} render={() => (<div />)} />
      <Route exact path={REMOVE_LIQUIDITY_URL} render={() => (<div />)} />
      <Route exact path={CREATE_ERC20_TOKEN_URL} render={() => (<div />)} />
      <Route path="/" render={() => (<Redirect to={DASHBOARD_URL} />)} />
    </Switch>
  </div>
);

export default ContentRouter;
