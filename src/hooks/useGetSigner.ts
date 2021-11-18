import { ReefSigner, rpc, hooks } from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { Provider } from '@reef-defi/evm-provider';
import { useAppSelector } from '../store';
import { currentNetwork } from '../environment';
import { getLastCachedValue } from '../utils/cacheUtils';

export const useGetSigner = (): ReefSigner|undefined => {
  const [provider] = hooks.useProvider(currentNetwork.rpcUrl);
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  const { reloadToggle: reloadTokens } = useAppSelector((state) => state.tokens);

  const selSigner = accounts[selectedAccount];
  useEffect(() => {
    const resetBal = async (sigr: ReefSigner, prov: Provider): Promise<void> => {
      const balanceForAddr = selSigner.address;
      getLastCachedValue<string>(reloadTokens + balanceForAddr, () => rpc.getReefCoinBalance(balanceForAddr, provider), (val:string) => {
        if (selSigner.address === balanceForAddr) {
          selSigner.balance = val;
        }
      });
    };
    if (selSigner && provider) {
      resetBal(selSigner, provider);
    }
  }, [reloadTokens, selectedAccount]);

  return selectedAccount !== -1
    ? selSigner
    : undefined;
};
