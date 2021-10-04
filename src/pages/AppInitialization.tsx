import React, { useEffect, useRef, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { WsProvider } from '@polkadot/api';
import { Provider } from '@reef-defi/evm-provider';
import {
  Components, rpc, utils, hooks,
} from '@reef-defi/react-lib';
import ContentRouter from './ContentRouter';
import {
  accountsSetAccountBalance,
  accountsSetAccounts, accountsSetAccountTokens,
  accountsSetSelectedAccount,
} from '../store/actions/accounts';
import { setAllTokensAction } from '../store/actions/tokens';
import {
  ErrorState, LoadingMessageState, SuccessState, toError, toLoadingMessage, toSuccess,
} from '../store/internalStore';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSignerLocalPointer } from '../store/localStore';

type State =
  | ErrorState
  | SuccessState
  | LoadingMessageState;

const AppInitialization = (): JSX.Element => {
  const mounted = useRef(true);
  const dispatch = useAppDispatch();
  const settings = useAppSelector((appState) => appState.settings);

  const [state, setState] = useState<State>(toLoadingMessage(''));
  const [provider, setProvider] = useState<Provider>();

  const message = (msg: string): void => setState(toLoadingMessage(msg));
  const { accounts, selectedAccount } = useAppSelector((appState) => appState.accounts);

  hooks.useUpdateAccountBalance(selectedAccount > -1 && accounts.length >= selectedAccount ? accounts[selectedAccount].address : undefined, provider);
  // Initial setup
  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        message(`Connecting to ${settings.name.replace(/\b\w/g, (l) => l.toUpperCase())} chain...`);
        const newProvider = new Provider({
          provider: new WsProvider(utils.availableReefNetworks.mainnet.rpcUrl),
        });
        await newProvider.api.isReadyOrError;
        console.log('PROVIDER CONN');

        message('Connecting to Polkadot extension...');
        const inj = await web3Enable('Reefswap');
        utils.ensure(inj.length > 0, 'Reefswap can not be access Polkadot-Extension. Please install <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/" target="_blank">Polkadot-Extension</a> in your browser and refresh the page to use Reefswap.');

        message('Retrieving accounts...');
        const web3accounts = await web3Accounts();
        utils.ensure(web3accounts.length > 0, 'Reefswap requires at least one account Polkadot-extension. Please create or import account/s and refresh the page.');

        message('Creating signers...');
        const signers = await rpc.accountsToSigners(
          web3accounts,
          newProvider,
          inj[0].signer,
        );

        const signerPointer = getSignerLocalPointer();
        const selectedSigner = signers.length >= signerPointer ? signerPointer : 0;

        setProvider(newProvider);

        message('Loading tokens...');
        const verifiedTokens = await rpc.loadVerifiedERC20Tokens();
        // TODO move out of interval
        const newTokens = await rpc.loadTokens(verifiedTokens, signers[selectedSigner].signer);
        dispatch(setAllTokensAction(newTokens));

        dispatch(accountsSetAccounts(signers));
        // Make sure selecting account is after setting signers
        // Else error will occure
        dispatch(accountsSetSelectedAccount(selectedSigner));
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
      provider?.api.disconnect();
    };
  }, [settings.reload]);
  useEffect(() => {
    message('Loading account tokens ...');
    if (selectedAccount === -1 || !provider) { return; }
    const exeInterval = async (): Promise<void> => {
      try {
        if (selectedAccount === -1 || !provider) { return; }
        const { address, signer } = accounts[selectedAccount];

        const accountTokens = await rpc.loadAccountTokens(signer, settings);
        dispatch(accountsSetAccountTokens(accountTokens));

        const providerBalance = await provider.api.derive.balances.all(address);
        const freeBalance = providerBalance.freeBalance.toHuman();
        const result = freeBalance === '0' ? '0 REEF' : freeBalance;
        console.log('bb', result);
        dispatch(accountsSetAccountBalance(result));
      } catch (error) {
        console.log('loading account err', error);
      }
    };
    // const intervalId = setInterval(() => exeInterval(), 1000);
    setState(toSuccess());
    exeInterval();
    // eslint-disable-next-line consistent-return
    return () => {
      // clearInterval(intervalId);
    };
  }, [selectedAccount, provider]);

  return (
    <>
      {state._type === 'SuccessState' && <ContentRouter /> }
      {state._type === 'LoadingMessageState' && <Components.Loading.LoadingWithText text={state.message} />}
      {state._type === 'ErrorState' && <Components.Card.ErrorCard title={state.title} message={state.message} />}
    </>
  );
};

export default AppInitialization;
