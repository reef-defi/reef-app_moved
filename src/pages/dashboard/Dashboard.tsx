import React, { useState } from 'react';
import { hooks as reefHooks, utils as reefUtils } from '@reef-defi/react-lib';
import { useAppSelector } from '../../store';
import { TokenBalances } from './TokenBalances';
import { Balance } from './Balance';
import { ActionButtons } from './ActionButtons';
import { useGetSigner } from '../../hooks/useGetSigner';
import { currentNetwork } from '../../environment';
import './Dashboard.css';

const {
  DataProgress, isDataSet,
} = reefUtils;

const Dashboard = (): JSX.Element => {
  const { isLoading: tokensLoading } = useAppSelector((state) => state.tokens);
  const { pools } = useAppSelector((state) => state.pools);
  const selectedSigner = useGetSigner();
  const [refreshSignerTokens, setRefreshSignerTokens] = useState(false);
  const signerTokens = reefHooks.useLoadSignerTokens(refreshSignerTokens, currentNetwork, selectedSigner);
  const reefPrice = reefHooks.useReefPriceInterval(60000);
  const signerTokenBalances = reefHooks.useSignerTokenBalances(signerTokens, pools, reefPrice);

  const refreshTokens = (): void => {
    setRefreshSignerTokens(!refreshSignerTokens);
  };

  const totalBalance: reefUtils.DataWithProgress<number> = isDataSet(signerTokenBalances) && signerTokenBalances.length ? (signerTokenBalances as reefHooks.TokenWithPrice[]).reduce((state: reefUtils.DataWithProgress<number>, curr) => {
    if (Number.isNaN(curr.balanceValue) || !isDataSet(curr.balanceValue)) {
      return state;
    }
    if (!Number.isNaN(+curr.balanceValue as number) && isDataSet(curr.balanceValue)) {
      const stateNr = isDataSet(state) ? state as number : 0;
      return stateNr + (curr.balanceValue as number);
    }
    return state;
  }, DataProgress.LOADING) : signerTokenBalances as reefUtils.DataProgress;

  return (
    <div className="w-100">
      <div className="mb-4 row">
        <Balance balance={totalBalance} />
        <ActionButtons />
      </div>
      <TokenBalances tokens={signerTokenBalances} onRefresh={refreshTokens} />
    </div>
  );
};

export default Dashboard;
