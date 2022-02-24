import {
  Components, hooks as reefHooks, TokenWithAmount, utils as reefUtils,
  utils,
} from '@reef-defi/react-lib';
import React from 'react';
import { getIconUrl, toCurrencyFormat } from '../../utils/utils';
import './TokenPill.css';

const { DataProgress, isDataSet } = reefUtils;

const { showBalance } = reefUtils;
const { Loading } = Components.Loading;

interface TokenPill {
    token: TokenWithAmount
}

export const TokenPill = ({ token }: TokenPill): JSX.Element => {
  const balanceValue = utils.calculateBalanceValue(token);
  return (
    <div key={token.address} className="col-md-12 col-lg-6">
      <div className="token-balance-item radius-border d-flex d-flex-space-between d-flex-vert-center">
        <div className="token-balance-item_icon-text mr-1">
          <div className="token-balance-item_icon-text_w mr-1"><img src={token.iconUrl ? token.iconUrl : getIconUrl(token.address)} alt={token.name} /></div>
          <div className='token-balance-item__info'>
            <div className="">
              <div className="title-font text-bold ">{token.name}</div>
              <div className="token-balance-item_sub-title">
                <span>{showBalance(token)}</span>

                <span className="token-balance-item__price">
                  {isDataSet(token.price) && toCurrencyFormat(token.price as number, { maximumFractionDigits: token.price < 1 ? 4 : 2 }) }
                  {!isDataSet(token.price) && <span>No pool data</span> }
                  {/* TODO {!isDataSet(token.price) && token.price === DataProgress.LOADING && <Loading />} */}
                  {/* TODO {!isDataSet(token.price) && token.price === DataProgress.NO_DATA && ' - '} */}
                </span>
              </div>
            </div>

            <div className="token-balance-item_balances title-font text-bold text-color-dark-accent">
              <div>
                {isDataSet(balanceValue) && (
                <div className="token-balance-item__balance">
                  {toCurrencyFormat(balanceValue as number)}
                </div>
                ) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
