import {
  Components, Token, TokenWithAmount, utils as reefUtils,
} from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { useObservableState } from '../../hooks/useObservableState';
import {
  allAvailableSignerTokens$, providerSubj, selectedSigner$, tokenPrices$, signers$,
} from '../../state/appState';
import { createUpdateActions, UpdateAction, UpdateDataType } from '../../state/updateCtxUtil';
import { onTxUpdateReloadSignerBalances } from '../../state/util';

const {
  isDataSet,
  getData,
  DataProgress,
} = reefUtils;

const {
  Loading, TransferComponent,
} = Components;

const onTransferTxUpdate = (txState: reefUtils.TxStatusUpdate): void => {
  const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE];
  if (txState.txTypeEvm) {
    updateTypes.push(UpdateDataType.ACCOUNT_TOKENS);
  }
  const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
  onTxUpdateReloadSignerBalances(txState, updateActions);
};

export const Transfer = (): JSX.Element => {
  const provider = useObservableState(providerSubj);
  const accounts = useObservableState(signers$);
  const selectedSigner = useObservableState(selectedSigner$);
  const signerTokens = useObservableState(allAvailableSignerTokens$);
  const signerTokenBalances = useObservableState(tokenPrices$);
  const [token, setToken] = useState<reefUtils.DataWithProgress<TokenWithAmount>>(DataProgress.LOADING);

  useEffect(() => {
    if (isDataSet(signerTokenBalances)) {
      const sigTokens = getData(signerTokenBalances);
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
          && <TransferComponent tokens={signerTokenBalances as Token[]} from={selectedSigner} token={token as TokenWithAmount} provider={provider} accounts={accounts || []} currentAccount={selectedSigner} onTxUpdate={(val) => onTransferTxUpdate(val)} />}
    </>
  );
};
