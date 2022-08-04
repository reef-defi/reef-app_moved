import React, { useState } from 'react';
import { TokenWithAmount, utils } from '@reef-defi/react-lib';
import TokenCard from './TokenCard';
import Swap from '../../components/Swap';
import Send from '../../components/Send';

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
  const [isSwapOpen, setSwapOpen] = useState(false);
  const [isSendOpen, setSendOpen] = useState(false);

  return (
    <div className="dashboard__tokens">
      {
        tokens && !!isDataSet(tokens)
        && (tokens as TokenWithAmount[]).map((token: TokenWithAmount) => (
          <TokenCard
            token={token}
            key={token.address}
            onClickSwap={() => setSwapOpen(true)}
            onClickSend={() => setSendOpen(true)}
          />
        ))
      }

      {
        (
          (!!tokens && (!!isDataSet(tokens) && !(tokens as TokenWithAmount[]).length))
          || (!isDataSet(tokens) && tokens === DataProgress.NO_DATA)
        ) && <div className="dashboard__no-tokens">No tokens to display.</div>
      }

      <Swap
        isOpen={isSwapOpen}
        onClose={() => setSwapOpen(false)}
      />

      <Send
        isOpen={isSendOpen}
        onClose={() => setSendOpen(false)}
      />
    </div>
  );
};
