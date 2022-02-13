import React from 'react';

import { appState, Components } from '@reef-defi/react-lib';
import { useObservableState } from '../../hooks/useObservableState';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const tokensCombined = useObservableState(appState.allAvailableSignerTokens$);
  const network = useObservableState(appState.selectedNetworkSubj);

  const selectedAccount = useObservableState(appState.selectedSigner$);

  /* const onSwapTxUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateResetSigners(txState, updateActions);
  }; */

  return selectedAccount && network ? (
    <SwapComponent
      tokens={tokensCombined || []}
      account={selectedAccount}
      network={{ ...network }}
      // onTxUpdate={onSwapTxUpdate}
    />
  ) : (<div />);
};

export default Swap;
