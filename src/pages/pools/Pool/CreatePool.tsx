import {
  appState,
  Components,
  hooks,
  store,
  Token,
} from '@reef-defi/react-lib';
import React, { useContext, useReducer, useState } from 'react';
import TokenContext from '../../../context/TokenContext';
import TokenPricesContext from '../../../context/TokenPricesContext';
import { notify } from '../../../utils/utils';
import '../../../common/overlay-swap.css';
import './create-pool.css';

const { Provide, OverlayAction, Finalizing } = Components;

export interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

const CreatePool = ({
  isOpen,
  onClose,
}: Props): JSX.Element => {
  const [address1, setAddress1] = useState('0x');
  const [address2, setAddress2] = useState('0x');

  const [finalized, setFinalized] = useState(true);

  const { tokens } = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);

  const signer = hooks.useObservableState(
    appState.selectedSigner$,
  );
  const network = hooks.useObservableState(
    appState.currentNetwork$,
  );

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
    batchTxs: network?.name === 'mainnet',
    dispatch: provideDispatch,
    notify,
    updateTokenState: async () => {}, // eslint-disable-line
    onSuccess: () => setFinalized(false),
    onFinalized: () => {
      setFinalized(true);
      if (onClose) onClose();
    },
  });

  const onClosed = (): void => {
    setAddress1('0x');
    setAddress2('0x');
  };

  const onOpened = (): void => {
    const [, overlay] = document.querySelectorAll('.uik-dropdown__overlay');
    // @ts-ignore-next-line
    if (overlay) overlay.click();
  };

  return (
    <OverlayAction
      isOpen={isOpen}
      title="Create Pool"
      onClose={onClose}
      onClosed={onClosed}
      onOpened={onOpened}
      className="overlay-swap create-pool"
    >
      <div className="uik-pool-actions pool-actions">
        {
          finalized
            ? (
              <Provide
                state={provideState}
                tokens={tokens}
                actions={{
                  onAddLiquidity,
                  selectToken1: (token: Token): void => setAddress1(token.address),
                  selectToken2: (token: Token): void => setAddress2(token.address),
                  setPercentage: (amount: number) => provideDispatch(store.setPercentageAction(amount)),
                  setToken1Amount: (amount: string) => provideDispatch(store.setToken1AmountAction(amount)),
                  setToken2Amount: (amount: string) => provideDispatch(store.setToken2AmountAction(amount)),
                }}
                confirmText="Create Pool"
              />
            )
            : <Finalizing />
        }
      </div>
    </OverlayAction>
  );
};

export default CreatePool;
