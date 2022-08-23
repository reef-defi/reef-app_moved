import React, { useMemo, useState, useEffect } from 'react';
import {
  appState, hooks, ReefSigner, Components,
} from '@reef-defi/react-lib';
import { faLink } from '@fortawesome/free-solid-svg-icons';
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

  useEffect(() => {
    if (!isBound) setOpen(true);
  }, [isBound]);

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

      {
        !isOpen
        && (
        <Uik.Tooltip
          className="evm-bind__btn-wrapper"
          text="Bind EVM Address"
          position="left"
          delay={0}
        >
          <button
            title="Bind EVM Address"
            className={`
              evm-bind__open-popup-btn
              ${isOpen ? 'evm-bind__open-popup-btn--open' : ''}
            `}
            type="button"
            onClick={() => setOpen(true)}
          >
            <Uik.Icon icon={faLink} />
          </button>
        </Uik.Tooltip>
        )
      }
    </div>
  );
};

export default Bind;
