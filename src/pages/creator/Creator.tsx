import React from 'react';
import { utils } from '@reef-defi/react-lib';
import { CreatorComponent } from './CreatorComponent';
import { useObservableState } from '../../hooks/useObservableState';
import { selectedNetworkSubj, selectedSigner$ } from '../../state/appState';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';

export const Creator = (): JSX.Element => {
  const selectedSigner = useObservableState(selectedSigner$);
  const network = useObservableState(selectedNetworkSubj);

  const onCreatorTxUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateReloadSignerBalances(txState, updateActions);
  };

  return (
    <>
      {network && <CreatorComponent signer={selectedSigner} onTxUpdate={onCreatorTxUpdate} network={network} />}
    </>
  );
};
