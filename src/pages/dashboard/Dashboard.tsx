import React from 'react';
import { useAppSelector } from '../../store';
import { useLoadSignerTokens } from '../../hooks/useLoadSignerTokens';
import { TokenBalances } from './TokenBalances';
import {
  isValueWithStatusSet,
  TokenWithPrice,
  useSignerTokenBalances,
  ValueStatus,
  ValueWithStatus,
} from '../../hooks/useSignerTokenBalances';
import { Balance } from './Balance';
import { ActionButtons } from './ActionButtons';
import { useGetSigner } from '../../hooks/useGetSigner';
import './Dashboard.css';
import { useReefPrice } from '../../hooks/useReefPrice';
import { TokenActivity } from './TokenActivity';

const Dashboard = (): JSX.Element => {
  const { isLoading: tokensLoading } = useAppSelector((state) => state.tokens);
  const { pools } = useAppSelector((state) => state.pools);
  const selectedSigner = useGetSigner();
  const signerTokens = useLoadSignerTokens(selectedSigner);
  const reefPrice = useReefPrice();
  const signerTokenBalances = useSignerTokenBalances(signerTokens, pools, reefPrice);

  const totalBalance: ValueWithStatus<number> = isValueWithStatusSet(signerTokenBalances) && signerTokenBalances.length ? (signerTokenBalances as TokenWithPrice[]).reduce((state: ValueWithStatus<number>, curr) => {
    if (Number.isNaN(curr.balanceValue) || !isValueWithStatusSet(curr.balanceValue)) {
      return state;
    }
    if (!Number.isNaN(+curr.balanceValue as number) && isValueWithStatusSet(curr.balanceValue)) {
      const stateNr = isValueWithStatusSet(state) ? state as number : 0;
      return stateNr + (curr.balanceValue as number);
    }
    return state;
  }, ValueStatus.LOADING) : signerTokenBalances as ValueStatus;

  /* TODO remove
      useEffect(() => {
    const getPrice = async ():Promise<void> => {
      let price: number|ValueStatus = ValueStatus.NO_DATA;
      try {
        price = await retrieveReefCoingeckoPrice();
      } catch (e) {
      }
      setReefPrice(price);
    };
    const interval = setInterval(getPrice, 60000);
    getPrice();
    return () => {
      clearInterval(interval);
    };
  }, []); */

  return (
    <div className="w-100">
      <div className="mb-4 row">
        <Balance balance={totalBalance} />
        <ActionButtons />
      </div>
      <TokenBalances tokens={signerTokenBalances} />
      <TokenActivity address={selectedSigner?.evmAddress} />
    </div>
  );
};

export default Dashboard;
