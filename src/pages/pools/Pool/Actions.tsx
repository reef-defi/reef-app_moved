import {
  appState,
  Components,
  hooks, store,
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import React, { useContext, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PoolContext from '../../../context/PoolContext';
import TokenContext from '../../../context/TokenContext';
import TokenPricesContext from '../../../context/TokenPricesContext';
import { POOL_CHART_URL } from '../../../urls';
import { notify } from '../../../utils/utils';
import './actions.css';

const {
  Trade, Provide, Finalizing, Withdraw,
} = Components;

export type ActionTabs = 'stake' | 'unstake' | 'trade';

interface ActionsProps {
  address1: string;
  address2: string;
  tab: ActionTabs;
}

const Actions = ({ address1, address2, tab }: ActionsProps): JSX.Element => {
  const { tokens } = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);
  const [finalized, setFinalized] = useState(true);
  const pools = useContext(PoolContext);

  const signer = hooks.useObservableState(
    appState.selectedSigner$,
  );
  const network = hooks.useObservableState(
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
    onSuccess: () => setFinalized(false),
    onFinalized: () => setFinalized(true),
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
    onSuccess: () => setFinalized(false),
    onFinalized: () => setFinalized(true),
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
    onSuccess: () => setFinalized(false),
    onFinalized: () => setFinalized(true),
  });

  if (!finalized) return <Finalizing />;

  // If finalized is false action will be 'false-void'
  const action = `${finalized}-${finalized ? tab : 'void'}`;
  switch (action) {
    case 'false-void':
      return <Finalizing />;
    case 'true-trade':
      return (
        <Trade
          pools={pools}
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
        />
      );
    case 'true-stake':
      return (
        <Provide
          state={provideState}
          tokens={tokens}
          actions={{
            onAddLiquidity,
            setPercentage: (amount: number) => provideDispatch(store.setPercentageAction(amount)),
            setToken1Amount: (amount: string) => provideDispatch(store.setToken1AmountAction(amount)),
            setToken2Amount: (amount: string) => provideDispatch(store.setToken2AmountAction(amount)),
          }}
        />
      );
    case 'true-unstake':
      return (
        <Withdraw
          state={withdrawState}
          actions={{
            onRemoveLiquidity,
            setPercentage: (percentage: number) => withdrawDispatch(store.setPercentageAction(percentage)),
          }}
        />
      );
    default:
      return <Finalizing />;
  }
};

interface ActionsWrapperProps extends ActionsProps {
  poolAddress: string;
}
const ActionsWrapper = ({
  address1, address2, poolAddress, tab,
}: ActionsWrapperProps): JSX.Element => {
  const history = useHistory();

  const selectTab = (newTab: ActionTabs): void => {
    history.push(
      POOL_CHART_URL
        .replace(':address', poolAddress)
        .replace(':action', newTab.toLowerCase()),
    );
  };

  return (
    <div className="uik-pool-actions pool-actions">
      <div className="uik-pool-actions__top">
        <Uik.Tabs
          value={tab}
          onChange={(value) => selectTab(value)}
          options={[
            { value: 'trade', text: 'Trade' },
            { value: 'stake', text: 'Stake' },
            { value: 'unstake', text: 'Unstake' },
          ]}
        />
      </div>
      <Actions
        address1={address1}
        address2={address2}
        tab={tab}
      />
    </div>
  );
};

export default ActionsWrapper;
