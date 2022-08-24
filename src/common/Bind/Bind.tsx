import React, { useMemo, useState } from 'react';
import {
  appState, hooks, ReefSigner, Components,
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import './bind.css';
import { TxStatusUpdate } from '@reef-defi/react-lib/dist/utils';

const { EvmBindComponent } = Components;

const Bind = (): JSX.Element => {
  const selectedSigner: ReefSigner|undefined | null = hooks.useObservableState(appState.selectedSigner$);
  const accounts: ReefSigner[] | undefined | null = hooks.useObservableState(appState.signers$);

  const onTxUpdate = (state: TxStatusUpdate): void => {
    let updateActions: appState.UpdateAction[] = [];

    if (state.componentTxType === Components.EvmBindComponentTxType.BIND) {
      // bind
      if (state.addresses && state.addresses.length) {
        state.addresses.forEach((address) => {
          updateActions.push({
            address,
            type: appState.UpdateDataType.ACCOUNT_EVM_BINDING,
          } as appState.UpdateAction);
          updateActions.push({
            address,
            type: appState.UpdateDataType.ACCOUNT_NATIVE_BALANCE,
          } as appState.UpdateAction);
        });
      } else {
        updateActions = [{ type: appState.UpdateDataType.ACCOUNT_EVM_BINDING }, { type: appState.UpdateDataType.ACCOUNT_NATIVE_BALANCE }];
      }
    } else {
      // transaction
      updateActions = state.addresses && state.addresses.length
        ? state.addresses.map((address) => ({
          address,
          type: appState.UpdateDataType.ACCOUNT_NATIVE_BALANCE,
        } as appState.UpdateAction))
        : [{ type: appState.UpdateDataType.ACCOUNT_NATIVE_BALANCE }];
    }

    appState.onTxUpdateResetSigners(state, updateActions);
  };

  const isBound = useMemo(() => !selectedSigner || selectedSigner?.isEvmClaimed, [selectedSigner]);

  const [isOpen, setOpen] = useState(false);

  if (isBound || !selectedSigner || !accounts) return <div />;

  return (
    <div className="evm-bind">
      <Uik.Modal
        title="Register Ethereum VM Address"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <EvmBindComponent
          bindSigner={selectedSigner}
          onTxUpdate={onTxUpdate}
          signers={accounts}
        />
      </Uik.Modal>

      <div className="evm-bind__alert">
        <Uik.Alert
          type="info"
          text={`Account ${selectedSigner?.name} does not have an Ethereum VM address`}
        >
          <Uik.Button
            text="Register EVM Address"
            fill
            onClick={() => setOpen(true)}
          />
        </Uik.Alert>
      </div>
    </div>
  );
};

export default Bind;
