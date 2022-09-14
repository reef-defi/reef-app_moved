import BigNumber from 'bignumber.js';
import Uik from '@reef-defi/ui-kit';
import { Token, utils } from '@reef-defi/react-lib';

export const displayBalance = (balance: string | number): string => {
  if (typeof balance === 'string') {
    // eslint-disable-next-line
    balance = new BigNumber(balance).toNumber();
  }

  // eslint-disable-next-line
  if (isNaN(balance)) return '0';

  if (balance >= 1000000) {
    const humanReadableBalance = Uik.utils.formatHumanAmount(balance);
    if (humanReadableBalance === 'NaN') return '0';
    return humanReadableBalance;
  }

  return String(balance);
};

export const displayBalanceFromToken = (token: Token): string => {
  const balance = new BigNumber(utils.showBalance(token).replace(token.name, '').replace(token.symbol, '')).toNumber();
  return displayBalance(balance);
};
