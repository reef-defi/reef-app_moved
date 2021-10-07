import { Signer } from '@reef-defi/evm-provider';
import { ReefSigner } from '@reef-defi/react-lib';

export default function getSelectedSigner(accounts: ReefSigner[], selectedAccount: number): Signer|undefined {
  if (!accounts || selectedAccount == null) { return undefined; }
  return selectedAccount > -1 && accounts.length >= selectedAccount ? accounts[selectedAccount].signer : undefined;
}
