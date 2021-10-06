import { useEffect, useState } from 'react';
import { Signer } from '@reef-defi/evm-provider';
import { ReefSigner } from '@reef-defi/react-lib';

export default function useSelectedSigner(accounts: ReefSigner[], selectedAccount: number): Signer|undefined {
  const [signer, setSigner] = useState<Signer>();
  useEffect(() => {
    if (!accounts || selectedAccount == null) { return; }
    const selSigner: Signer|undefined = selectedAccount > -1 && accounts.length >= selectedAccount ? accounts[selectedAccount].signer : undefined;
    setSigner(selSigner);
  }, [accounts, selectedAccount]);
  return signer;
}
