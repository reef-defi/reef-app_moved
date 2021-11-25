import { Pool, reefTokenWithAmount, Token } from '@reef-defi/react-lib';
import { useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';

const { parseUnits, formatEther } = utils;

export interface TokenWithPrice extends Token {
  price: ValueWithStatus<number>;
  balanceValue: ValueWithStatus<number>;
}

export enum ValueStatus {
  LOADING= 'LOADING',
  NO_DATA = 'NO_DATA'
}

export type ValueWithStatus<T> = T | ValueStatus;

// eslint-disable-next-line no-prototype-builtins
export const isValueWithStatusSet = (priceValue: ValueWithStatus<any>): boolean => !ValueStatus.hasOwnProperty(priceValue);

const calculateBalanceValue = (price: ValueWithStatus<number>, token: Token): ValueWithStatus<number> => {
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
  if (reefTokenPool.token1.address.toLowerCase() === reefAddress.toLowerCase()) {
    reefReserve = parseInt(reefTokenPool.reserve1, 10);
    tokenReserve = parseInt(reefTokenPool.reserve2, 10);
  } else {
    reefReserve = parseInt(reefTokenPool.reserve2, 10);
    tokenReserve = parseInt(reefTokenPool.reserve1, 10);
  }
  return { reefReserve, tokenReserve };
};

const findReefTokenPool = (pools: Pool[], reefAddress: string, token: Token): Pool | undefined => pools.find((pool) => (pool.token1.address.toLowerCase() === reefAddress.toLowerCase() && pool.token2.address.toLowerCase() === token.address.toLowerCase()) || (pool.token2.address.toLowerCase() === reefAddress.toLowerCase() && pool.token1.address.toLowerCase() === token.address.toLowerCase()));

const calculateTokenPrice = (token: Token, pools: Pool[], reefPrice: ValueWithStatus<number>): ValueWithStatus<number> => {
  if (!isValueWithStatusSet(reefPrice)) {
    return reefPrice;
  }
  const { address: reefAddress } = reefTokenWithAmount();
  let ratio: number;
  if (token.address.toLowerCase() !== reefAddress.toLowerCase()) {
    const reefTokenPool = findReefTokenPool(pools, reefAddress, token);
    if (reefTokenPool) {
      const { reefReserve, tokenReserve } = getReefTokenPoolReserves(reefTokenPool, reefAddress);
      ratio = reefReserve / tokenReserve;
      return ratio * (reefPrice as number);
    }
    return ValueStatus.NO_DATA;
  }
  return reefPrice || ValueStatus.NO_DATA;
};

export const useSignerTokenBalances = (tokens: ValueWithStatus<Token[]>, pools: Pool[], reefPrice: ValueWithStatus<number>): ValueWithStatus<TokenWithPrice[]> => {
  const [balances, setBalances] = useState<ValueWithStatus<TokenWithPrice[]>>(ValueStatus.LOADING);
  useEffect(() => {
    if (!isValueWithStatusSet(tokens)) {
      setBalances(tokens as ValueWithStatus<TokenWithPrice[]>);
      return;
    }
    if (!pools.length || !isValueWithStatusSet(reefPrice)) {
      setBalances((tokens as Token[]).map((tkn) => {
        const stat = !isValueWithStatusSet(reefPrice) ? reefPrice : ValueStatus.LOADING;
        return { ...tkn, balanceValue: stat, price: stat } as TokenWithPrice;
      }));
      return;
    }

    const bal = (tokens as Token[]).map((token: Token) => {
      const price = calculateTokenPrice(token, pools, reefPrice);
      const balanceValue = calculateBalanceValue(price, token);
      return { ...token, price, balanceValue };
    });
    setBalances(bal);
  }, [tokens, pools, reefPrice]);
  return balances;
};
