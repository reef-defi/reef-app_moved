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
export const shortAddress = (address: string): string => address.length > 10
  ? address.slice(0, 5) + "..." + address.slice(address.length-5, address.length)
  : address;

export const formatDate = (timestamp: string|number) => {
  let date = new Date(timestamp)
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))
  const formatted = date.toISOString().split('T')[0]
  return formatted.split("-").reverse().join("-")
}