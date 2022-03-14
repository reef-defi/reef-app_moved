import React from 'react';
import { Components, TokenWithAmount, utils } from '@reef-defi/react-lib';
import { TokenPill } from './TokenPill';

const { isDataSet, DataProgress } = utils;

interface TokenBalances {
    tokens: utils.DataWithProgress<TokenWithAmount[]>;
    onRefresh?: any;
}

export const Skeleton = (): JSX.Element => (
  <div className="col-md-12 col-lg-6 token-skeleton">
    <div className="token-balance-item radius-border d-flex d-flex-space-between d-flex-vert-center">
      <div className="token-balance-item_icon-text mr-1">
        <div className="token-balance-item_icon-text_w mr-1">
          <div className='token-skeleton__image'/>
        </div>
        <div className='token-balance-item__info'>
          <div className="">
            <div className="title-font text-bold ">
              <div className='token-skeleton__title'/>
            </div>
            <div className="token-balance-item_sub-title">
              <span>
                <div className='token-skeleton__sub-title'/>
              </span>
            </div>
          </div>

          <div className="token-balance-item_balances title-font text-bold text-color-dark-accent">
            <div>
              <div className='token-skeleton__balance'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TokenBalances = ({ tokens, onRefresh }: TokenBalances): JSX.Element => (
  <div className='token-balances'>
    <div className="col-12">
      {!tokens && (
            <div className="tokens-container">
              <Skeleton />
              <Skeleton />
            </div>
        )}
      { tokens && !!isDataSet(tokens) && (
      <div className="tokens-container" style={{ maxHeight: 'auto' }}>
        {(tokens as TokenWithAmount[]).map((token: TokenWithAmount) => (<TokenPill token={token} key={token.address} />
        ))}
      </div>
      )}
      {(
        (!!tokens && (!!isDataSet(tokens) && !(tokens as TokenWithAmount[]).length))
          || (!isDataSet(tokens) && tokens === DataProgress.NO_DATA)
      )
      && (
      <div>No tokens to display.</div>
      )}
    </div>
  </div>

);
