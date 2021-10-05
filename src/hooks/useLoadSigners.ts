import { ReefSigner, hooks, utils } from '@reef-defi/react-lib';
import { Provider, Signer } from '@reef-defi/evm-provider';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import type { Signer as InjectedSigner } from '@polkadot/api/types';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useAppDispatch } from '../store';
import { selectSigner, setSigners } from '../store/actions/signers';
import { getSignerLocalPointer } from '../store/internalStore';

const { ensure } = utils;
const { useAsyncEffect } = hooks;

const accountToSigner = async (account: InjectedAccountWithMeta, provider: Provider, sign: InjectedSigner): Promise<ReefSigner> => {
  const signer = new Signer(provider, account.address, sign);
  const evmAddress = await signer.getAddress();
  const isEvmClaimed = await signer.isClaimed();

  return {
    signer,
    evmAddress,
    isEvmClaimed,
    name: account.meta.name || '',
    address: account.address,
  };
};

const accountsToSigners = async (accounts: InjectedAccountWithMeta[], provider: Provider, sign: InjectedSigner): Promise<ReefSigner[]> => Promise.all(accounts.map((account) => accountToSigner(account, provider, sign)));

export const useLoadSigners = (provider?: Provider): void => {
  const dispatch = useAppDispatch();

  useAsyncEffect(async () => {
    if (!provider) { return; }

    try {
      const inj = await web3Enable('Reef-App');
      ensure(inj.length > 0, 'Reef-App can not be access Polkadot-Extension. Please install <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot-Extension</a> in your browser and refresh the page to use Reefswap.');

      const web3accounts = await web3Accounts();
      ensure(web3accounts.length > 0, 'Reef-App requires at least one account in Polkadot-extension. Please create or import account/s and refresh the page.');

      const signers = await accountsToSigners(
        web3accounts,
        provider,
        inj[0].signer,
      );

      const pointer = getSignerLocalPointer();
      dispatch(setSigners(signers));
      dispatch(selectSigner(pointer));
    } catch (e) {
      console.log('Error when loading signers!');
      console.error(e);
    }
  }, [provider]);
};
