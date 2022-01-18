import React from 'react';

import { Components, utils } from '@reef-defi/react-lib';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';
import { useObservableState } from '../../hooks/useObservableState';
import { allAvailableSignerTokens$ } from '../../state/tokenState';
import { selectedSigner$ } from '../../state/accountState';
import { selectedNetworkSubj } from '../../state/providerState';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const tokensCombined = useObservableState(allAvailableSignerTokens$);
  const network = useObservableState(selectedNetworkSubj);

  const selectedAccount = useObservableState(selectedSigner$);

  const onSwapTxUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateReloadSignerBalances(txState, updateActions);
  };

  return selectedAccount && network ? (
    <SwapComponent
      tokens={tokensCombined || []}
      account={selectedAccount}
      network={{ ...network }}
      onTxUpdate={onSwapTxUpdate}
    />
  ) : (<div />);
};

export default Swap;
