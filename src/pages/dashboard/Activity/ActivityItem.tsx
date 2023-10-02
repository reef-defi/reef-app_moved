import { NFT, Token, utils } from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import React, { useContext, useMemo } from 'react';
import './activity-item.css';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import HideBalance from '../../../context/HideBalance';
import { displayBalanceFromToken } from '../../../utils/displayBalance';

const { showBalance } = utils;

interface Props {
  timestamp: number;
  inbound: boolean;
  token: Token | NFT;
  url: string;
}

const formatDate = (timestamp: number): string => {
  let date = new Date(timestamp);
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset * 60 * 1000));
  const formattedDate = date.toISOString().split('T')[0].split('-').reverse().join('-');
  const formattedTime = date.toISOString().split('T')[1].split(':').slice(0, 2).join(':');

  return `${formattedDate}, ${formattedTime}`;
};

const TokenActivityItem = ({
  token,
  timestamp,
  inbound,
  url,
}: Props): JSX.Element => {
  // @ts-ignore-next-line
  const isNFT = !!(token as NFT).nftId;
  const type: 'receive' | 'send' = inbound ? 'receive' : 'send';

  const title = useMemo(() => {
    const actionMap = {
      receive: 'Received',
      send: 'Sent',
    };

    const action = actionMap[type];
    return `${action} ${token.symbol || token.name}`;
  }, [type, token.symbol]);

  const amount = useMemo(() => {
    const amt = displayBalanceFromToken(token as Token);
    const prefixMap = {
      receive: '+',
      send: '-',
    };
    const prefix = prefixMap[type];

    return `${prefix} ${amt}`;
  }, [token, type]);

  const hideBalance = useContext(HideBalance);

  return (
    <div
      key={timestamp}
      className={`
        activity-item
        activity-item--${type}
        ${isNFT ? 'activity-item--nft' : ''}
      `}
    >
      <div className="activity-item__indicator">
        <Uik.Icon className="activity-item__indicator-icon" icon={faArrowDown} />
      </div>

      <div className="activity-item__content">
        <div className="activity-item__info">
          <div className="activity-item__title" title={title}>{ title }</div>
          <div className="activity-item__date">{ formatDate(timestamp) }</div>
        </div>

        {
          isNFT ? (
            <div
              className="activity-item__nft-preview"
              style={{ backgroundImage: `url(${token.iconUrl})` }}
            />
          ) : (
            <div
              className="activity-item__amount-wrapper"
              title={`${type === 'receive' ? '+' : '-'} ${showBalance(token as Token)}`}
            >
              <div
                className={`
                  activity-item__amount
                  ${hideBalance.isHidden ? 'activity-item__amount--hidden' : ''}
                `}
              >
                {
                !hideBalance.isHidden ? amount : (
                  <div>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                )
              }
              </div>
              <div
                className="activity-item__amount-token-icon"
                style={{ backgroundImage: `url(${token.iconUrl})` }}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TokenActivityItem;

export const Skeleton = (): JSX.Element => (
  <div className="activity-item activity-item--skeleton">
    <div className="activity-item__indicator" />

    <div className="activity-item__content">
      <div className="activity-item__info">
        <div className="activity-item__title" />
        <div className="activity-item__date" />
      </div>

      <div className="activity-item__amount-wrapper">
        <div className="activity-item__amount" />
      </div>
    </div>
  </div>
);
