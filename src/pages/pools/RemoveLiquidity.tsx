import {
  appState,
  Components,
  hooks,
  Network,
  ReefSigner,
  store,
} from "@reef-defi/react-lib";
import React, { useContext, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import TokenContext from "../../context/TokenContext";
import { notify } from "../../utils/utils";

const { RemoveLiquidityComponent } = Components;

interface UrlParams {
  address1: string;
  address2: string;
}

const RemoveLiquidity = (): JSX.Element => {
  const history = useHistory();
  const tokens = useContext(TokenContext);
  const { address1, address2 } = useParams<UrlParams>();

  const network: Network | undefined = hooks.useObservableState(
    appState.currentNetwork$
  );
  const signer: ReefSigner | undefined = hooks.useObservableState(
    appState.selectedSigner$
  );

  const [state, dispatch] = useReducer(
    store.removeLiquidityReducer,
    store.initialRemoveLiquidityState
  );

  hooks.useRemoveLiquidity({
    address1,
    address2,
    dispatch,
    state,
    tokens,
    network,
    signer,
  });

  const onRemoveLiquidity = hooks.onRemoveLiquidity({
    state,
    dispatch,
    network,
    signer,
    notify,
  });

  if (!signer) {
    return <div />;
  }
  return (
    <RemoveLiquidityComponent
      state={state}
      actions={{
        onRemoveLiquidity,
        back: history.goBack,
        setSettings: (settings) => dispatch(store.setSettingsAction(settings)),
        setPercentage: (percentage) =>
          dispatch(store.setPercentageAction(percentage)),
      }}
    />
  );
};

export default RemoveLiquidity;
