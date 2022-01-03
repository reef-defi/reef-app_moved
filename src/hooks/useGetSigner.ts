import { ReefSigner } from '@reef-defi/react-lib';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';

export const useGetSigner = (): ReefSigner|undefined => {
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  const [selectedSigner, setSelectedSigner] = useState<ReefSigner|undefined>();

  useEffect(() => {
    if (!accounts || !accounts.length) {
      setSelectedSigner(undefined);
      return;
    }
    setSelectedSigner(selectedAccount !== -1 ? accounts[selectedAccount] : undefined);
  }, [selectedAccount, accounts]);
  return selectedSigner;
};
