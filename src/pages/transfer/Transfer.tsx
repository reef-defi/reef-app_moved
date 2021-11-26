import { availableNetworks, Components, TokenWithAmount } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
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
import { currentNetwork } from '../../environment';

const { Loading } = Components;

export const Transfer = (): JSX.Element => {
  const { pools } = useAppSelector((state) => state.pools);
  const selectedSigner = useGetSigner();
  const signerTokens = useLoadSignerTokens(false, selectedSigner);
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
      if (!isValueWithStatusSet(signerTokenBalance.balanceValue) && isValueWithStatusSet(signerTokens)) {
        const sToken = signerTokens[0] as TokenWithPrice;
        const tkn = { ...sToken, amount: '', isEmpty: false } as TokenWithAmount;
        setToken(tkn);
        return;
      }
      setToken(signerTokenBalance.balanceValue as ValueStatus);
      return;
    }
    setToken(signerTokenBalances as ValueStatus);
  }, [signerTokenBalances, signerTokens]);

  return (
    <>
      {!isValueWithStatusSet(token) && token === ValueStatus.LOADING && <Loading.Loading />}
      {!isValueWithStatusSet(token) && token === ValueStatus.NO_DATA && <div>No tokens for transaction.</div>}
      { isValueWithStatusSet(token) && isValueWithStatusSet(signerTokenBalances) && selectedSigner
          && <TransferComponent tokens={signerTokenBalances as TokenWithPrice[]} network={currentNetwork} from={selectedSigner} token={token as TokenWithAmount} />}
    </>
  );
};
