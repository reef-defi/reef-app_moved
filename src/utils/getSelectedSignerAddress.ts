import { ReefSigner } from '@reef-defi/react-lib';

export default function getSelectedSignerAddress(accounts: ReefSigner[], selectedAccount: number): string|undefined {
  if (!accounts || selectedAccount == null) { return undefined; }
  if (selectedAccount < 0) {
    return undefined;
  }
  return selectedAccount > -1 && accounts.length >= selectedAccount ? accounts[selectedAccount].address : undefined;
}
