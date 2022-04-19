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

type State = 'Init' | 'Loading' | 'Success';


interface FindToken {
  address?: string;
  signer: ReefSigner;
  tokensCombined?: Token[];
  defaultAmountValue: TokenWithAmount;
}
// if address or token list or token in list or on rpc does not exist return default values
// else combine data with default amount values 
const findToken = async ({signer, address, tokensCombined, defaultAmountValue=createEmptyTokenWithAmount()}: FindToken): Promise<TokenWithAmount> => {
  if (!address || !tokensCombined) {
    return defaultAmountValue;
  };

  const existingToken = tokensCombined
    .find(((token) => token.address.toLowerCase() === address.toLowerCase()));

  if (existingToken) {
    return {...defaultAmountValue, ...existingToken, isEmpty: false};
  }

  const promisedToken = await rpc.loadToken(address, signer.signer);
  if (promisedToken) {
    return {...defaultAmountValue, ...promisedToken, isEmpty: false};
  }

  return defaultAmountValue;
}

const AddLiqudity = (): JSX.Element => {
  const history = useHistory();
  const { address1, address2 } = useParams<UrlParams>();
  const [state, setState] = useState<State>('Init');
  const [token1, setToken1] = useState<TokenWithAmount>(reefTokenWithAmount());
  const [token2, setToken2] = useState<TokenWithAmount>(createEmptyTokenWithAmount());
  const signer: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);
  const tokensCombined: Token[]|undefined = hooks.useObservableState(appState.allAvailableSignerTokens$);
  const network: Network|undefined = hooks.useObservableState(appState.selectedNetworkSubj);


  useEffect(() => {
    const reset = async (): Promise<void> => {
      if (!tokensCombined || state !== 'Init') {
        return;
      }

      setState('Loading')
      await findToken({
        signer,
        tokensCombined,
        address: address1,
        defaultAmountValue: reefTokenWithAmount(),
      })
        .then(setToken1)
        .catch((e) => console.error(`Token: ${address1} was not found`));

      await findToken({
        signer,
        tokensCombined,
        address: address2,
        defaultAmountValue: createEmptyTokenWithAmount(),
      })
        .then(setToken2)
        .catch((e) => console.error(`Token: ${address2} was not found`));

      setState('Success')
    };
    reset();
  }, [address2, address1, tokensCombined]);

  const back = (): void => history.goBack();

  return signer && network && state === 'Success' ? (
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
