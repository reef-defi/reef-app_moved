import './actions.css';
import {
  appState,
  Components,
  hooks,
  Network,
  ReefSigner,
  store,
} from '@reef-defi/react-lib';
import React, { useContext, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TokenContext from '../../../context/TokenContext';
import TokenPricesContext from '../../../context/TokenPricesContext';
import { notify } from '../../../utils/utils';

const { PoolActions } = Components;

interface Actions {
  address1: string;
  address2: string;
}

const Actions = ({address1, address2}: Actions): JSX.Element => {
  const history = useHistory();
  const tokens = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);
  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );
  const network: Network | undefined = hooks.useObservableState(
    appState.currentNetwork$,
  );

  // Provide

  const [provideState, provideDispatch] = useReducer(
    store.addLiquidityReducer,
    store.initialAddLiquidityState,
  );

  hooks.useAddLiquidity({
    address1,
    address2,
    dispatch: provideDispatch,
    state: provideState,
    tokens,
    signer: signer || undefined,
    network,
    tokenPrices,
  });

  const onAddLiquidity = hooks.onAddLiquidity({
    state: provideState,
    network,
    signer: signer || undefined,
    dispatch: provideDispatch,
    notify,
    updateTokenState: async () => {}, // eslint-disable-line
  });

  const provide = {
    state: provideState,
    actions: {
      onAddLiquidity,
      back: history.goBack,
      setToken1Amount: (amount: any) => provideDispatch(store.setToken1AmountAction(amount)),
      setToken2Amount: (amount: any) => provideDispatch(store.setToken2AmountAction(amount)),
    },
  };

  // Withdraw

  const [withdrawState, withdrawDispatch] = useReducer(
    store.removeLiquidityReducer,
    store.initialRemoveLiquidityState,
  );

  hooks.useRemoveLiquidity({
    address1,
    address2,
    dispatch: withdrawDispatch,
    state: withdrawState,
    tokens,
    network,
    signer: signer || undefined,
    tokenPrices,
  });

  const onRemoveLiquidity = hooks.onRemoveLiquidity({
    state: withdrawState,
    dispatch: withdrawDispatch,
    network,
    signer: signer || undefined,
    notify,
  });

  const withdraw = {
    state: withdrawState,
    actions: {
      onRemoveLiquidity,
      back: history.goBack,
      setPercentage: (percentage: any) => withdrawDispatch(store.setPercentageAction(percentage)),
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
          withdraw={withdraw}
        />
        )
      }
    </>
  );
};

export default Actions;
