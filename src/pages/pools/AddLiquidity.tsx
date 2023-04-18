import {
  appState, Components,
  hooks, Network,
  ReefSigner, store, Token,
} from '@reef-defi/react-lib';
import React, { useContext, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TokenContext from '../../context/TokenContext';
import TokenPricesContext from '../../context/TokenPricesContext';
import { addressReplacer, ADD_LIQUIDITY_URL } from '../../urls';
import { notify } from '../../utils/utils';

const { AddLiquidity } = Components;
interface UrlParams {
  address1: string;
  address2: string;
}

const AddPoolLiquidity = (): JSX.Element => {
  const { address1, address2 } = useParams<UrlParams>();
  const history = useHistory();
  const { tokens } = useContext(TokenContext);
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

  const selectToken1 = (token: Token): void => {
    dispatch(store.setToken1Action(token));
    history.push(addressReplacer(ADD_LIQUIDITY_URL, token.address, address2));
  };
  const selectToken2 = (token: Token): void => {
    dispatch(store.setToken2Action(token));
    history.push(addressReplacer(ADD_LIQUIDITY_URL, address1, token.address));
  };
  const onAddLiquidity = hooks.onAddLiquidity({
    state,
    network,
    signer: signer || undefined,
    batchTxs: network?.name === 'mainnet',
    dispatch,
    notify,
    updateTokenState: async () => {}, // eslint-disable-line
  });
  if (!signer) {
    return <div />;
  }
  return (
    <AddLiquidity
      signer={signer}
      state={state}
      tokens={tokens}
      actions={{
        selectToken1,
        selectToken2,
        onAddLiquidity,
        back: history.goBack,
        setPercentage: async () => {}, // eslint-disable-line
        onAddressChange: async () => {}, // eslint-disable-line
        setSettings: (settings) => dispatch(store.setSettingsAction(settings)),
        setToken1Amount: (amount) => dispatch(store.setToken1AmountAction(amount)),
        setToken2Amount: (amount) => dispatch(store.setToken2AmountAction(amount)),
      }}
    />
  );
};

export default AddPoolLiquidity;
