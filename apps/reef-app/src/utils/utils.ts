import { Notify } from '@reef-defi/react-lib';
import { utils as ethUtils, BigNumber } from 'ethers';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export const notify = (message: string, type: Notify='success'): void => {
  toast[type](message);
};

export const toCurrencyFormat = (value: number, options?: any): string => Intl.NumberFormat(navigator.language, {
  style: 'currency', currency: 'USD', currencyDisplay: 'symbol', ...options,
}).format(value);

export const delay = async (milliseconds: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, milliseconds);
});

export const shortAddress = (address: string): string => (address.length > 10
  ? `${address.slice(0, 5)}...${address.slice(address.length - 5, address.length)}`
  : address);

export const formatDate = (timestamp: string|number): string => {
  let date = new Date(timestamp);
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset * 60 * 1000));
  const formatted = date.toISOString().split('T')[0];
  return formatted.split('-').reverse().join('-');
};

export const toHumanAmount = (amount: string): string => {
  const head = amount.slice(0, amount.indexOf('.'));
  const amo = amount.replace('.', '');

  if (head.length > 9) {
    return `${amo.slice(0, head.length - 9)}.${amo.slice(head.length - 9, head.length - 9 + 2)} B`;
  }
  if (head.length > 6) {
    return `${amo.slice(0, head.length - 6)}.${amo.slice(head.length - 6, head.length - 6 + 2)} M`;
  }
  if (head.length > 3) {
    return `${amo.slice(0, head.length - 3)}.${amo.slice(head.length - 3, head.length - 3 + 2)} k`;
  }
  return amount.slice(0, head.length + 4);
};

export const formatAgoDate = (timestamp: number|string): string => {
  const now = new Date(Date.now());
  const date = new Date(timestamp);

  const difference = now.getTime() - date.getTime();
  if (difference < 1000 * 60) {
    return `${Math.round(difference / 1000)}sec ago`;
  }
  if (difference < 1000 * 60 * 60) {
    return `${Math.round(difference / 60000)}min ago`;
  }
  if (difference < 1000 * 60 * 60 * 24) {
    return `${Math.round(difference / 3600000)}h ago`;
  }
  return date.toDateString();
};

export const formatAmount = (amount: number, decimals: number): string => toHumanAmount(
  ethUtils.formatUnits(
    BigNumber.from(
      amount.toLocaleString('fullwide', { useGrouping: false }),
    ).toString(),
    decimals,
  ),
);

export const toTimestamp = (d: Date): string => `${d.getFullYear()}-${d.getMonth() > 9 ? d.getMonth() : `0${d.getMonth()}`}-${d.getUTCDay() > 9 ? d.getUTCDay() : `0${d.getUTCDay()}`}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}+00:00`;

export const dropDuplicatesMultiKey = <Obj, Key extends keyof Obj>(
  objects: Obj[],
  keys: Key[],
): Obj[] => {
  const existingKeys = new Set<string>();
  const filtered: Obj[] = [];

  for (let index = objects.length - 1; index >= 0; index -= 1) {
    const obj = objects[index];
    const ids = keys.map((key) => obj[key]).join(', ');
    if (!existingKeys.has(ids)) {
      filtered.push(obj);
      existingKeys.add(ids);
    }
  }

  return filtered;
};

export const mean = (arr: number[]): number => arr.reduce((acc, v) => acc + v) / arr.length;
export const variance = (arr: number[]): number => {
  const avg = mean(arr);
  const squareDiffs = arr.map((v) => {
    const diff = avg - v;
    return diff * diff;
  });
  return mean(squareDiffs);
};
export const std = (arr: number[]): number => Math.sqrt(variance(arr));

export const toDecimal = (num: string|number, decimals: number): number => {
  const n = `${num}`;
  if (n.length > decimals) {
    const val = `${n.slice(0, n.length - decimals)}.${n.slice(n.length - decimals, n.length)}`;
    return parseFloat(val);
  }
  const val = `${Array(decimals).fill('0').join('')}.${n}`;
  return parseFloat(val);
};
