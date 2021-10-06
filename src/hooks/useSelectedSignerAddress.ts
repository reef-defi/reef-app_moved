import { useEffect, useState } from 'react';
import { ReefSigner } from '@reef-defi/react-lib';
import { useAppSelector } from '../store/hooks';

export default function useSelectedSignerAddress(accounts: ReefSigner[], selectedAccount: number): string|undefined {
  const [address, setAddress] = useState<string | undefined>();
  useEffect(() => {
    if (!accounts || selectedAccount == null) { return; }
    if (selectedAccount < 0) {
      setAddress(undefined);
      return;
    }
    const selSignerAddr: string|undefined = selectedAccount > -1 && accounts.length >= selectedAccount ? accounts[selectedAccount].address : undefined;
    setAddress(selSignerAddr);
  }, [accounts, selectedAccount]);
  return address;
}
