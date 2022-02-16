import React from 'react';
import { appState, hooks } from '@reef-defi/react-lib';
import { CreatorComponent } from './CreatorComponent';

export const Creator = (): JSX.Element => {
  const selectedSigner = hooks.useObservableState(appState.selectedSigner$);
  const network = hooks.useObservableState(appState.selectedNetworkSubj);

  /* const onCreatorTxUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateResetSigners(txState, updateActions);
  }; */

  return (
    <>
      {network && (
      <CreatorComponent
        signer={selectedSigner}
                                    // onTxUpdate={onCreatorTxUpdate}
        network={network}
      />
      )}
    </>
  );
};
