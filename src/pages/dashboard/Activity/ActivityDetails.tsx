import { NFT, Token, utils } from '@reef-defi/react-lib';
import React, {
  useContext, useMemo,
} from 'react';
import './activity-details.css';
import Uik from '@reef-defi/ui-kit';
import {
  faArrowDown,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { differenceInDays } from 'date-fns';
import HideBalance from '../../../context/HideBalance';
import { displayBalanceFromToken } from '../../../utils/displayBalance';

const { showBalance } = utils;

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  from: string;
  to: string;
  inbound: boolean;
  url: string;
  token: Token | NFT;
  timestamp: number;
}

const formatDate = (timestamp: number): string => {
  const today = new Date();
  const date = new Date(timestamp);

  const difference = differenceInDays(today, date);
  return `${difference}` + ' ' + 'days ago';
};

const ActivityDetails = ({
  isOpen,
  onClose,
  timestamp,
  from,
  to,
  inbound,
  url,
  token,
}: Props): JSX.Element => {
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

    if (isNFT) {
      return `${amt}`;
    }

    const prefixMap = {
      receive: '+',
      send: '-',
    };
    const prefix = prefixMap[type];

    return `${prefix} ${amt} ${token.name}`;
  }, [token, type]);

  const hideBalance = useContext(HideBalance);

  return (
    <Uik.Modal
      className="transfer-asset"
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      footer={<Uik.Button text="Details" size="small" onClick={() => window.open(url, '_blank')} />}
    >
      <div className="transfer-asset__container">
        <div className="transfer-asset-summary">
          {isNFT ? (
            <div
              key={timestamp}
              className={`
              transfer-asset
              transfer-asset--${type}
              transfer-asset--nft
            `}
            >
              <div className="transfer-asset__content-ntf">
                <div
                  className="transfer-asset__nft-preview row-span-2"
                  style={{ backgroundImage: `url(${token.iconUrl})` }}
                >
                  <div className="transfer-asset__indicator">
                    <Uik.Icon
                      className="transfer-asset__indicator-icon"
                      icon={faArrowDown}
                    />
                  </div>
                </div>

                <div className="transfer-asset__block">
                  <div
                    className={`
                    transfer-asset__amount-wrapper
                    ${isNFT ? 'transfer-asset__nft-quantity-indicator' : ''}
                  `}
                    title={`${type === 'receive' ? '+' : '-'} ${showBalance(
                              token as Token,
                    )}`}
                  >
                    <div
                      className={`
                        transfer-asset__amount
                        ${
                                hideBalance.isHidden
                                  ? 'transfer-asset__amount--hidden'
                                  : ''
                            }
                      `}
                    >
                      {!hideBalance.isHidden ? (
                        amount
                      ) : (
                        <div>
                          <div />
                          <div />
                          <div />
                          <div />
                          <div />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="transfer-asset__block col-span-6">
                  <div className="transfer-asset__info">
                    <div className="transfer-asset__date">
                      {formatDate(timestamp)}
                    </div>
                  </div>
                </div>

                <div className="transfer-asset__block">
                  <div className="transfer-asset__info">
                    <div className="transfer-asset__status">
                      <Uik.Icon
                        className="transfer-asset__status-icon transfer-asset__status-icon--success"
                        icon={faCheck}
                      />
                    </div>
                  </div>
                </div>

                <div className="transfer-asset__block col-span-6">
                  <div className="transfer-asset__wallet transfer-asset__direction-indicator">
                    <div className="my-auto mx-2 fs-6">
                      <span className="transfer-asset__wallet-address">
                        {from.substring(1, 8)}
                        ...
                      </span>
                    </div>
                    <button className="transfer-asset__wallet-name">Tom</button>
                  </div>
                </div>

                <div className="transfer-asset__block col-span-6">
                  <div className="transfer-asset__wallet">
                    <div className="my-auto mx-2 ">
                      <span className="transfer-asset__wallet-address">
                        {to.substring(1, 7)}
                        ...
                      </span>
                    </div>
                    <button className="transfer-asset__wallet-name">
                      Bene
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={timestamp}
              className={`
            transfer-asset
            transfer-asset--${type}
            `}
            >
              <div className="transfer-asset__content-token">
                <div className="transfer-asset__block col-span-6">
                  <div
                    className="transfer-asset__amount-wrapper"
                    title={`${type === 'receive' ? '+' : '-'} ${showBalance(
                                token as Token,
                    )}`}
                  >
                    <div
                      className={`
                      transfer-asset__amount
                      ${
                                  hideBalance.isHidden
                                    ? 'transfer-asset__amount--hidden'
                                    : ''
                              }
                    `}
                    >
                      {!hideBalance.isHidden ? (
                        amount
                      ) : (
                        <div>
                          <div />
                          <div />
                          <div />
                          <div />
                          <div />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="transfer-asset__block">
                  <div className="transfer-asset__info">
                    <div className="transfer-asset__indicator">
                      <Uik.Icon
                        className="transfer-asset__indicator-icon"
                        icon={faArrowDown}
                      />
                    </div>
                  </div>
                </div>

                <div className="transfer-asset__block">
                  <div className="transfer-asset__info">
                    <div className="transfer-asset__date">
                      {formatDate(timestamp)}
                    </div>
                  </div>
                </div>

                <div className="transfer-asset__block">
                  <div className="transfer-asset__info">
                    <div className="transfer-asset__status">
                      <Uik.Icon
                        className="transfer-asset__status-icon transfer-asset__status-icon--success"
                        icon={faCheck}
                      />
                    </div>
                  </div>
                </div>

                <div className="transfer-asset__block">
                  <div className="transfer-asset__info">
                    <div
                      className="transfer-asset__amount-token-icon"
                      style={{ backgroundImage: `url(${token.iconUrl})` }}
                    />
                  </div>
                </div>

                <div className="transfer-asset__block col-span-6">
                  <div className="transfer-asset__wallet transfer-asset__direction-indicator">
                    <div className="my-auto mx-2 fs-6">
                      <span className="transfer-asset__wallet-address">
                        {from.substring(1, 8)}
                        ...
                      </span>
                    </div>
                    <button className="transfer-asset__wallet-name">
                      Tom
                    </button>
                  </div>
                </div>

                <div className="transfer-asset__block col-span-6">
                  <div className="transfer-asset__wallet">
                    <div className="my-auto mx-2 ">
                      <span className="transfer-asset__wallet-address">
                        {to.substring(1, 7)}
                        ...
                      </span>
                    </div>
                    <button className="transfer-asset__wallet-name">
                      Bene
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Uik.Modal>
  );
};

export default ActivityDetails;
