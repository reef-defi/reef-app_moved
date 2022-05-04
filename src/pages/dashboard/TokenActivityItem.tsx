import {
  Components, Token, TokenNFT, utils,
} from '@reef-defi/react-lib';
import React from 'react';
import { formatDate } from '../../utils/utils';
import './TokenActivityItem.css';

const { showBalance } = utils;
const { Loading } = Components.Loading;

interface TokenActivityItem {
  timestamp: number;
  type: TokenActivityType;
  token: Token | TokenNFT;
  url: string;
}

export enum TokenActivityType {
  SEND = 'SEND',
  RECEIVE = 'RECEIVE'
}

const formatDateTs = (timestamp: number): string => {
  let date = new Date(timestamp);
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset * 60 * 1000));
  const formatted = date.toISOString().split('T')[0];
  return formatted.split('-').reverse().join('-');
};

export const TokenActivityItem = ({
  token, timestamp, type, url,
}: TokenActivityItem): JSX.Element => {
  // @ts-ignore-next-line
  const isNFT = !!token.nftId;

  return (
    <div
      key={timestamp}
      role="link"
      className={`
        activity-item flex-1
        ${type === TokenActivityType.RECEIVE ? 'receive-activity' : 'send-activity'}
        ${isNFT ? 'activity-item--nft' : ''}
      `}
      onClick={() => window.open(url, '_blank ')}
      tabIndex={0}
    >
      <div className="d-flex d-flex-vert-center">

        <div className="activity-item_type-icon-w d-flex d-flex-vert-center">
          <div className="activity-item_type-icon receive m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <line
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                x1="18"
                x2="6"
                y1="6"
                y2="18"
              />
              <polyline
                fill="none"
                points="15 18 6 18 6 9"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="activity-item_type-icon send m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <line fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" x1="6" x2="18" y1="18" y2="6" />
              <polyline fill="none" points="9 6 18 6 18 15" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {
          isNFT
          && (
          <div
            className="activity-item__nft-image"
            style={{ backgroundImage: `url(${token.iconUrl})` }}
          />
          )
        }

        <div className="activity-item_body radius-border d-flex d-flex-space-between d-flex-vert-center">
          <div className="token-balance-item_icon-text mr-1">
            <div>
              <div className="title-font text-bold">{type === TokenActivityType.RECEIVE ? 'Received' : 'Sent'}</div>
              <div className="">{formatDateTs(timestamp)}</div>
            </div>
          </div>
          <div className=" d-flex d-flex-vert-center">
            <div className="amount-text text-m title-font text-bold text-color-dark-accent mr-1 d-flex">
              <span
                className="activity-item__amount"
                title={`${type === TokenActivityType.RECEIVE ? '+' : '-'} ${showBalance(token)}`}
              >
                {type === TokenActivityType.RECEIVE ? '+ ' : '- '}
                {showBalance(token)}
              </span>
            </div>
            {
              !isNFT
              && <div className="activity-item_icon-w"><img src={token.iconUrl} alt="" className="activity-item_icon" /></div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
