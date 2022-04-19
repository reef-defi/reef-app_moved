import React from "react";

import {
  Components,
  hooks,
  appState,
  Token,
  Network,
  ReefSigner,
} from "@reef-defi/react-lib";
import { useHistory, useParams } from "react-router-dom";
import { useTokensFinder } from "./../../hooks/useTokensFinder";

interface UrlParams {
  address1: string;
  address2: string;
}

const AddLiqudity = (): JSX.Element => {
  const history = useHistory();
  const { address1, address2 } = useParams<UrlParams>();

  const signer: ReefSigner | undefined = hooks.useObservableState(
    appState.selectedSigner$
  );
  const tokensCombined: Token[] | undefined = hooks.useObservableState(
    appState.allAvailableSignerTokens$
  );
  const network: Network | undefined = hooks.useObservableState(
    appState.selectedNetworkSubj
  );

  const [token1, token2, state] = useTokensFinder({
    address1,
    address2,
    signer,
    tokens: tokensCombined,
  });

  const back = (): void => history.goBack();

  return signer && network && state === "Success" ? (
    <Components.AddLiquidity
      tokens={tokensCombined || []}
      signer={signer}
      network={network}
      tokenValue1={token1}
      tokenValue2={token2}
      back={back}
      // onTxUpdate={onAddLiqUpdate}
    />
  ) : (
    <div />
  );
};

export default AddLiqudity;
