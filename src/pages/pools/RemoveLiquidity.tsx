import React from 'react';
import { Components, Token, utils } from '@reef-defi/react-lib';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { POOLS_URL } from '../../urls';
import { currentNetwork } from '../../environment';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';
import { useObservableState } from '../../hooks/useObservableState';
import { selectedSigner$ } from '../../state/accountState';
import { allAvailableSignerTokens$ } from '../../state/tokenState';

const { RemoveLiquidityComponent } = Components;

interface UrlParams {
  address1: string;
  address2: string;
}

const findToken = (address: string, tokens: Token[] = []): Token|undefined => tokens.find((token) => token.address === address);

const RemoveLiquidity = (): JSX.Element => {
  const history = useHistory();
  const { address1, address2 } = useParams<UrlParams>();
  const tokens = useObservableState(allAvailableSignerTokens$);

  const signer = useObservableState(selectedSigner$);
  const token1 = findToken(address1, tokens);
  const token2 = findToken(address2, tokens);

  const back = (): void => history.push(POOLS_URL);
  const onRemoveLiqUpdate = (txState: utils.TxStatusUpdate): void => {
    const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE, UpdateDataType.ACCOUNT_TOKENS];
    const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
    onTxUpdateReloadSignerBalances(txState, updateActions);
  };

  return (!token1 || !token2
    ? <Redirect to={POOLS_URL} />
    : (
      <RemoveLiquidityComponent
        token1={token1}
        token2={token2}
        signer={signer}
        network={currentNetwork}
        back={back}
        onTxUpdate={onRemoveLiqUpdate}
      />
    )
  );
};

export default RemoveLiquidity;
