import React from 'react';
import { Components, Token } from '@reef-defi/react-lib';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { useGetSigner } from '../../hooks/useGetSigner';
import { POOLS_URL } from '../../urls';
import { reloadTokens } from '../../store/actions/tokens';
import { notify } from '../../utils/utils';
import { currentNetwork } from '../../environment';

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
  const reload = (): void => {
    dispatch(reloadTokens());
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
        notify={notify}
        reloadTokens={reload}
      />
    )
  );
};

export default RemoveLiquidity;
