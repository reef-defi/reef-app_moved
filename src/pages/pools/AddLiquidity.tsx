import React, { useEffect, useState } from 'react';

import {
  Components, rpc, TokenWithAmount, hooks, appState, Token, Network, ReefSigner, createEmptyTokenWithAmount, reefTokenWithAmount,
} from '@reef-defi/react-lib';
import { useHistory, useParams } from 'react-router-dom';
import { POOLS_URL } from '../../urls';

interface UrlParams {
  address1: string;
  address2: string;
}

// const findToken = (address: string): TokenWithAmount => {
//   const tokensCombined: Token[]|undefined = hooks.useObservableState(appState.allAvailableSignerTokens$);
// }

const AddLiqudity = (): JSX.Element => {
  const history = useHistory();
  const { address1, address2 } = useParams<UrlParams>();
  const [token1, setToken1] = useState<TokenWithAmount>(createEmptyTokenWithAmount());
  const [token2, setToken2] = useState<TokenWithAmount>(createEmptyTokenWithAmount());
  const signer: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);
  const tokensCombined: Token[]|undefined = hooks.useObservableState(appState.allAvailableSignerTokens$);
  const network: Network|undefined = hooks.useObservableState(appState.selectedNetworkSubj);

  useEffect(() => {
    const reset = async (): Promise<void> => {
      let tkn1 = tokensCombined?.find((t) => t.address === address1);
      if (!tkn1 && signer) {
        tkn1 = (await rpc.loadToken(address1, signer?.signer, '') || undefined);
      }
      console.log(tkn1)
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

  const back = (): void => history.goBack();
  /* const onAddLiqUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateResetSigners(txState, updateActions);
  }; */

  return signer && network ? (
    <Components.AddLiquidity
      tokens={tokensCombined || []}
      signer={signer}
      network={network}
      tokenValue1={token1}
      tokenValue2={token2}
      back={back}
      // onTxUpdate={onAddLiqUpdate}
    />
  ) : (<div />);
};

export default AddLiqudity;
