import React from 'react';
import { CreatorComponent } from './CreatorComponent';
import { useObservableState } from '../../hooks/useObservableState';
import { selectedNetworkSubj, selectedSigner$ } from '../../state/appState';

export const Creator = (): JSX.Element => {
  const selectedSigner = useObservableState(selectedSigner$);
  const network = useObservableState(selectedNetworkSubj);

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
