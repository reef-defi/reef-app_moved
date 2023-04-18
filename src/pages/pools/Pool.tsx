import {
  appState, Components, graphql, hooks, utils,
} from '@reef-defi/react-lib';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ADD_LIQUIDITY_URL, REMOVE_LIQUIDITY_URL, SPECIFIED_SWAP_URL } from '../../urls';

const { PoolPage } = Components;

interface UrlParam {
  address: string;
}

const Pool = (): JSX.Element => {
  const history = useHistory();
  const { address } = useParams<UrlParam>();
  const network = hooks.useObservableState(appState.currentNetwork$);
  const apolloDex = hooks.useObservableState(graphql.apolloDexClientInstance$);

  const openTrade = (address1: string, address2: string): void => history.push(
    SPECIFIED_SWAP_URL
      .replace(':address1', address1)
      .replace(':address2', address2),
  );
  const openAddLiquidity = (address1: string, address2: string): void => history.push(
    ADD_LIQUIDITY_URL
      .replace(':address1', address1)
      .replace(':address2', address2),
  );
  const openRemoveLiquidity = (address1: string, address2: string): void => {
    history.push(
      REMOVE_LIQUIDITY_URL
        .replace(':address1', address1)
        .replace(':address2', address2),
    );
  };

  return (
    <>
      {network
      && (
      <PoolPage
        address={address}
        reefscanUrl={network.reefscanUrl}
        openTrade={openTrade}
        getIconUrl={utils.getIconUrl}
        openAddLiquidity={openAddLiquidity}
        openRemoveLiquidity={openRemoveLiquidity}
        dexClient={apolloDex}
      />
      )}
    </>
  );
};

export default Pool;
