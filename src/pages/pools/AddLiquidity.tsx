import React from "react"

import {availableNetworks, Components} from "@reef-defi/react-lib";
import { useAppDispatch, useAppSelector } from "../../store";
import { useGetSigner } from "../../hooks/useGetSigner";
import { useHistory } from "react-router-dom";
import { POOLS_URL } from "../../urls";
import { reloadTokens } from "../../store/actions/tokens";


const AddLiqudity = (): JSX.Element => {
  const history = useHistory();
  const signer = useGetSigner();
  const dispatch = useAppDispatch();
  const {tokens} = useAppSelector((state) => state.tokens);

  const back = (): void => history.push(POOLS_URL);
  const reload = (): void => {
    dispatch(reloadTokens());
  };

  return (
    <Components.AddLiquidityComponent 
      tokens={tokens}
      signer={signer}
      network={availableNetworks.mainnet}
      back={back}
      reloadTokens={reload}
      notify={((message, type) => {})}
    />
  );
}

export default AddLiqudity;