import { ReefSigner, rpc, hooks } from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { Provider } from '@reef-defi/evm-provider';
import { useAppSelector } from '../store';
import { currentNetwork } from '../environment';

const resetBal = async (sigr: ReefSigner, prov: Provider): Promise<void> => {
  const balanceForAddr = sigr.address;
  const balance = await rpc.getReefCoinBalance(balanceForAddr, prov);
  // eslint-disable-next-line no-param-reassign
  sigr.balance = balance;
};

export const useReloadSelectedBalance = (): void => {
  const { selectedAccount: accountIndex, accounts } = useAppSelector((state) => state.signers);
  const { reloadToggle: reloadTokens } = useAppSelector((state) => state.tokens);
  const [provider] = hooks.useProvider(currentNetwork.rpcUrl);

  useEffect(() => {
    const selectedSigner = accounts[accountIndex];
    if (selectedSigner && provider) {
      resetBal(selectedSigner, provider);
    }
  }, [reloadTokens, provider]);
};
