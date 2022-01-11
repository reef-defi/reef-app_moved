import React from 'react';

import { Components, utils } from '@reef-defi/react-lib';
import { currentNetwork } from '../../environment';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';
import { useObservableState } from '../../hooks/useObservableState';
import { allAvailableSignerTokens$ } from '../../state/tokenState';
import { selectedSigner$ } from '../../state/accountState';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const tokensCombined = useObservableState(allAvailableSignerTokens$);

  const selectedAccount = useObservableState(selectedSigner$);

  const onSwapTxUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateReloadSignerBalances(txState, updateActions);
  };

  return selectedAccount ? (
    <SwapComponent
      tokens={tokensCombined || []}
      account={selectedAccount}
      network={{ ...currentNetwork }}
      onTxUpdate={onSwapTxUpdate}
    />
  ) : (<div />);
};

export default Swap;
