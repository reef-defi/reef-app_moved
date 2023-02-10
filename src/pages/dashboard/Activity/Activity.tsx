import {
  appState, createEmptyTokenWithAmount, hooks, ReefSigner, Network, TokenTransfer,
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import React, { useState, useMemo } from 'react';
import './activity.css';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ActivityItem, { Skeleton } from './ActivityItem';
import ActivityDetails from './ActivityDetails';

const noActivityTokenDisplay = createEmptyTokenWithAmount();
noActivityTokenDisplay.address = '0x';
noActivityTokenDisplay.iconUrl = '';
noActivityTokenDisplay.name = 'No account history yet.';

export const Activity = (): JSX.Element => {
  const transfers = hooks.useObservableState(appState.transferHistory$);
  const [isActivityModalOpen, setActivityModalOpen] = useState(false);
  const signer: ReefSigner | undefined |null = hooks.useObservableState(appState.selectedSigner$);
  const network: Network|undefined = hooks.useObservableState(appState.currentNetwork$);
  const [selectedTransaction, setSelectedTransaction] = useState<TokenTransfer|null>(null);

  // set current transaction as parameter and call setSelectedTransaction state function.
  const setCurrentTransaction = (transaction : TokenTransfer): void => {
    setSelectedTransaction(transaction);
  };

  // get signer wallet addresses as array object.
  const accounts: ReefSigner[] | undefined | null = hooks.useObservableState(appState.signers$);

  // compare the sender wallet address with the available signer wallet addresses.
  const getAccountName = (availableAccounts: ReefSigner[] | undefined | null, address: string | undefined): string => {
    const filteredAccount = availableAccounts?.find((account) => account.address === address)?.name;
    if (filteredAccount && filteredAccount.length) {
      // Set maximum length of 7 characters + dots.
      const maxLength = 7;

      const senderName = filteredAccount;
      return senderName.length > maxLength
        ? `${senderName.slice(0, maxLength - 3)}...${senderName.slice(-maxLength + 4)}`
        : senderName;
    }
    return 'no name';
  };

  // memorizes the selected sender of selectedTransaction.
  const sender = useMemo(() => getAccountName(accounts, selectedTransaction?.from), [accounts, selectedTransaction]);

  // memorizes the selected recipient of selectedTransaction.
  const recipient = useMemo(() => getAccountName(accounts, selectedTransaction?.to), [accounts, selectedTransaction]);

  // @ts-ignore
  return (
    <div className="token-activity activity">
      <div className="activity__head">
        <Uik.Text type="title" text="Activity" className="activity__title" />
        {
                    !!signer?.address && !!network?.reefscanUrl
                    && (
                    <Uik.Button
                      size="small"
                      icon={faArrowUpRightFromSquare}
                      text="Open Explorer"
                      onClick={() => window.open(`${network?.reefscanUrl}/account/${signer.address}`)}
                    />
                    )
                }
      </div>

      <div className={`col-12 card  ${transfers?.length ? 'card-bg-light' : ''}`}>
        {!!transfers && !transfers.length && <div className="no-token-activity">No recent transfer activity.</div>}
        {!!transfers && !!transfers.length && (
          <div>

            {transfers.map((item, index) => (
              <div onClick={() => {
                setCurrentTransaction(item);
                setActivityModalOpen(!isActivityModalOpen);
              }}
              >
                <ActivityItem
                  key={index}
                  timestamp={item.timestamp}
                  token={item.token}
                  url={item.url}
                  inbound={item.inbound}
                />
              </div>
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

      {!!transfers && !!transfers.length && selectedTransaction && (
        <ActivityDetails
          isOpen={isActivityModalOpen}
          onClose={() => setActivityModalOpen(false)}
          timestamp={selectedTransaction.timestamp}
          from={selectedTransaction.from}
          to={selectedTransaction.to}
          url={selectedTransaction.url}
          inbound={selectedTransaction.inbound}
          token={selectedTransaction.token}
          sender={sender}
          recipient={recipient}
        />
      )}
    </div>
  );
};
