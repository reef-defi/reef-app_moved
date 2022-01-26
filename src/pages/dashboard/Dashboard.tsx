import React from 'react';
import { TokenWithAmount, utils as reefUtils, utils } from '@reef-defi/react-lib';
import { Balance } from './Balance';
import { ActionButtons } from './ActionButtons';
import './Dashboard.css';
import { useObservableState } from '../../hooks/useObservableState';
import { tokenPrices$ } from '../../state/tokenState';
import { TokenBalances } from './TokenBalances';
import { TokenActivity } from './TokenActivity';
import { selectedSigner$ } from '../../state/accountState';

const {
  DataProgress, isDataSet,
} = reefUtils;

const Dashboard = (): JSX.Element => {
  const signerTokenBalances = useObservableState(tokenPrices$);
  const selectedSigner = useObservableState(selectedSigner$);

  const totalBalance: reefUtils.DataWithProgress<number> = isDataSet(signerTokenBalances) && signerTokenBalances?.length ? (signerTokenBalances).reduce((state: reefUtils.DataWithProgress<number>, curr) => {
    if (Number.isNaN(curr.balance) || Number.isNaN(curr.price) || !isDataSet(curr.balance)) {
      return state;
    }
    const balVal = utils.calculateBalanceValue(curr);
    if (!Number.isNaN(balVal) && isDataSet(balVal)) {
      const stateNr = isDataSet(state) ? state as number : 0;
      return stateNr + (balVal as number);
    }
    return state;
  }, DataProgress.LOADING) : DataProgress.LOADING;

  return (
    <div className="w-100">
      <div className="mb-4 row">
        <Balance balance={totalBalance} />
        <ActionButtons />
      </div>
      <TokenBalances tokens={signerTokenBalances as utils.DataWithProgress<TokenWithAmount[]>} />
      <TokenActivity address={selectedSigner?.evmAddress} />
    </div>
  );
};

export default Dashboard;
