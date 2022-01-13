import React from 'react';

import { Components, utils } from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { POOLS_URL } from '../../urls';
import { notify } from '../../utils/utils';
import { currentNetwork } from '../../environment';
import { useObservableState } from '../../hooks/useObservableState';
import { selectedSigner$ } from '../../state/accountState';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';
import { allAvailableSignerTokens$ } from '../../state/tokenState';

const AddLiqudity = (): JSX.Element => {
  const history = useHistory();
  const signer = useObservableState(selectedSigner$);
  const tokensCombined = useObservableState(allAvailableSignerTokens$);

  const back = (): void => history.push(POOLS_URL);
  const onAddLiqUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateReloadSignerBalances(txState, updateActions);
  };

  return signer ? (
    <Components.AddLiquidityComponent
      tokens={tokensCombined || []}
      signer={signer}
      network={currentNetwork}
      back={back}
      onTxUpdate={onAddLiqUpdate}
    />
  ) : (<div />);
};

export default AddLiqudity;
