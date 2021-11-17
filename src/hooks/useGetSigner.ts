import { ReefSigner, rpc, hooks } from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { Provider } from '@reef-defi/evm-provider';
import { GrReturn } from 'react-icons/all';
import { useAppSelector } from '../store';
import { currentNetwork } from '../environment';

interface CallbackFn {(val:string): void;}
let lastCachedId: { id: string, value: string } | undefined;
let callbacks: CallbackFn[] = [];
const getCachedValue = async (id: string, signer: ReefSigner, provider: Provider, callback: CallbackFn): Promise<void> => {
  if (lastCachedId && lastCachedId.id === id) {
    return callback(lastCachedId.value);
  }
  lastCachedId = undefined;
  ...
  console.log('GETTTT=');
  const value = await rpc.getReefCoinBalance(signer.address, provider);
  lastCachedId = { id, value };
  callbacks.forEach((c:CallbackFn) => c(lastCachedId?.value || ''));
  callbacks = [];
  return Promise.resolve();
};

export const useGetSigner = (): ReefSigner|undefined => {
  const [provider] = hooks.useProvider(currentNetwork.rpcUrl);
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  const { reloadToggle: reloadTokens } = useAppSelector((state) => state.tokens);

  const selSigner = accounts[selectedAccount];
  useEffect(() => {
    const resetBal = async (sigr: ReefSigner, prov: Provider): Promise<void> => {
      // const bal = await selSigner.signer.getBalance();
      await getCachedValue(reloadTokens.toString(), sigr, prov, (val:string) => {
        selSigner.balance = val;
      });
      console.log('resetBBB=', selSigner.balance, reloadTokens);
    };
    if (selSigner && provider) {
      resetBal(selSigner, provider);
    }
  }, [reloadTokens]);

  return selectedAccount !== -1
    ? selSigner
    : undefined;
};
