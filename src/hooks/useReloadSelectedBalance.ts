import { hooks, ReefSigner, rpc } from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { Provider } from '@reef-defi/evm-provider';
import { useAppDispatch, useAppSelector } from '../store';
import { currentNetwork } from '../environment';

const resetBal = async (sigr: ReefSigner, prov: Provider): Promise<void> => {
  const balanceForAddr = sigr.address;
  // eslint-disable-next-line no-param-reassign
  sigr.balance = await rpc.getReefCoinBalance(balanceForAddr, prov);
};

export const useReloadSelectedBalance = (): void => {
  const dispatch = useAppDispatch();
  const { selectedAccount: accountIndex, accounts } = useAppSelector((state) => state.signers);
  const { reloadToggle: reloadTokens } = useAppSelector((state) => state.tokens);
  const { provider } = useAppSelector((state) => state.app);
  useEffect(() => {
    const selectedSigner = accounts[accountIndex];
    if (selectedSigner && provider) {
      resetBal(selectedSigner, provider);
    }
  }, [reloadTokens, provider]);

  /* TODO handle websocket connection break for the callback listener
  useEffect(() => {
    const setupBalanceListener = async (): Promise<void> => {
      const selectedSigner = accounts[accountIndex];
      if (selectedSigner && provider) {
        hasRunOnce = true;
        const addr = await selectedSigner.signer.getSubstrateAddress();
        let { data: { free: previousFree }, nonce: previousNonce } = await provider.api.query.system.account(addr);
        provider.api.query.system.account(addr, ({ data: { free: currentFree }, nonce: currentNonce }) => {
          // Calculate the delta
          const change = currentFree.sub(previousFree);
          console.log('CHHHHH=', change.toString());
          // Only display positive value changes (Since we are pulling `previous` above already,
          // the initial balance change will also be zero)
          if (!change.isZero()) {
            console.log(`New balance change of ${change} to ${currentFree}, nonce ${currentNonce} `);
            previousFree = currentFree;
            previousNonce = currentNonce;
            selectedSigner.balance = BigNumber.from(currentFree.toString());
            // TODO like this balance change is not registered in the app need to dispatch selectedAccount
          }
        });
      }
    };
    if (!hasRunOnce) {
      setupBalanceListener();
    }
  }, [provider, accounts, accountIndex]); */
};
