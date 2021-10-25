import { Pool, reefTokenWithAmount, Token } from '@reef-defi/react-lib';
import { useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';

const { parseUnits, formatEther } = utils;

const calculateBalanceValue = (price: number, token: Token): number => {
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

const calculateTokenPrice = (token: Token, pools: Pool[], reefPrice: number): number => {
  const { address: reefAddress } = reefTokenWithAmount();
  let ratio: number;
  if (token.address !== reefAddress) {
    const reefTokenPool = findReefTokenPool(pools, reefAddress, token);
    if (reefTokenPool) {
      const { reefReserve, tokenReserve } = getReefTokenPoolReserves(reefTokenPool, reefAddress);
      ratio = tokenReserve / reefReserve;
      return ratio * reefPrice;
    }
    return 0;
  }
  return reefPrice;
};

export interface TokenWithPrice extends Token {
  price: number;
  balanceValue: number;
}

export const useSignerTokenBalances = (tokens: Token[], pools: Pool[], reefPrice: number): TokenWithPrice[] => {
  const [balances, setBalances] = useState<TokenWithPrice[]>([]);
  useEffect(() => {
    if (!tokens.length) {
      setBalances([]);
      return;
    }
    if (!pools.length || !reefPrice) {
      setBalances(tokens.map((tkn) => ({ ...tkn, balanceValue: -1, price: -1 } as TokenWithPrice)));
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
