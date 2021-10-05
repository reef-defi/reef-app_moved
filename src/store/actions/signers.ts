import { ReefSigner } from '@reef-defi/react-lib';
import { SELECT_SIGNER_ACTION, SET_SIGNERS_ACTION } from '../actionCreator';

interface SetSigners {
  type: typeof SET_SIGNERS_ACTION;
  signers: ReefSigner[];
}

interface SelectSigner {
  type: typeof SELECT_SIGNER_ACTION;
  index: number;
}

export type SignersActions =
  | SetSigners
  | SelectSigner;

export const setSigners = (signers: ReefSigner[]): SetSigners => ({
  signers,
  type: SET_SIGNERS_ACTION,
});

export const selectSigner = (index: number): SelectSigner => ({
  index,
  type: SELECT_SIGNER_ACTION,
});
