import { appState, Components, hooks, store, Token } from '@reef-defi/react-lib';
import React, { useContext, useReducer, useState } from 'react';
import TokenContext from '../context/TokenContext';
import TokenPricesContext from '../context/TokenPricesContext';
import { notify } from '../utils/utils';

const {Trade, OverlayAction} = Components;

export interface OverlaySwap {
  isOpen: boolean,
  tokenAddress: string;
  onClose?: () => any
}

const OverlaySwap = ({
  tokenAddress,
  isOpen,
  onClose,
}: OverlaySwap): JSX.Element => {
  const [address1, setAddress1] = useState(tokenAddress);
  const [address2, setAddress2] = useState("0x");
  const {tokens} = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);

  const network = hooks.useObservableState(appState.currentNetwork$);
  const signer = hooks.useObservableState(appState.selectedSigner$);

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

  return (
    <OverlayAction
      isOpen={isOpen}
      title="Swap"
      onClose={onClose}
    >
      <div className="uik-pool-actions pool-actions">
        <Trade
          tokens={tokens}
          state={tradeState}
          actions={{
            onSwap,
            onSwitch,
            selectToken1: (token: Token): void => setAddress1(token.address),
            selectToken2: (token: Token): void => setAddress2(token.address),
            setPercentage: (amount: number) => tradeDispatch(store.setPercentageAction(amount)),
            setToken1Amount: (amount: string): void => tradeDispatch(store.setToken1AmountAction(amount)),
            setToken2Amount: (amount: string): void => tradeDispatch(store.setToken2AmountAction(amount)),
          }}
        />
      </div> 
    </OverlayAction>
  );
}

export default OverlaySwap;