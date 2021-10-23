import { Token, utils } from '@reef-defi/react-lib';
import React from 'react';

const { convert2Normal } = utils;
interface TokenBalancesPills {
    tokens: Token[]
}

export const TokenBalancePills = ({ tokens }: TokenBalancesPills): JSX.Element => {
  const tokenList = tokens.map((token: Token) => (
    <div key={token.address} className="col-12 col-md-6">
      <div className="token-balance-item radius-border d-flex d-flex-space-between d-flex-vert-center">
        <div className="token-balance-item_icon-text mr-1">
          <div className=" mr-1"><img src={token.iconUrl} alt={token.name} /></div>
          <div className="">
            <div className="title-font text-bold ">{token.name}</div>
            <div className="">{convert2Normal(token.decimals, token.balance.toString())}</div>
          </div>
        </div>
        <div className=" title-font text-bold text-color-dark-accent">
          $0.044
        </div>
      </div>
    </div>
  ));

  return (
    <div className="row overflow-auto" style={{ maxHeight: 'auto' }}>
      {tokenList}
    </div>
  );
};
