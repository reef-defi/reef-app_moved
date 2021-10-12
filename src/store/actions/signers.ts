import { ReefSigner } from '@reef-defi/react-lib';
import {
  SELECT_SIGNER_ACTION,
  SET_SIGNER_BALANCE_ACTION,
  SET_SIGNERS_ACTION,
  SET_SIGNERS_LOADING,
} from '../actionCreator';

interface SetSigners {
    type: typeof SET_SIGNERS_ACTION;
    signers: ReefSigner[];
}

interface SelectSigner {
    type: typeof SELECT_SIGNER_ACTION;
    index: number;
}

interface SetSignerBalance {
    type: typeof SET_SIGNER_BALANCE_ACTION;
    balance: string;
}

interface SetSignerLoading {
    type: typeof SET_SIGNERS_LOADING;
    loading: boolean;
}

export type SignersActions =
    | SetSigners
    | SelectSigner
    | SetSignerLoading
    | SetSignerBalance;

export const setSigners = (signers: ReefSigner[]): SetSigners => ({
  signers,
  type: SET_SIGNERS_ACTION,
});

export const selectSignerIndex = (index: number): SelectSigner => ({
  index,
  type: SELECT_SIGNER_ACTION,
});

export const setSignerBalance = (balance: string): SetSignerBalance => ({
  balance,
  type: SET_SIGNER_BALANCE_ACTION,
});

export const setSignersLoading = (loading: boolean): SetSignerLoading => ({
  loading,
  type: SET_SIGNERS_LOADING,
});
