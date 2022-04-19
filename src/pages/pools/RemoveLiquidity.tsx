import React from 'react';
import {
  Components, Token, appState, hooks, Network, ReefSigner,
} from '@reef-defi/react-lib';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { POOLS_URL } from '../../urls';
import { useTokensFinder } from '../../hooks/useTokensFinder';

const { RemoveLiquidityComponent } = Components;

interface UrlParams {
  address1: string;
  address2: string;
}


const RemoveLiquidity = (): JSX.Element => {
  const history = useHistory();
  const { address1, address2 } = useParams<UrlParams>();
  const tokens: Token[]|undefined = hooks.useObservableState(appState.allAvailableSignerTokens$);
  const network: Network|undefined = hooks.useObservableState(appState.selectedNetworkSubj);
  const signer: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);

  const [token1, token2, state] = useTokensFinder({ address1, address2, tokens, signer});
  const back = (): void => history.push(POOLS_URL);
  /* const onRemoveLiqUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateResetSigners(txState, updateActions);
  }; */

  return (
    <>
      {network && signer && state === 'Success'
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
