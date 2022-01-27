import React from 'react';
import { Components } from '@reef-defi/react-lib';
import { useObservableState } from '../../hooks/useObservableState';
import { transferHistory$ } from '../../state/tokenState';
import { TokenActivityItem, TokenActivityType } from './TokenActivityItem';

interface TokenActivity {
    address: string | undefined;
}

export const TokenActivity = ({ address }: TokenActivity): JSX.Element => {
  const transfers = useObservableState(transferHistory$);

  return (
    <div className="row">
      <div className="mb-4 col-12 d-flex d-flex-space-between d-flex-vert-base">
        <div>
          <h5 className="my-auto title-color text-semi-bold">Activity</h5>
        </div>

      </div>
      <div className="col-12 card">
        {!!transfers && !transfers.length && <div>Account has no activity.</div>}
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
