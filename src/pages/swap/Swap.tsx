import {
  appState, Components, hooks, Network, ReefSigner, Settings, store, Token,
} from '@reef-defi/react-lib';
import React, { useContext, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TokenContext from '../../context/TokenContext';
import TokenPricesContext from '../../context/TokenPricesContext';
import { addressReplacer, SPECIFIED_SWAP_URL, UrlAddressParams } from '../../urls';
import { notify } from '../../utils/utils';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const history = useHistory();
  const tokens = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);
  const { address1, address2 } = useParams<UrlAddressParams>();

  const network: Network|undefined = hooks.useObservableState(appState.currentNetwork$);
  const signer: ReefSigner|undefined | null = hooks.useObservableState(appState.selectedSigner$);

  const [state, dispatch] = useReducer(store.swapReducer, store.initialSwapState);
  // hook manages all nececcery swap updates
  hooks.useSwapState({
    address1,
    address2,
    dispatch,
    network,
    state,
    tokens,
    tokenPrices,
    account: signer||undefined,
  });

  // Actions
  const onSwap = hooks.onSwap({
    state,
    network,
    account: signer||undefined,
    dispatch,
    notify,
    updateTokenState: async () => {}, // eslint-disable-line
  });
  const onSwitch = (): void => {
    dispatch(store.switchTokensAction());
    dispatch(store.clearTokenAmountsAction());
    history.push(addressReplacer(SPECIFIED_SWAP_URL, state.token2.address, state.token1.address));
  };
  const selectToken1 = (token: Token): void => {
    dispatch(store.setToken1Action(token));
    dispatch(store.clearTokenAmountsAction());
    history.push(addressReplacer(SPECIFIED_SWAP_URL, token.address, state.token2.address));
  };
  const selectToken2 = (token: Token): void => {
    dispatch(store.setToken2Action(token));
    dispatch(store.clearTokenAmountsAction());
    history.push(addressReplacer(SPECIFIED_SWAP_URL, state.token1.address, token.address));
  };
  const setSettings = (settings: Settings): void => dispatch(store.setSettingsAction(settings));
  const setToken1Amount = (amount: string): void => dispatch(store.setToken1AmountAction(amount));
  const setToken2Amount = (amount: string): void => dispatch(store.setToken2AmountAction(amount));

  const actions: store.SwapComponentActions = {
    onAddressChange: async () => {}, // eslint-disable-line
    onSwap,
    onSwitch,
    selectToken1,
    selectToken2,
    setSettings,
    setToken1Amount,
    setToken2Amount,
  };

  if (!signer) {
    return <div />;
  }
  return (
    <SwapComponent
      tokens={tokens}
      account={signer}
      state={state}
      actions={actions}
    />
  );
};

export default Swap;
