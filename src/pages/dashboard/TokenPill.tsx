import { utils, Components } from '@reef-defi/react-lib';
import React from 'react';
import { useAppSelector } from '../../store';
import { isValueWithStatusSet, ValueWithStatus, TokenWithPrice } from '../../hooks/useSignerTokenBalances';
import { toCurrencyFormat } from '../../utils/utils';

const { showBalance } = utils;
const { Loading } = Components.Loading;

interface TokenPill {
    token: TokenWithPrice
}

export const TokenPill = ({ token }: TokenPill): JSX.Element => (
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
          {isValueWithStatusSet(token.price) && toCurrencyFormat(token.price as number, { maximumFractionDigits: token.price < 1 ? 4 : 2 }) }
          {!isValueWithStatusSet(token.price) && token.price === ValueWithStatus.LOADING && <Loading />}
          {!isValueWithStatusSet(token.price) && token.price === ValueWithStatus.NO_DATA && ' - '}
        </div>
      </div>
    </div>
  </div>
);
