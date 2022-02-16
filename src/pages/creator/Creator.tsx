import React from 'react';
import { appState } from '@reef-defi/react-lib';
import { CreatorComponent } from './CreatorComponent';
import { useObservableState } from '../../hooks/useObservableState';

export const Creator = (): JSX.Element => {
  const selectedSigner = useObservableState(appState.selectedSigner$);
  const network = useObservableState(appState.selectedNetworkSubj);

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
