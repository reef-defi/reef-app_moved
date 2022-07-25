import { utils } from '@reef-defi/react-lib';

export interface UrlAddressParams {
  address1: string;
  address2: string;
}

export const SPECIFIED_SWAP_URL = '/swap/:address1/:address2';
export const POOLS_URL = '/pools';
export const SETTINGS_URL = '/settings';
export const DASHBOARD_URL = '/dashboard';
export const ADD_LIQUIDITY_URL = '/add-supply/:address1/:address2';
export const POOL_CHART_URL = '/chart/:address/:action';
export const REMOVE_LIQUIDITY_URL = '/remove-supply/:address1/:address2';
export const TRANSFER_TOKEN = '/send';
export const CREATE_ERC20_TOKEN_URL = '/create-token';
export const BONDS_URL = '/bonds';
export const BIND_URL = '/bind/:address1';

export const addressReplacer = (url: string, address1: string, address2?: string): string => {
  const replaced = url.replace(':address1', address1);
  if (address2) {
    replaced.replace(':address2', address2);
  }
  return replaced;
};

export const defaultSwapUrl = addressReplacer(SPECIFIED_SWAP_URL, utils.REEF_ADDRESS, utils.EMPTY_ADDRESS);
export const defaultAddliquidityUrl = addressReplacer(ADD_LIQUIDITY_URL, utils.REEF_ADDRESS, utils.EMPTY_ADDRESS);
