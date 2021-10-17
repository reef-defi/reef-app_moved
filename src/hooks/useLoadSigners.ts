import { hooks, rpc, utils } from '@reef-defi/react-lib';
import { Provider } from '@reef-defi/evm-provider';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { useAppDispatch } from '../store';
import { selectSignerIndex, setSigners, setSignersLoading } from '../store/actions/signers';
import { getSignerLocalPointer } from '../store/localStore';
import { reloadTokens } from '../store/actions/tokens';

const { ensure } = utils;
const { useAsyncEffect } = hooks;

export const useLoadSigners = (provider?: Provider): void => {
  const dispatch = useAppDispatch();

  useAsyncEffect(async () => {
    if (!provider) { return; }

    try {
      dispatch(setSignersLoading(true));
      const inj = await web3Enable('Reef-App');
      ensure(inj.length > 0, 'Reef-App can not be access Polkadot-Extension. Please install <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot-Extension</a> in your browser and refresh the page to use Reefswap.');

      const web3accounts = await web3Accounts();
      ensure(web3accounts.length > 0, 'Reef-App requires at least one account in Polkadot-extension. Please create or import account/s and refresh the page.');

      const signers = await rpc.accountsToSigners(
        web3accounts,
        provider,
        inj[0].signer,
      );

      // TODO signers objects are large cause of provider object inside. Find a way to overcome this problem.
      const pointer = getSignerLocalPointer();
      // dispatch(accountsSetAccounts(signers));
      dispatch(setSigners(signers));
      dispatch(selectSignerIndex(pointer));
      dispatch(reloadTokens());
    } catch (e) {
      console.log('Error when loading signers!');
      console.error(e);
    } finally {
      dispatch(setSignersLoading(false));
    }
  }, [provider]);
};
