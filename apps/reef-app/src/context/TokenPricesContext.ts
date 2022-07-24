import { createContext } from 'react';

type TokenPrices = {
  [address: string]: number;
}

export default createContext<TokenPrices>({});
