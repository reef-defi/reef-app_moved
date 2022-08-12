import { Token } from '@reef-defi/react-lib';
import React, { useContext, useState } from 'react';
import OverlaySend from '../../common/OverlaySend';
import OverlaySwap from '../../common/OverlaySwap';
import TokenPricesContext from '../../context/TokenPricesContext';
import TokenCard from './TokenCard';


interface TokenBalances {
    tokens: Token[];
    onRefresh?: () => void;
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

export const TokenBalances = ({ tokens }: TokenBalances): JSX.Element => {
  const tokenPrices = useContext(TokenPricesContext);
  const [isSwapOpen, setSwapOpen] = useState(false);
  const [isSendOpen, setSendOpen] = useState(false);

  const tokenCards = tokens
    .filter(({balance}) => balance.gt(0))
    .map((token) => (
      <TokenCard
        key={token.address}
        token={token}
        price={tokenPrices[token.address] || 0}
        onClickSwap={() => setSwapOpen(true)}
        onClickSend={() => setSendOpen(true)}
      />
    ));
    
  return (
    <div className="dashboard__tokens">
      { tokenCards }
      { tokens.length === 0 &&
        <div className="dashboard__no-tokens">No tokens to display.</div>
      }

      <OverlaySwap
        isOpen={isSwapOpen}
        onClose={() => setSwapOpen(false)}
      />

      <OverlaySend
        isOpen={isSendOpen}
        onClose={() => setSendOpen(false)}
      />
    </div>
  );
};