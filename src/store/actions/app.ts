import { Provider } from '@reef-defi/evm-provider';
import { SET_PROVIDER, SET_PROVIDER_LOADING } from '../actionCreator';

interface SetProvider {
  type: typeof SET_PROVIDER;
  provider: Provider;
}

interface SetProviderLoading {
  type: typeof SET_PROVIDER_LOADING;
  loading: boolean;
}

export type AppActions =
  | SetProviderLoading
  | SetProvider;

export const setProvider = (provider: Provider): SetProvider => ({
  provider,
  type: SET_PROVIDER,
});

export const setProviderLoading = (loading: boolean): SetProviderLoading => ({
  loading,
  type: SET_PROVIDER_LOADING,
});
