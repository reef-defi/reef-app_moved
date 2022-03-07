import {appState, Components, hooks, ReefSigner, Token, TokenWithAmount,} from '@reef-defi/react-lib';
import {Provider} from '@reef-defi/evm-provider';
import {EvmEvents} from "../../components/EvmEvents";

const {
  Loading, TransferComponent,
} = Components;

/* const onTransferTxUpdate = (txState: reefUtils.TxStatusUpdate): void => {

  const updateTypes = [UpdateDataType.ACCOUNT_NATIVE_BALANCE];
  if (txState.txTypeEvm) {
    updateTypes.push(UpdateDataType.ACCOUNT_TOKENS);
  }
  const updateActions: UpdateAction[] = createUpdateActions(updateTypes, txState.addresses);
  onTxUpdateResetSigners(txState, updateActions);
}; */

export const Transfer = (): JSX.Element => {
  const provider: Provider|undefined = hooks.useObservableState(appState.providerSubj);
  const accounts: ReefSigner[]|undefined = hooks.useObservableState(appState.signers$);
  const selectedSigner: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);
  const signerTokenBalances: TokenWithAmount[]|undefined = hooks.useObservableState(appState.tokenPrices$);

  return (
    <>
      {!signerTokenBalances &&<Loading.Loading />}
      { provider && signerTokenBalances && selectedSigner
      &&
          <>
            <TransferComponent tokens={signerTokenBalances as Token[]} from={selectedSigner} provider={provider} accounts={accounts || []} currentAccount={selectedSigner}/>
            <div><EvmEvents></EvmEvents></div>
          </>
      }
    </>
  );
};
