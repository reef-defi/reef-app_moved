import React, { useEffect, useRef, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { WsProvider } from '@polkadot/api';
import { Provider } from '@reef-defi/evm-provider';
// import { LoadingWithText } from '@reef-defi/react-lib/dist/components/common/Loading';
// import ErrorCard from '@reef-defi/react-lib/dist/components/common/Error/ErrorCard';
import * as ErrorCard from '@reef-defi/react-lib/dist/components/common/Error/ErrorCard';
import * as LoadingWithText from '@reef-defi/react-lib/dist/components/common/Loading';
import ContentRouter from './ContentRouter';
import {
  accountsSetAccounts, accountsSetAccountTokens,
  accountsSetSelectedAccount,
} from '../store/actions/accounts';
import { setAllTokensAction } from '../store/actions/tokens';
import { ensure } from '../moveToLib/utils/utils';
import {
  ErrorState, LoadingMessageState, SuccessState, toError, toLoadingMessage, toSuccess,
} from '../store/internalStore';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { accountsToSigners } from '../moveToLib/rpc/accounts';
import { loadVerifiedERC20Tokens, loadTokens, loadAccountTokens } from '../moveToLib/rpc/tokens';
import { getSignerLocalPointer } from '../store/localStore';
import { useUpdateAccountBalance } from '../hooks/useUpdateAccountBalance';

type State =
  | ErrorState
  | SuccessState
  | LoadingMessageState;

const AppInitialization = (): JSX.Element => {
  const mounted = useRef(true);
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const [state, setState] = useState<State>(toLoadingMessage(''));
  const [provider, setProvider] = useState<Provider>();

  const message = (msg: string): void => setState(toLoadingMessage(msg));

  useUpdateAccountBalance(provider);
  // Initial setup
  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        message(`Connecting to ${settings.name.replace(/\b\w/g, (l) => l.toUpperCase())} chain...`);
        const newProvider = new Provider({
          provider: new WsProvider(settings.rpcUrl),
        });
        await newProvider.api.isReadyOrError;

        message('Connecting to Polkadot extension...');
        const inj = await web3Enable('Reefswap');
        ensure(inj.length > 0, 'Reefswap can not be access Polkadot-Extension. Please install <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/" target="_blank">Polkadot-Extension</a> in your browser and refresh the page to use Reefswap.');

        message('Retrieving accounts...');
        const web3accounts = await web3Accounts();
        ensure(web3accounts.length > 0, 'Reefswap requires at least one account Polkadot-extension. Please create or import account/s and refresh the page.');

        message('Creating signers...');
        const signers = await accountsToSigners(
          web3accounts,
          newProvider,
          inj[0].signer,
        );

        const signerPointer = getSignerLocalPointer();
        const selectedSigner = signers.length >= signerPointer ? signerPointer : 0;
        message('Loading tokens...');
        const verifiedTokens = await loadVerifiedERC20Tokens(settings);
        const newTokens = await loadTokens(verifiedTokens, signers[selectedSigner].signer);
        const accountTokens = await loadAccountTokens(signers[selectedSigner].signer, settings);

        setProvider(newProvider);
        dispatch(setAllTokensAction(newTokens));
        dispatch(accountsSetAccounts(signers));
        // Make sure selecting account is after setting signers
        // Else error will occure
        dispatch(accountsSetSelectedAccount(selectedSigner));
        dispatch(accountsSetAccountTokens(accountTokens));
        setState(toSuccess());
      } catch (e: any) {
        if (e.message) {
          setState(toError('Polkadot extension', e.message));
        } else {
          setState(toError('RPC', 'Can not connect to the chain, try connecting later...'));
        }
      }
    };

    load();
    return () => {
      mounted.current = false;
    };
  }, [settings.rpcUrl, settings.reload]);

  return (
    <>
      {state._type === 'SuccessState' && <ContentRouter /> }
      {state._type === 'LoadingMessageState' && <div>loading - TODO LoadingWithText</div>}
      {state._type === 'ErrorState' && <div>error - TODO ErrorCard</div>}
      {/* {state._type === 'LoadingMessageState' && <LoadingWithText text={state.message} />} */}
      {/* {state._type === 'ErrorState' && <ErrorCard title={state.title} message={state.message} />} */}
    </>
  );
};

export default AppInitialization;
