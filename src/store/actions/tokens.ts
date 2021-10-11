import { Token } from '@reef-defi/react-lib';
import {
  RELOAD_TOKENS_APPROVED,
  SET_TOKENS_APPROVED_ACTION,
  SET_TOKENS_APPROVED_LOADING,
  SET_TOKENS_SELECTED_SIGNER_ACTION,
  SET_TOKENS_SELECTED_SIGNER_LOADING,
} from '../actionCreator';

interface ReloadTokens {
  type: typeof RELOAD_TOKENS_APPROVED;
}

interface SetTokensApproved {
  type: typeof SET_TOKENS_APPROVED_ACTION;
  tokens: Token[];
}

interface SetTokensApprovedLoading {
  type: typeof SET_TOKENS_APPROVED_LOADING;
  loading: boolean;
}

interface SetTokensSignerBalance {
  type: typeof SET_TOKENS_SELECTED_SIGNER_ACTION;
  tokens: Token[];
}

interface SetTokensSignerBalanceLoading {
  type: typeof SET_TOKENS_SELECTED_SIGNER_LOADING;
  loading: boolean;
}

export type TokensActions =
  | ReloadTokens
  | SetTokensApproved
  | SetTokensSignerBalance
  | SetTokensSignerBalanceLoading
  | SetTokensApprovedLoading;

export const reloadTokensAvailable = (): ReloadTokens => ({
  type: RELOAD_TOKENS_APPROVED,
});

export const setTokensAvailable = (tokens: Token[]): SetTokensApproved => ({
  tokens,
  type: SET_TOKENS_APPROVED_ACTION,
});

export const setTokensAvailableLoading = (loading: boolean): SetTokensApprovedLoading => ({
  loading,
  type: SET_TOKENS_APPROVED_LOADING,
});

export const setTokensSignerBalance = (tokens: Token[]): SetTokensSignerBalance => ({
  tokens,
  type: SET_TOKENS_SELECTED_SIGNER_ACTION,
});

export const setTokensSignerBalanceLoading = (loading: boolean): SetTokensSignerBalanceLoading => ({
  loading,
  type: SET_TOKENS_SELECTED_SIGNER_LOADING,
});
