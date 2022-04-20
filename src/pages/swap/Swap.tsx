import React from 'react';

import {
  appState, Components, hooks, Network, ReefSigner, Token,
} from '@reef-defi/react-lib';
import { useParams } from 'react-router-dom';
import { useTokensFinder } from '../../hooks/useTokensFinder';
import { UrlAddressParams } from '../../urls';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const network: Network|undefined = hooks.useObservableState(appState.selectedNetworkSubj);
  const signer: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);
  const tokens: Token[]|undefined = hooks.useObservableState(appState.allAvailableSignerTokens$);

  const { address1, address2 } = useParams<UrlAddressParams>();

  const [token1, token2, state] = useTokensFinder({
    address1,
    address2,
    tokens,
    signer,
  });

  if (state !== 'Success') {
    return <div>Loading...</div>;
  }

  return (
    <SwapComponent
      buyToken={token2}
      sellToken={token1}
      tokens={tokens || []}
      account={signer}
      network={{ ...network }}
    />
  );
};

export default Swap;
