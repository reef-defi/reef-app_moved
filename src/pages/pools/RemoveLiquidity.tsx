import React from 'react';
import { Components, Token, utils } from '@reef-defi/react-lib';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { useGetSigner } from '../../hooks/useGetSigner';
import { POOLS_URL } from '../../urls';
import { currentNetwork } from '../../environment';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';

const { RemoveLiquidityComponent } = Components;

interface UrlParams {
  address1: string;
  address2: string;
}

const findToken = (address: string, tokens: Token[]): Token|undefined => tokens.find((token) => token.address === address);

const RemoveLiquidity = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { address1, address2 } = useParams<UrlParams>();
  const { tokens } = useAppSelector((state) => state.tokens);

  const signer = useGetSigner();
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
