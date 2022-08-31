import {
  appState, createEmptyTokenWithAmount, hooks,
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import React from 'react';
import './activity.css';
import ActivityItem, { Skeleton } from './ActivityItem';

const noActivityTokenDisplay = createEmptyTokenWithAmount();
noActivityTokenDisplay.address = '0x';
noActivityTokenDisplay.iconUrl = '';
noActivityTokenDisplay.name = 'No account history yet.';

export const Activity = (): JSX.Element => {
  const transfers = hooks.useObservableState(appState.transferHistory$);

  return (
    <div className="token-activity activity">
      <Uik.Text type="title" text="Activity" className="activity__title" />

      <div className={`col-12 card  ${transfers?.length ? 'card-bg-light' : ''}`}>
        {!!transfers && !transfers.length && <div className="no-token-activity">No recent transfer activity.</div>}
        {!!transfers && !!transfers.length && (
        <div>
            {transfers.slice(0, 10).map((item, index) => (
              <ActivityItem
                // eslint-disable-next-line
                key={index}
                timestamp={item.timestamp}
                token={item.token}
                url={item.url}
                inbound={item.inbound}
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
