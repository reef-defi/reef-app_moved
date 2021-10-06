import React, { useEffect, useRef, useState } from 'react';
import { availableNetworks, Components, hooks } from '@reef-defi/react-lib';
import ContentRouter from './ContentRouter';
import {
  ErrorState, LoadingMessageState, SuccessState, toLoadingMessage, toSuccess,
} from '../store/internalStore';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import useAccountBalanceToRedux from '../hooks/useAccountBalanceRedux';
import useSelectedSignerAddress from '../hooks/useSelectedSignerAddress';
import { useLoadSigners } from '../hooks/useLoadSigners';
import useSelectedSigner from '../hooks/useSelectedSigner';
import useLoadSelectedSignerTokens from '../hooks/useLoadTokens';

type State =
  | ErrorState
  | SuccessState
  | LoadingMessageState;

const AppInitialization = (): JSX.Element => {
  const mounted = useRef(true);
  const dispatch = useAppDispatch();
  const settings = useAppSelector((appState) => appState.settings);

  const [state, setState] = useState<State>(toLoadingMessage(''));

  const [provider, isProviderLoading, providerError] = hooks.useProvider(availableNetworks.mainnet.rpcUrl);
  useLoadSigners(provider);

  const message = (msg: string): void => setState(toLoadingMessage(msg));
  const { accounts, selectedAccount } = useAppSelector((appState) => appState.signers);
  const selectedAddress = useSelectedSignerAddress(accounts, selectedAccount);
  const selectedSigner = useSelectedSigner(accounts, selectedAccount);
  const selectedSignerTokens = useLoadSelectedSignerTokens(selectedSigner);
  useAccountBalanceToRedux(selectedAddress, provider);

  useEffect(() => () => {
    if (isProviderLoading) {
      message(`Connecting to ${settings.name.replace(/\b\w/g, (l) => l.toUpperCase())} chain...`);
    }
  }, [isProviderLoading]);

  useEffect(() => () => {
    setState(toSuccess());
  }, [selectedSignerTokens]);

  // Initial setup
  //   useEffect(() => {
  //     const load = async (): Promise<void> => {
  //       try {
  //         // message(`Connecting to ${settings.name.replace(/\b\w/g, (l) => l.toUpperCase())} chain...`);
  //         /* const newProvider = new Provider({
  //           provider: new WsProvider(utils.availableReefNetworks.mainnet.rpcUrl),
  //         });
  //         await newProvider.api.isReadyOrError;
  //
  //         message('Connecting to Polkadot extension...');
  //         const inj = await web3Enable('Reefswap');
  //         utils.ensure(inj.length > 0, 'Reefswap can not be access Polkadot-Extension. Please install <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/" target="_blank">Polkadot-Extension</a> in your browser and refresh the page to use Reefswap.');
  //
  //         message('Retrieving accounts...');
  //         const web3accounts = await web3Accounts();
  //         utils.ensure(web3accounts.length > 0, 'Reefswap requires at least one account Polkadot-extension. Please create or import account/s and refresh the page.');
  //
  //         message('Creating signers...');
  //         const signers = await rpc.accountsToSigners(
  //           web3accounts,
  //           newProvider,
  //           inj[0].signer,
  //         );
  // */
  //         // const signerIndex = getSignerLocalPointer();
  //         // const selectedSigner = accounts.length > signerIndex ? signerIndex : 0;
  //
  //         // setProvider(newProvider);
  //
  //         /* message('Loading tokens...');
  //         const verifiedTokens = await rpc.loadVerifiedERC20Tokens();
  //         const newTokens = await rpc.loadTokens(verifiedTokens, selectedSigner);
  //         dispatch(setAllTokensAction(newTokens)); */
  //
  //         // dispatch(accountsSetAccounts(signers));
  //         // Make sure selecting account is after setting signers
  //         // Else error will occure
  //         // dispatch(accountsSetSelectedAccount(selectedSigner));
  //         setState(toSuccess());
  //       } catch (e: any) {
  //         if (e.message) {
  //           setState(toError('Polkadot extension', e.message));
  //         } else {
  //           setState(toError('RPC', 'Can not connect to the chain, try connecting later...'));
  //         }
  //       }
  //     };
  //
  //     load();
  //     return () => {
  //       mounted.current = false;
  //       provider?.api.disconnect();
  //     };
  //   }, [settings.reload]);

  // useEffect(() => {
  //   message('Loading account tokens ...');
  //   if (selectedAccount === -1 || !provider) {
  //     return;
  //   }
  //   const exeAsync = async (): Promise<void> => {
  //     try {
  //       if (selectedAccount === -1 || !provider) {
  //         return;
  //       }
  //       const { address, signer } = accounts[selectedAccount];
  //       const accountTokens = await rpc.loadAccountTokens(signer, settings);
  //       dispatch(accountsSetAccountTokens(accountTokens));
  //     } catch (error) {
  //       console.log('loading account err', error);
  //     }
  //   };
  //   setState(toSuccess());
  //   exeAsync();
  // }, [selectedAccount, provider]);

  return (
    <div>
      {state._type === 'SuccessState' && <ContentRouter /> }
      {state._type === 'LoadingMessageState' && <Components.Loading.LoadingWithText text={state.message} />}
      {state._type === 'ErrorState' && <Components.Card.ErrorCard title={state.title} message={state.message} />}
    </div>
  );
};

export default AppInitialization;
