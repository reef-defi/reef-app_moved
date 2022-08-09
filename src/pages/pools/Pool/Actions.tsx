import {
  appState,
  Components,
  hooks,
  Network,
  ReefSigner,
  store
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import React, { useContext, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TokenContext from '../../../context/TokenContext';
import TokenPricesContext from '../../../context/TokenPricesContext';
import { POOL_CHART_URL } from '../../../urls';
import { notify } from '../../../utils/utils';
import './actions.css';

const { Trade, Provide, Finalizing, Withdraw  } = Components;

export type ActionTabs = 'provide' | 'withdraw' | 'trade';

interface ActionsProps {
  poolAddress: string;
  address1: string;
  address2: string;
  tab: ActionTabs;
}

const Actions = ({ address1, address2, tab }: ActionsProps): JSX.Element => {
  const { tokens } = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);
  const [finalized, ] = useState(true); // TODO add finalizing

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

  // If finalized is false action will be 'false-void'
  const action = `${finalized}-${finalized ? tab : 'void'}`;
  switch (action) {
    case "false-void":
      return <Finalizing />;
    case "true-trade":
      return <Trade
        tokens={tokens} 
        state={tradeState}
        actions={{
          onSwap,
          onSwitch,
          setPercentage: (amount: number) => tradeDispatch(store.setPercentageAction(amount)),
          setToken1Amount: (amount: string): void => tradeDispatch(store.setToken1AmountAction(amount)),
          setToken2Amount: (amount: string): void => tradeDispatch(store.setToken2AmountAction(amount)),
          // selectToken1: (token: Token): void => tradeDispatch(store.setToken1Action(token)),
          // selectToken2: (token: Token): void => tradeDispatch(store.setToken2Action(token)),
        }}
      />;
    case "true-provide":
      return <Provide 
        state={provideState}
        tokens={tokens}
        actions={{
          onAddLiquidity,
          setPercentage: (amount: number) => provideDispatch(store.setPercentageAction(amount)),
          setToken1Amount: (amount: any) => provideDispatch(store.setToken1AmountAction(amount)),
          setToken2Amount: (amount: any) => provideDispatch(store.setToken2AmountAction(amount)), 
        }}
      />;
    case "true-withdraw":
      return <Withdraw 
        state={withdrawState}
        actions={{
          onRemoveLiquidity,
          setPercentage: (percentage: number) => withdrawDispatch(store.setPercentageAction(percentage))
        }}
      />;
    default:
      return <Finalizing />;
  }
};

const ActionsWrapper = ({address1, address2, poolAddress, tab}: ActionsProps): JSX.Element => {
  const history = useHistory();

  const selectTab = (newTab: ActionTabs): void => {
    history.push(
      POOL_CHART_URL
        .replace(':address', poolAddress)
        .replace(':action', newTab.toLowerCase())
    );
  }

  return (
    <div
      className='uik-pool-actions pool-actions'
    >
      <div className="uik-pool-actions__top">
        <Uik.Tabs
          value={tab}
          onChange={(value) => selectTab(value)}
          options={['Trade', 'Provide', 'Withdraw']}
        />
      </div>
      <Actions 
        address1={address1}
        address2={address2}
        tab={tab}
        poolAddress={poolAddress}
      />
    </div>
  )
}

export default ActionsWrapper;
