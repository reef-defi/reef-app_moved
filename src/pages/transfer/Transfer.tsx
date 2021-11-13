import { availableNetworks, Components, TokenWithAmount } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { TransferComponent } from './TransferComponent';
import { useGetSigner } from '../../hooks/useGetSigner';
import { useLoadSignerTokens } from '../../hooks/useLoadSignerTokens';
import { useReefPrice } from '../../hooks/useReefPrice';
import { isValueWithStatusSet, TokenWithPrice, useSignerTokenBalances } from '../../hooks/useSignerTokenBalances';

const { Loading } = Components;

export const Transfer = (): JSX.Element => {
  const { pools } = useAppSelector((state) => state.pools);
  const selectedSigner = useGetSigner();
  const signerTokens = useLoadSignerTokens(selectedSigner);
  const reefPrice = useReefPrice();
  const signerTokenBalances = useSignerTokenBalances(signerTokens, pools, reefPrice);
  const [token, setToken] = useState<TokenWithAmount>();
  useEffect(() => {
    if (isValueWithStatusSet(signerTokenBalances) && signerTokenBalances.length) {
      const signerTokenBalance = (signerTokenBalances as TokenWithPrice[])[0];
      if (isValueWithStatusSet(signerTokenBalance.balanceValue)) {
        const tkn = { ...signerTokenBalance, amount: '0', isEmpty: false } as TokenWithAmount;
        setToken(tkn);
        console.log('TTTss', tkn);
      }
    }
  }, [signerTokenBalances]);

  return (
    <>
      {!token && <Loading.Loading />}
      {token && selectedSigner
          && <TransferComponent tokens={signerTokenBalances as TokenWithPrice[]} network={availableNetworks.mainnet} from={selectedSigner} token={token} />}
    </>
  );
};
