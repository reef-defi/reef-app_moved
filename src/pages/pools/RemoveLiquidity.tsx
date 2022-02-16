import React from 'react';
import { Components, Token, appState, hooks } from '@reef-defi/react-lib';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { POOLS_URL } from '../../urls';

const { RemoveLiquidityComponent } = Components;

interface UrlParams {
  address1: string;
  address2: string;
}

const findToken = (address: string, tokens: Token[] = []): Token|undefined => tokens.find((token) => token.address === address);

const RemoveLiquidity = (): JSX.Element => {
  const history = useHistory();
  const { address1, address2 } = useParams<UrlParams>();
  const tokens = hooks.useObservableState(appState.allAvailableSignerTokens$);
  const network = hooks.useObservableState(appState.selectedNetworkSubj);

  const signer = hooks.useObservableState(appState.selectedSigner$);
  const token1 = findToken(address1, tokens);
  const token2 = findToken(address2, tokens);

  const back = (): void => history.push(POOLS_URL);
  /* const onRemoveLiqUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateResetSigners(txState, updateActions);
  }; */

  return (
    <>
      {(!token1 || !token2)
      && (<Redirect to={POOLS_URL} />)}
      { token1 && token2 && network
     && (
     <RemoveLiquidityComponent
       token1={token1}
       token2={token2}
       signer={signer}
       network={network}
       back={back}
       // onTxUpdate={onRemoveLiqUpdate}
     />
     )}

    </>
  );
};

export default RemoveLiquidity;
