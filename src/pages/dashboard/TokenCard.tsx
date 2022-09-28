import { faRepeat, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Token } from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import BigNumber from 'bignumber.js';
import React, { useContext, useMemo, useState } from 'react';
import OverlaySwap from '../../common/OverlaySwap';
import OverlaySend from '../../common/OverlaySend';
import { toCurrencyFormat } from '../../utils/utils';
import './token-card.css';
import HideBalance from '../../context/HideBalance';
import { displayBalance, displayBalanceFromToken } from '../../utils/displayBalance';

export interface TokenCard {
  price: number;
  token: Token
  onClickPrice?: () => void;
  className?: string
}

const TokenCard = ({
  token,
  price,
  onClickPrice,
  className,
}: TokenCard): JSX.Element => {
  const [isSwapOpen, setSwapOpen] = useState(false);
  const [isSendOpen, setSendOpen] = useState(false);

  const hideBalance = useContext(HideBalance);

  const copyAddress = (): void => {
    navigator.clipboard.writeText(token.address).then(() => {
      Uik.notify.info('Copied token address to clipboard');
    }, () => {
      Uik.notify.danger('Cannot copy to clipboard');
    });
  };

  const balanceValue = new BigNumber(token.balance.toString())
    .div(new BigNumber(10).pow(token.decimals))
    .multipliedBy(price)
    .toNumber();

  const balance = useMemo(() => {
    if (balanceValue >= 1000000) {
      return `$${displayBalance(balanceValue)}`;
    }

    return toCurrencyFormat(balanceValue);
  }, [balanceValue]);

  return (
    <div className={`
      token-card
      ${className || ''}
    `}
    >
      <div className="token-card__wrapper">
        <div className="token-card__main">
          <Uik.Tooltip
            text="Copy token address"
            delay={0}
          >
            <button
              className="token-card__image"
              style={{ backgroundImage: `url(${token.iconUrl})` }}
              type="button"
              aria-label="Token Image"
              onClick={copyAddress}
            />
          </Uik.Tooltip>
          <div className="token-card__info">
            <div className="token-card__token-info">
              <span className="token-card__token-name">{ token.name }</span>
            </div>
            <button
              className="token-card__token-price"
              disabled={!onClickPrice}
              onClick={onClickPrice}
              type="button"
            >
              {
                !!price
                && (
                <>
                  $
                  { Uik.utils.formatAmount(Uik.utils.maxDecimals(price, 4)) }
                </>
                )
              }
            </button>
          </div>
        </div>
        <div className="token-card__aside">
          <div className="token-card__values">
            <button
              type="button"
              className={`
                token-card__value
                ${hideBalance.isHidden ? 'token-card__value--hidden' : ''}
              `}
              onClick={() => {
                if (hideBalance.isHidden) hideBalance.toggle();
              }}
            >
              {
                !hideBalance.isHidden
                  ? balance
                  : (
                    <>
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                    </>
                  )
              }
            </button>
            <button
              type="button"
              className={`
                token-card__amount
                ${hideBalance.isHidden ? 'token-card__amount--hidden' : ''}
              `}
              onClick={() => {
                if (hideBalance.isHidden) hideBalance.toggle();
              }}
            >
              {
              !hideBalance.isHidden
                ? `${displayBalanceFromToken(token)} ${token.symbol}`
                : (
                  <>
                    <div />
                    <div />
                    <div />
                    <div />
                  </>
                )
            }
            </button>
          </div>

          <Uik.Button
            text="Swap"
            icon={faRepeat}
            onClick={() => setSwapOpen(true)}
            size="small"
          />

          <Uik.Button
            text="Send"
            icon={faPaperPlane}
            onClick={() => setSendOpen(true)}
            size="small"
            fill
          />
        </div>
      </div>

      <OverlaySwap
        tokenAddress={token.address}
        isOpen={isSwapOpen}
        onClose={() => setSwapOpen(false)}
      />

      <OverlaySend
        tokenAddress={token.address}
        isOpen={isSendOpen}
        onClose={() => setSendOpen(false)}
      />
    </div>
  );
};

export default TokenCard;
