import React, { useEffect, useState } from 'react';

import {
  Components, TokenWithAmount, utils, rpc,
} from '@reef-defi/react-lib';
import { useHistory, useParams } from 'react-router-dom';
import { POOLS_URL } from '../../urls';
import { useObservableState } from '../../hooks/useObservableState';
import { selectedSigner$ } from '../../state/accountState';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';
import { allAvailableSignerTokens$ } from '../../state/tokenState';
import { selectedNetworkSubj } from '../../state/providerState';

interface UrlParams {
  address1: string;
  address2: string;
}
const AddLiqudity = (): JSX.Element => {
  const history = useHistory();
  const { address1, address2 } = useParams<UrlParams>();
  const [token1, setToken1] = useState<TokenWithAmount>();
  const [token2, setToken2] = useState<TokenWithAmount>();
  const signer = useObservableState(selectedSigner$);
  const tokensCombined = useObservableState(allAvailableSignerTokens$);
  const network = useObservableState(selectedNetworkSubj);

  useEffect(() => {
    const reset = async (): Promise<void> => {
      let tkn1 = tokensCombined?.find((t) => t.address === address1);
      if (!tkn1 && signer) {
        tkn1 = (await rpc.loadToken(address1, signer?.signer, '') || undefined);
      }
      setToken1(tkn1 ? {
        ...tkn1,
        amount: '',
        price: 0,
        isEmpty: false,
      } : undefined);

      let tkn2 = tokensCombined?.find((t) => t.address === address2);
      if (!tkn2 && signer) {
        tkn2 = (await rpc.loadToken(address2, signer?.signer, '') || undefined);
      }
      setToken2(tkn2 ? {
        ...tkn2,
        amount: '',
        price: 0,
        isEmpty: false,
      } : undefined);
    };
    reset();
  }, [address2, address1, tokensCombined]);

  const back = (): void => history.push(POOLS_URL);
  const onAddLiqUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateReloadSignerBalances(txState, updateActions);
  };

  return signer && network ? (
    <Components.AddLiquidityComponent1
      tokens={tokensCombined || []}
      signer={signer}
      network={network}
      tokenValue1={token1}
      tokenValue2={token2}
      back={back}
      onTxUpdate={onAddLiqUpdate}
    />
  ) : (<div />);
};

export default AddLiqudity;
