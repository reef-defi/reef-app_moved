import { Notify, reefTokenWithAmount, utils } from '@reef-defi/react-lib';

const reefToken = reefTokenWithAmount();
// eslint-disable-next-line
export const notify = (message: string, type: Notify): void => {};
export const toCurrencyFormat = (value: number, options?: any): string => Intl.NumberFormat(navigator.language, {
  style: 'currency', currency: 'USD', currencyDisplay: 'symbol', ...options,
}).format(value);

export const delay = async (milliseconds: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, milliseconds);
});

export const getIconUrl = (tokenAddress: string): string => {
  if (tokenAddress === reefToken.address) {
    return reefToken.iconUrl;
  }
  const lastNr = utils.getHashSumLastNr(tokenAddress);
  return `/img/token-icons/token-icon-${lastNr}.png`;
};
