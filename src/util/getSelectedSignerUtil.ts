import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';

export default function useSelectedSignerAddress(): string|undefined {
  const { accounts, selectedAccount } = useAppSelector((appState) => appState.accounts);
  const [address, setAddress] = useState<string>();
  const selSignerAddr: string|undefined = selectedAccount > -1 && accounts.length >= selectedAccount ? accounts[selectedAccount].address : undefined;
  useEffect(() => setAddress(selSignerAddr), [selectedAccount]);
  return address;
}
