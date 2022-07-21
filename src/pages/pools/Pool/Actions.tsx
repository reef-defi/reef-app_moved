import './actions.css';
import {
  appState, Components,
  hooks, Network,
  ReefSigner, store,
} from '@reef-defi/react-lib';
import React, { useContext, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TokenContext from '../../../context/TokenContext';
import TokenPricesContext from '../../../context/TokenPricesContext';
import { notify } from '../../../utils/utils';

const { PoolActions } = Components;

interface UrlParams {
  address1: string;
  address2: string;
}

const Actions = (): JSX.Element => {
  const { address1, address2 } = useParams<UrlParams>();
  const history = useHistory();
  const tokens = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);
  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );
  const network: Network | undefined = hooks.useObservableState(
    appState.currentNetwork$,
  );

  const [state, dispatch] = useReducer(store.addLiquidityReducer, store.initialAddLiquidityState);

  hooks.useAddLiquidity({
    address1,
    address2,
    dispatch,
    state,
    tokens,
    signer: signer || undefined,
    network,
    tokenPrices,
  });

  const onAddLiquidity = hooks.onAddLiquidity({
    state,
    network,
    signer: signer || undefined,
    dispatch,
    notify,
    updateTokenState: async () => {}, // eslint-disable-line
  });

  const provide = {
    state,
    actions: {
      onAddLiquidity,
      back: history.goBack,
      setToken1Amount: (amount: any) => dispatch(store.setToken1AmountAction(amount)),
      setToken2Amount: (amount: any) => dispatch(store.setToken2AmountAction(amount)),
    },
  };

  return (
    <>
      {
        !!signer
        && (
        <PoolActions
          className="pool-actions"
          provide={provide}
        />
        )
      }
    </>
  );
};

export default Actions;
