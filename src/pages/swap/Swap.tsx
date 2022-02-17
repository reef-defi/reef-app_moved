import React from 'react';

import {
  appState, Components, hooks, Network, ReefSigner, Token,
} from '@reef-defi/react-lib';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const tokensCombined: Token[]|undefined = hooks.useObservableState(appState.allAvailableSignerTokens$);
  const network: Network|undefined = hooks.useObservableState(appState.selectedNetworkSubj);

  const selectedAccount: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);

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
    />
  ) : (<div />);
};

export default Swap;
