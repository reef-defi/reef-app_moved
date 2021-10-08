import { Signer } from '@reef-defi/evm-provider';
import { useAppSelector } from '../store';

export const useGetSigner = (): Signer|undefined => {
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  return selectedAccount !== -1
    ? accounts[selectedAccount].signer
    : undefined;
};
