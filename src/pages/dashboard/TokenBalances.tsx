import { Token } from '@reef-defi/react-lib';
import React from 'react';
import { TokenPill } from './TokenPill';

interface TokenBalances {
  tokens: Token[];
}

export const Skeleton = (): JSX.Element => (
  <div className="col-md-12 col-lg-6 token-skeleton">
    <div className="token-balance-item radius-border d-flex d-flex-space-between d-flex-vert-center">
      <div className="token-balance-item_icon-text mr-1">
        <div className="token-balance-item_icon-text_w mr-1">
          <div className="token-skeleton__image" />
        </div>
        <div className="token-balance-item__info">
          <div className="">
            <div className="title-font text-bold ">
              <div className="token-skeleton__title" />
            </div>
            <div className="token-balance-item_sub-title">
              <span>
                <div className="token-skeleton__sub-title" />
              </span>
            </div>
          </div>

          <div className="token-balance-item_balances title-font text-bold text-color-dark-accent">
            <div>
              <div className="token-skeleton__balance" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TokenBalances = ({ tokens }: TokenBalances): JSX.Element => (
  <div className="token-balances">
    <div className="col-12">
      {tokens.length === 0 && (
      <div className="tokens-container">
        <Skeleton />
        <Skeleton />
      </div>
      )}
      { tokens.length > 0 && (
      <div
        className={`
          tokens-container
          ${tokens?.length === 1 ? 'tokens-container--single' : ''}
        `}
        style={{ maxHeight: 'auto' }}
      >
        {tokens.map((token) => (<TokenPill token={token} key={token.address} />))}
      </div>
      )}
    </div>
  </div>

);
