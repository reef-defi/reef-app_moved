import { availableNetworks, Components, TokenWithAmount } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { TransferComponent } from './TransferComponent';
import { useGetSigner } from '../../hooks/useGetSigner';
import { useLoadSignerTokens } from '../../hooks/useLoadSignerTokens';
import { useReefPrice } from '../../hooks/useReefPrice';
import {
  isValueWithStatusSet,
  TokenWithPrice,
  useSignerTokenBalances,
  ValueStatus,
  ValueWithStatus,
} from '../../hooks/useSignerTokenBalances';

const { Loading } = Components;

export const Transfer = (): JSX.Element => {
  const { pools } = useAppSelector((state) => state.pools);
  const selectedSigner = useGetSigner();
  const signerTokens = useLoadSignerTokens(selectedSigner);
  const reefPrice = useReefPrice();
  const signerTokenBalances = useSignerTokenBalances(signerTokens, pools, reefPrice);
  const [token, setToken] = useState<ValueWithStatus<TokenWithAmount>>(ValueStatus.LOADING);
  useEffect(() => {
    if (isValueWithStatusSet(signerTokenBalances)) {
      if (!signerTokenBalances.length) {
        setToken(ValueStatus.NO_DATA);
        return;
      }
      const signerTokenBalance = (signerTokenBalances as TokenWithPrice[])[0];
      if (isValueWithStatusSet(signerTokenBalance.balanceValue)) {
        const tkn = { ...signerTokenBalance, amount: '', isEmpty: false } as TokenWithAmount;
        setToken(tkn);
        return;
      }
      setToken(signerTokenBalance.balanceValue as ValueStatus);
      return;
    }
    setToken(signerTokenBalances as ValueStatus);
  }, [signerTokenBalances]);

  return (
    <>
      {!isValueWithStatusSet(token) && token === ValueStatus.LOADING && <Loading.Loading />}
      {!isValueWithStatusSet(token) && token === ValueStatus.NO_DATA && <div>No tokens for transaction.</div>}
      { isValueWithStatusSet(token) && selectedSigner
          && <TransferComponent tokens={signerTokenBalances as TokenWithPrice[]} network={availableNetworks.mainnet} from={selectedSigner} token={token as TokenWithAmount} />}
    </>
  );
};
