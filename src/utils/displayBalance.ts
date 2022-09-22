import BigNumber from 'bignumber.js';
import { Token, utils } from '@reef-defi/react-lib';

export const formatHumanAmount = (value = ''): string => {
  let amount = new BigNumber(value.replaceAll(',', ''));
  let output = '';

  if (amount.isNaN()) return amount.toString();

  const decPlaces = 100;
  const abbrev = ['k', 'M', 'B'];

  for (let i = abbrev.length - 1; i >= 0; i -= 1) {
    // eslint-disable-next-line
    const size = Math.pow(10, (i + 1) * 3);

    if (amount.isGreaterThanOrEqualTo(size)) {
      amount = amount.times(decPlaces).dividedBy(size).integerValue().dividedBy(decPlaces);

      if (amount.isEqualTo(1000) && (i < abbrev.length - 1)) {
        amount = BigNumber(1);
        i += 1;
      }

      output = `${amount.toString()} ${abbrev[i]}`;
      break;
    }
  }

  return output;
};

export const displayBalance = (value: string | number): string => {
  // eslint-disable-next-line
  const balance = new BigNumber(value);

  if (balance.isNaN()) return '0';

  if (balance.isGreaterThanOrEqualTo(1000000)) {
    const humanReadableBalance = formatHumanAmount(balance.toString());
    return humanReadableBalance;
  }

  return balance.toString();
};

export const displayBalanceFromToken = (token: Token): string => {
  const balance = new BigNumber(utils.showBalance(token).replace(token.name, '').replace(token.symbol, '')).toString();
  return displayBalance(balance);
};
