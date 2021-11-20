import { api } from '@reef-defi/react-lib';
import { useEffect, useState } from 'react';
import { ValueStatus, ValueWithStatus } from './useSignerTokenBalances';

const { retrieveReefCoingeckoPrice } = api;

export const useReefPrice = (): ValueWithStatus<number> => {
  const [reefPrice, setReefPrice] = useState<ValueWithStatus<number>>(ValueStatus.LOADING);
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
  return reefPrice;
};
