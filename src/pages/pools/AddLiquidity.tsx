import React, { useContext } from 'react';

import {
  Components,
  hooks,
  appState,
  Token,
  Network,
  ReefSigner,
  defaultOptions,
  TokenSelector,
} from '@reef-defi/react-lib';
import { useHistory, useParams } from 'react-router-dom';
import { useTokensFinder } from '../../hooks/useTokensFinder';
import {notify} from "../../utils/utils";
import OptionContext from '../../context/OptionContext';
import { addressReplacer, ADD_LIQUIDITY_URL } from '../../urls';

interface UrlParams {
  address1: string;
  address2: string;
}

const AddLiqudity = (): JSX.Element => {
  const { address1, address2 } = useParams<UrlParams>();
  const history = useHistory();
  // const options = useContext(OptionContext);

  const signer: ReefSigner | undefined = hooks.useObservableState(
    appState.selectedSigner$,
  );
  const tokensCombined: Token[] | undefined = hooks.useObservableState(
    appState.allAvailableSignerTokens$,
  );
  const network: Network | undefined = hooks.useObservableState(
    appState.selectedNetworkSubj,
  );

  const [token1, token2, state] = useTokensFinder({
    address1,
    address2,
    signer,
    tokens: tokensCombined,
  });

  const onTokenSelect = (address: string, token: TokenSelector='token1') => history.push(
    token === 'token1'
      ? addressReplacer(ADD_LIQUIDITY_URL, address, address2)
      : addressReplacer(ADD_LIQUIDITY_URL, address1, address)
  );

  return signer && network && state === 'Success' ? (
    <Components.AddLiquidity
      tokens={tokensCombined || []}
      signer={signer}
      network={network}
      tokenValue1={token1}
      tokenValue2={token2}
      options={{
        back: history.goBack,
        notify,
        onTokenSelect
      }}
    />
  ) : (
    <div />
  );
};

export default AddLiqudity;
