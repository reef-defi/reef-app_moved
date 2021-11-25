import { Notify } from '@reef-defi/react-lib';

// eslint-disable-next-line
export const notify = (message: string, type: Notify): void => {};
export const toCurrencyFormat = (value: number, options?: any): string => Intl.NumberFormat(navigator.language, {
  style: 'currency', currency: 'USD', currencyDisplay: 'symbol', ...options,
}).format(value);

export const toDecimalPlaces = (value: string, maxDecimalPlaces: number): string => {
  const decimalDelim = value.indexOf('.');
  if (!value || decimalDelim < 1 || value.length - decimalDelim < maxDecimalPlaces) {
    return value;
  }
  return value.substring(0, decimalDelim + 1 + maxDecimalPlaces);
};

export const delay = async (milliseconds: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, milliseconds);
});
