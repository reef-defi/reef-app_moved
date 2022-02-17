import React from 'react';
import {
  Components, appState, createEmptyTokenWithAmount, hooks,
} from '@reef-defi/react-lib';
import { TokenActivityItem, TokenActivityType } from './TokenActivityItem';
import { TokenPill } from './TokenPill';

interface TokenActivity {
    address: string | undefined;
}

const noActivityTokenDisplay = createEmptyTokenWithAmount();
noActivityTokenDisplay.address = '0x';
noActivityTokenDisplay.iconUrl = '';
noActivityTokenDisplay.name = 'No account history yet.';

export const TokenActivity = ({ address }: TokenActivity): JSX.Element => {
  const transfers: any[]|undefined = hooks.useObservableState(appState.transferHistory$);

  return (
    <div className="row">
      <div className="mb-4 col-12 d-flex d-flex-space-between d-flex-vert-base">
        <div>
          <h5 className="my-auto title-color text-semi-bold">Activity</h5>
        </div>

      </div>
      <div className={`col-12 ${transfers?.length ? 'card' : ''}`}>
        {!!transfers && !transfers.length && <div className="no-token-activity-pill-w"><TokenPill token={noActivityTokenDisplay} /></div>}
        {/* {!!transfers && !transfers.length && <div>Account has no activity.</div>} */}
        {!!transfers && !!transfers.length && (
        <div>
            {transfers.map((t) => (
              <TokenActivityItem
                key={t.timestamp}
                timestamp={t.timestamp}
                token={t.token}
                type={t.inbound ? TokenActivityType.RECEIVE : TokenActivityType.SEND}
              />
            ))}
        </div>
        )}
        {!transfers && <Components.Loading.Loading />}
      </div>
    </div>
  );
};
