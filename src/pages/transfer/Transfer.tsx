import {
  appState,
  Components,
  graphql,
  hooks,
  ReefSigner,
  reefTokenWithAmount,
  Token,
  TokenWithAmount,
  utils as reefUtils,
} from '@reef-defi/react-lib';
import React, {useEffect, useState} from 'react';
import {Provider} from '@reef-defi/evm-provider';
import {ApolloClient, gql, SubscriptionOptions} from "@apollo/client";
import {ethers} from 'ethers';


const {
  isDataSet,
  getData,
  DataProgress,
} = reefUtils;

const {
  Loading, TransferComponent,
} = Components;

export const Transfer = (): JSX.Element => {
  const provider: Provider|undefined = hooks.useObservableState(appState.providerSubj);
  const accounts: ReefSigner[]|undefined = hooks.useObservableState(appState.signers$);
  const selectedSigner: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);
  const signerTokens: Token[]|undefined = hooks.useObservableState(appState.allAvailableSignerTokens$);
  const signerTokenBalances: TokenWithAmount[]|undefined = hooks.useObservableState(appState.tokenPrices$);
  const [token, setToken] = useState<reefUtils.DataWithProgress<TokenWithAmount>>(DataProgress.LOADING);

  useEffect(() => {
    if (isDataSet(signerTokenBalances)) {
      const sigTokens = getData(signerTokenBalances);
      if (sigTokens===undefined) {
        setToken(DataProgress.LOADING);
        return;
      }
      if (!sigTokens?.length) {
        setToken(DataProgress.NO_DATA);
        return;
      }
      const signerTokenBalance = sigTokens ? sigTokens[0] : undefined;
      if (signerTokenBalance && isDataSet(signerTokenBalance.balance) && isDataSet(signerTokenBalance.price)) {
        const tkn = { ...signerTokenBalance, amount: '', isEmpty: false } as TokenWithAmount;
        setToken(tkn);
        return;
      }
      if ((!isDataSet(signerTokenBalance?.balance) || !isDataSet(signerTokenBalance?.price)) && isDataSet(signerTokens)) {
        const sTkns = getData(signerTokens);
        const sToken = sTkns ? sTkns[0] : undefined;
        if (sToken) {
          const tkn = { ...sToken, amount: '', isEmpty: false } as TokenWithAmount;
          setToken(tkn);
        }
        return;
      }
      // TODO set from value in signerTokenBalance- setToken(signerTokenBalance?.balance as reefUtils.DataProgress || signerTokenBalance?.price as reefUtils.DataProgress);
      setToken(DataProgress.LOADING);
      return;
    }
    // TODO set from value in signerTokenBalances- setToken(signerTokenBalances as reefUtils.DataProgress);
    setToken(DataProgress.LOADING);
  }, [signerTokenBalances, signerTokens]);

  return (
    <>
      {!isDataSet(token) && token === DataProgress.LOADING && <Loading.Loading />}
      {!isDataSet(token) && token === DataProgress.NO_DATA && <div>No tokens for transaction.</div>}
      { provider && isDataSet(token) && isDataSet(signerTokenBalances) && selectedSigner
          && <TransferComponent tokens={signerTokenBalances as Token[]} from={selectedSigner} token={token as TokenWithAmount} provider={provider} accounts={accounts || []} currentAccount={selectedSigner} /* onTxUpdate={(val) => onTransferTxUpdate(val)} */ />}
    </>
  );
};
