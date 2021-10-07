import { ReefSigner } from '@reef-defi/react-lib';
import { SET_SIGNERS_LOADING, SELECT_SIGNER_ACTION, SET_SIGNERS_ACTION } from '../actionCreator';

interface SetSigners {
  type: typeof SET_SIGNERS_ACTION;
  signers: ReefSigner[];
}

interface SelectSigner {
  type: typeof SELECT_SIGNER_ACTION;
  index: number;
}

interface SetSignerLoading {
  type: typeof SET_SIGNERS_LOADING;
  loading: boolean;
}

export type SignersActions =
  | SetSigners
  | SelectSigner
  | SetSignerLoading;

export const setSigners = (signers: ReefSigner[]): SetSigners => ({
  signers,
  type: SET_SIGNERS_ACTION,
});

export const selectSigner = (index: number): SelectSigner => ({
  index,
  type: SELECT_SIGNER_ACTION,
});

export const setSignersLoading = (loading: boolean): SetSignerLoading => ({
  loading,
  type: SET_SIGNERS_LOADING
});