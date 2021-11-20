import { ReefSigner } from '@reef-defi/react-lib';
import { useAppSelector } from '../store';

export const useGetSigner = (): ReefSigner|undefined => {
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);

  return selectedAccount !== -1
    ? accounts[selectedAccount]
    : undefined;
};
