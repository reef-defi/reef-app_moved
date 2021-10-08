import { ReefSigner, Token } from '@reef-defi/react-lib';
import {
  SET_SIGNERS_LOADING,
  SELECT_SIGNER_ACTION,
  SET_SIGNERS_ACTION,
  SET_SIGNER_TOKENS_ACTION,
  SET_SIGNER_BALANCE_ACTION,
} from '../actionCreator';

interface SetSigners {
    type: typeof SET_SIGNERS_ACTION;
    signers: ReefSigner[];
}

interface SelectSigner {
    type: typeof SELECT_SIGNER_ACTION;
    index: number;
}

interface SetSignerTokens {
    type: typeof SET_SIGNER_TOKENS_ACTION;
    tokens: Token[];
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
    | SetSignerTokens
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

export const setSignerTokens = (tokens: Token[]): SetSignerTokens => ({
  tokens,
  type: SET_SIGNER_TOKENS_ACTION,
});

export const setSignerBalance = (balance: string): SetSignerBalance => ({
  balance,
  type: SET_SIGNER_BALANCE_ACTION,
});

export const setSignersLoading = (loading: boolean): SetSignerLoading => ({
  loading,
  type: SET_SIGNERS_LOADING,
});
