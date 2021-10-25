import { Pool, reefTokenWithAmount, Token } from '@reef-defi/react-lib';
import { useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';

const { parseUnits, formatEther } = utils;

export interface TokenWithPrice extends Token {
  price: number | ValueWithStatus;
  balanceValue: number | ValueWithStatus;
}

export enum ValueWithStatus {
  LOADING= 'LOADING',
  NO_DATA = 'NO_DATA'
}

// eslint-disable-next-line no-prototype-builtins
export const isValueWithStatusSet = (priceValue: number | ValueWithStatus): boolean => !ValueWithStatus.hasOwnProperty(priceValue);

const calculateBalanceValue = (price: number | ValueWithStatus, token: Token): number | ValueWithStatus => {
  // eslint-disable-next-line no-prototype-builtins
  if (!isValueWithStatusSet(price)) {
    return price;
  }
  const priceBN = BigNumber.from(parseUnits(price.toString()));
  const balanceFixed = parseInt(formatEther(token.balance.toString()), 10);
  return parseFloat(formatEther(priceBN.mul(BigNumber.from(balanceFixed)).toString()));
};

const getReefTokenPoolReserves = (reefTokenPool: Pool, reefAddress: string): {reefReserve:number, tokenReserve: number} => {
  let reefReserve: number;
  let tokenReserve: number;
  if (reefTokenPool.token1.address === reefAddress) {
    reefReserve = parseInt(reefTokenPool.reserve1, 10);
    tokenReserve = parseInt(reefTokenPool.reserve2, 10);
  } else {
    reefReserve = parseInt(reefTokenPool.reserve2, 10);
    tokenReserve = parseInt(reefTokenPool.reserve1, 10);
  }
  return { reefReserve, tokenReserve };
};

const findReefTokenPool = (pools: Pool[], reefAddress: string, token: Token): Pool | undefined => pools.find((pool) => (pool.token1.address === reefAddress && pool.token2.address === token.address) || (pool.token2.address === reefAddress && pool.token1.address === token.address));

const calculateTokenPrice = (token: Token, pools: Pool[], reefPrice: number | ValueWithStatus): number | ValueWithStatus => {
  if (!isValueWithStatusSet(reefPrice)) {
    return reefPrice;
  }
  const { address: reefAddress } = reefTokenWithAmount();
  let ratio: number;
  if (token.address !== reefAddress) {
    const reefTokenPool = findReefTokenPool(pools, reefAddress, token);
    if (reefTokenPool) {
      const { reefReserve, tokenReserve } = getReefTokenPoolReserves(reefTokenPool, reefAddress);
      ratio = tokenReserve / reefReserve;
      return ratio * (reefPrice as number);
    }
    return ValueWithStatus.NO_DATA;
  }
  return reefPrice || ValueWithStatus.NO_DATA;
};

export const useSignerTokenBalances = (tokens: Token[], pools: Pool[], reefPrice: number | ValueWithStatus): TokenWithPrice[] => {
  const [balances, setBalances] = useState<TokenWithPrice[]>([]);
  useEffect(() => {
    if (!tokens.length) {
      setBalances([]);
      return;
    }
    if (!pools.length || !isValueWithStatusSet(reefPrice)) {
      setBalances(tokens.map((tkn) => {
        const stat = !isValueWithStatusSet(reefPrice) ? reefPrice : ValueWithStatus.LOADING;
        return { ...tkn, balanceValue: stat, price: stat } as TokenWithPrice;
      }));
      return;
    }

    const bal = tokens.map((token) => {
      const price = calculateTokenPrice(token, pools, reefPrice);
      const balanceValue = calculateBalanceValue(price, token);
      return { ...token, price, balanceValue };
    });
    setBalances(bal);
  }, [tokens, pools, reefPrice]);
  return balances;
};
