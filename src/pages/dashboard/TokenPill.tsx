import {
  Pool, reefTokenWithAmount, Token, utils,
} from '@reef-defi/react-lib';
import React from 'react';
import { BigNumber, utils as eUtils } from 'ethers';
import { useAppSelector } from '../../store';

const { showBalance } = utils;
const { parseUnits, formatEther, parseEther } = eUtils;

interface TokenPill {
    token: Token
}

const calculateBalanceValue = (price: string, token: Token): string => {
  const priceBN = BigNumber.from(parseUnits(price));
  const balanceFixed = parseInt(formatEther(token.balance.toString()), 10);
  return formatEther(priceBN.mul(BigNumber.from(balanceFixed)).toString());
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

export const TokenPill = ({ token }: TokenPill): JSX.Element => {
  const { isLoading: poolsLoading, pools } = useAppSelector((state) => state.pools);
  const reefPrice = 0.31;
  let balance = '0';
  const priceAmt = calculateTokenPrice(token, pools, reefPrice);
  const price = priceAmt.toFixed(priceAmt < 1 ? 4 : 2);
  balance = calculateBalanceValue(price, token);

  return (
    <div key={token.address} className="col-12 col-md-6">
      <div className="token-balance-item radius-border d-flex d-flex-space-between d-flex-vert-center">
        <div className="token-balance-item_icon-text mr-1">
          <div className=" mr-1"><img src={token.iconUrl} alt={token.name} /></div>
          <div className="">
            <div className="title-font text-bold ">{token.name}</div>
            <div className="">{showBalance(token)}</div>
          </div>
        </div>
        <div className=" title-font text-bold text-color-dark-accent">
          <div>
            $
            {price}
          </div>
          <div>
            balance: $
            {balance}
          </div>

        </div>
      </div>
    </div>
  );
};
