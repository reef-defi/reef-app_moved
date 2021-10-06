import { Signer } from '@reef-defi/evm-provider';
import {
  ReefSigner, rpc, Token, TokenWithAmount,
} from '@reef-defi/react-lib';
import {
  SET_ACCOUNT,
  SET_ACCOUNTS, SET_ACCOUNT_BALANCE, SET_SELECTED_ACCOUNT, SET_ACCOUNT_TOKENS,
} from '../actionCreator';

interface SetAccountsAction {
  type: typeof SET_ACCOUNTS;
  accounts: ReefSigner[];
}

interface SetSelectedAccountAction {
  type: typeof SET_SELECTED_ACCOUNT;
  index: number;
}

interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  signer: ReefSigner;
}

interface SetAccountBalanceAction {
  type: typeof SET_ACCOUNT_BALANCE;
  balance: string;
}

interface SetAccountTokensAction {
  type: typeof SET_ACCOUNT_TOKENS;
  tokens: Token[];
}

export type UtilsActions =
  | SetAccountAction
  | SetAccountsAction
  | SetAccountBalanceAction
  | SetSelectedAccountAction
  | SetAccountTokensAction;
/*
export const accountsSetAccount = (signer: ReefSigner): SetAccountAction => ({
  type: SET_ACCOUNT,
  signer,
});

export const accountsSetAccounts = (accounts: ReefSigner[]): SetAccountsAction => ({
  type: SET_ACCOUNTS,
  accounts,
});
*/

export const accountsSetAccountBalance = (balance: string): SetAccountBalanceAction => ({
  type: SET_ACCOUNT_BALANCE,
  balance,
});

export const accountsSetAccountTokens = (tokens: Token[]): SetAccountTokensAction => ({
  type: SET_ACCOUNT_TOKENS,
  tokens,
});
/*
export const accountsSetSelectedAccount = (index: number): SetSelectedAccountAction => ({
  type: SET_SELECTED_ACCOUNT,
  index,
});
*/
