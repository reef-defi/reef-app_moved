import { Notify } from '@reef-defi/react-lib';

// eslint-disable-next-line
export const notify = (message: string, type: Notify): void => {};
export const toCurrencyFormat = (value: number, options?: any): string => Intl.NumberFormat(navigator.language, {
  style: 'currency', currency: 'USD', currencyDisplay: 'symbol', ...options,
}).format(value);
