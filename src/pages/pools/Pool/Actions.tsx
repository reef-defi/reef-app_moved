import './actions.css';
import {
  appState,
  Components,
  hooks,
  Network,
  ReefSigner,
  store,
} from '@reef-defi/react-lib';
import React, { useContext, useMemo, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TokenContext from '../../../context/TokenContext';
import TokenPricesContext from '../../../context/TokenPricesContext';
import { notify } from '../../../utils/utils';

const { PoolActions } = Components;

interface Actions {
  address1: string;
  address2: string;
}

const Actions = ({ address1, address2 }: Actions): JSX.Element => {
  const history = useHistory();
  const {tokens} = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);
  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );
  const network: Network | undefined = hooks.useObservableState(
    appState.currentNetwork$,
  );

  // Trade
  const [tradeState, tradeDispatch] = useReducer(
    store.swapReducer,
    store.initialSwapState,
  );

  hooks.useSwapState({
    address1,
    address2,
    dispatch: tradeDispatch,
    state: tradeState,
    tokenPrices,
    tokens,
    account: signer || undefined,
    network,
  });

  const onSwap = hooks.onSwap({
    state: tradeState,
    network,
    account: signer || undefined,
    dispatch: tradeDispatch,
    notify,
    updateTokenState: async () => {}, // eslint-disable-line
  });
  const onSwitch = (): void => {
    tradeDispatch(store.switchTokensAction());
    tradeDispatch(store.setPercentageAction(0));
    tradeDispatch(store.clearTokenAmountsAction());
  };

  const trade = {
    state: tradeState,
    actions: {
      onSwap,
      onSwitch,
      setPercentage: (amount: number) => tradeDispatch(store.setPercentageAction(amount)),
      setToken1Amount: (amount: string): void => tradeDispatch(store.setToken1AmountAction(amount)),
      setToken2Amount: (amount: string): void => tradeDispatch(store.setToken2AmountAction(amount)),
    },
  };
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
      setPercentage: (amount: number) => provideDispatch(store.setPercentageAction(amount)),
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
    tokens,
    network,
    address1,
    address2,
    tokenPrices,
    state: withdrawState,
    signer: signer || undefined,
    dispatch: withdrawDispatch,
  });

  const onRemoveLiquidity = hooks.onRemoveLiquidity({
    network,
    state: withdrawState,
    signer: signer || undefined,
    notify,
    dispatch: withdrawDispatch,
  });

  const withdraw = {
    state: withdrawState,
    actions: {
      onRemoveLiquidity,
      back: history.goBack,
      setPercentage: (percentage: number) => withdrawDispatch(store.setPercentageAction(percentage)),
    },
  };

  const params = useParams();
  const getTab = useMemo(() => {
    // @ts-ignore-next-line
    const { action } = params;
    return action.charAt(0).toUpperCase() + action.slice(1);
  }, [params]);

  return (
    <>
      {
        !!signer
        && (
        <PoolActions
          className="pool-actions"
          tab={getTab}
          trade={trade}
          provide={provide}
          withdraw={withdraw}
        />
        )
      }
    </>
  );
};

export default Actions;
