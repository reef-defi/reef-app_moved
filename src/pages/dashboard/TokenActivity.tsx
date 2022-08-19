import {
  appState, createEmptyTokenWithAmount, hooks,
} from '@reef-defi/react-lib';
import React from 'react';
import './TokenActivity.css';
import { TokenActivityItem, TokenActivityType } from './TokenActivityItem';

const noActivityTokenDisplay = createEmptyTokenWithAmount();
noActivityTokenDisplay.address = '0x';
noActivityTokenDisplay.iconUrl = '';
noActivityTokenDisplay.name = 'No account history yet.';

export const Skeleton = (): JSX.Element => (
  <div className="token-activity-skeleton">
    <div className="token-activity-skeleton__icon" />
    <div className="token-activity-skeleton__info">
      <div className="token-activity-skeleton__title" />
      <div className="token-activity-skeleton__subtitle" />
    </div>

    <div className="token-activity-skeleton__amount" />
  </div>
);
export const TokenActivity = (): JSX.Element => {
  const transfers = hooks.useObservableState(appState.transferHistory$);

  return (
    <div className="token-activity">
      <div className="mb-4 col-12 d-flex d-flex-space-between d-flex-vert-base token-activity__title">
        <div>
          <h5 className="my-auto title-color text-semi-bold">Activity</h5>
        </div>

      </div>
      <div className={`col-12 card  ${transfers?.length ? 'card-bg-light' : ''}`}>
        {!!transfers && !transfers.length && <div className="no-token-activity">No recent transfer activity.</div>}
        {!!transfers && !!transfers.length && (
        <div>
            {transfers.slice(0, 10).map((t, index) => (
              <TokenActivityItem
                // eslint-disable-next-line
                key={index}
                timestamp={t.timestamp}
                token={t.token}
                url={t.url}
                type={t.inbound ? TokenActivityType.RECEIVE : TokenActivityType.SEND}
              />
            ))}
        </div>
        )}
        {!transfers && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
        ) }
      </div>
    </div>
  );
};
