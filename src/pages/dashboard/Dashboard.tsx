import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, Components } from '@reef-defi/react-lib';
import { useAppSelector } from '../../store';
import { useLoadSignerTokens } from '../../hooks/useLoadSignerTokens';
import { TokenBalances } from './TokenBalances';
import {
  isValueWithStatusSet,
  useSignerTokenBalances,
  ValueStatus,
  ValueWithStatus,
} from '../../hooks/useSignerTokenBalances';
import { Balance } from './Balance';
import { ActionButtons } from './ActionButtons';
import { useGetSigner } from '../../hooks/useGetSigner';

const { retrieveReefCoingeckoPrice } = api;
const { Loading } = Components.Loading;

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const { isLoading: tokensLoading } = useAppSelector((state) => state.tokens);
  const { pools } = useAppSelector((state) => state.pools);
  const selectedSigner = useGetSigner();
  const signerTokens = useLoadSignerTokens(selectedSigner);
  const [reefPrice, setReefPrice] = useState<number|ValueStatus>(ValueStatus.LOADING);
  const signerTokenBalances = useSignerTokenBalances(signerTokens, pools, reefPrice);

  const totalBalance = signerTokenBalances.length ? signerTokenBalances.reduce((state: ValueWithStatus, curr) => {
    if (Number.isNaN(curr.balanceValue) || !isValueWithStatusSet(curr.balanceValue)) {
      return state;
    }
    if (!Number.isNaN(+curr.balanceValue as number) && isValueWithStatusSet(curr.balanceValue)) {
      const stateNr = isValueWithStatusSet(state) ? state as number : 0;
      return stateNr + (curr.balanceValue as number);
    }
    return state;
  }, ValueStatus.LOADING) : ValueStatus.NO_DATA;

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
  }, []);

  return (
    <div className="w-100">
      <div className="mb-4 row">
        <Balance balance={totalBalance} />
        <ActionButtons />
      </div>
      <TokenBalances tokens={signerTokenBalances} />
    </div>
  );
};

export default Dashboard;
