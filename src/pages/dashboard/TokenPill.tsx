import { reefTokenWithAmount, Token, utils } from '@reef-defi/react-lib';
import React from 'react';
import { BigNumber } from 'ethers';
import { useAppSelector } from '../../store';

const { showBalance } = utils;

interface TokenPill {
    token: Token
}

export const TokenPill = ({ token }: TokenPill): JSX.Element => {
  const { isLoading: poolsLoading, pools } = useAppSelector((state) => state.pools);
  const { address: reefAddress } = reefTokenWithAmount();
  const reefPrice = 0.31;
  let ratio: number;
  let priceBN: BigNumber = BigNumber.from(0);
  if (token.address === reefAddress) {
    // const reefTokenPool = pools.find((pool) => (pool.token1.address === reefAddress && pool.token2.address === token.address) || (pool.token2.address === reefAddress && pool.token1.address === token.address));
    // TODO remove
    const reefTokenPool = pools[0];
    if (reefTokenPool) {
      let reefReserve: number;
      let tokenReserve: number;
      if (reefTokenPool.token1.address === reefAddress) {
        reefReserve = parseInt(reefTokenPool.reserve1, 10);
        tokenReserve = parseInt(reefTokenPool.reserve2, 10);
      } else {
        reefReserve = parseInt(reefTokenPool.reserve2, 10);
        tokenReserve = parseInt(reefTokenPool.reserve1, 10);
      }
      ratio = tokenReserve / reefReserve;
    } else {
      ratio = 1;
    }
    const price = (ratio * reefPrice).toString(10);
    const decimalsLen = price.length - price.indexOf('.') - 1;
    priceBN = BigNumber.from(parseFloat(price).toExponential(decimalsLen) );
  }

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
          {showBalance({ decimals: 2, name: '$', balance: priceBN })}
        </div>
      </div>
    </div>
  );
};
