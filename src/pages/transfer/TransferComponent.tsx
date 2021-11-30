import {
  Components,
  ensureTokenAmount,
  ReefSigner,
  reefTokenWithAmount,
  rpc,
  Token,
  TokenWithAmount,
  utils as reefUtils,
} from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { decodeAddress } from '@polkadot/util-crypto';
import { Provider } from '@reef-defi/evm-provider';
import { handleTxResponse } from '@reef-defi/evm-provider/utils';
import { useAppDispatch, useAppSelector } from '../../store';
import { reloadTokens } from '../../store/actions/tokens';
import { toDecimalPlaces } from '../../utils/utils';
import { getReefCoinBalance } from '../../../../reef-react-lib/dist/rpc';

const {
  Display, Card: CardModule, TokenAmountFieldMax, Modal, Loading, Input: InputModule,
  TokenAmountView, Label, Button: ButtonModule, AccountListModal, Text,
} = Components;
const {
  ComponentCenter, MT, CenterColumn, Margin, CenterRow,
} = Display;
const {
  CardHeader, CardHeaderBlank, CardTitle, Card,
} = CardModule;
const {
  OpenModalButton, default: ConfirmationModal, ModalFooter, ModalBody,
} = Modal;
const {
  MiniText,
} = Text;
const { LoadingButtonIconWithText } = Loading;
const { Input } = InputModule;
const { ConfirmLabel } = Label;
const { calculateUsdAmount } = reefUtils;
const { Button } = ButtonModule;

interface TransferComponent {
    tokens: Token[];
    from: ReefSigner;
    token: TokenWithAmount;
}

interface TxStatusUpdate {
  txIdent: string;
  txHash?: string;
  error?: string;
  isInBlock?: boolean;
  isComplete?: boolean;
  type?: string;
  url?: string;
}

const TX_IDENT_ANY = 'TX_HASH_ANY';
const TX_TYPE_EVM = 'TX_TYPE_EVM';
const REEF_TOKEN = reefTokenWithAmount();

const isSubstrateAddress = (to: string): boolean => {
  if (!to || !to.startsWith('5')) {
    return false;
  }
  try {
    return !!decodeAddress(to, true, 42);
  } catch (err) {
  }
  return false;
};

type TxStatusHandler = (status: TxStatusUpdate)=>void;

function handleErr(e: any, txIdent:string, txHash: string, txHandler: TxStatusHandler): void {
  let reason = e.message || e;
  if (e && (e.message.indexOf('-32603: execution revert: 0x') > -1 || e.message?.indexOf('InsufficientBalance') > -1)) {
    reason = 'You must allow minimum 60 REEF on account for Ethereum VM transaction even if transaction fees will be much lower.';
  }
  if (e && (e.message?.startsWith('1010'))) {
    reason = 'Balance too low.';
  }
  txHandler({
    txIdent, txHash, error: reason,
  });
}

async function sendToEvmAddress(txToken: TokenWithAmount, signer: ReefSigner, to: string, txHandler: TxStatusHandler): Promise<string> {
  const contract = await rpc.getContract(txToken.address, signer.signer);
  const decimals = await contract.decimals();
  const toAmt = utils.parseUnits(txToken.amount, decimals);
  const txIdent = Math.random().toString(10);
  try {
    contract.transfer(to, toAmt.toString()).then((contractCall: any) => {
      txHandler({
        txIdent, txHash: contractCall.hash, isInBlock: true, type: TX_TYPE_EVM, url: `https://reefscan.com/extrinsic/${contractCall.hash}`,
      });
    }).catch(async (e:any) => {
      console.log('sendToEvmAddress error=', e);
      handleErr(e, txIdent, '', txHandler);
    });
  } catch (e: any) {
    console.log('sendToEvmAddress err =', e);
    handleErr(e, txIdent, '', txHandler);
  }
  return Promise.resolve(txIdent);
}

async function sendToNativeAddress(provider: Provider, signer: ReefSigner, toAmt: BigNumber, to: string, txHandler: TxStatusHandler): Promise<string> {
  const transfer = provider.api.tx.balances.transfer(to, toAmt.toString());
  const substrateAddress = await signer.signer.getSubstrateAddress();
  const txIdent = Math.random().toString(10);
  transfer.signAndSend(substrateAddress, { signer: signer.signer.signingKey },
    (res) => handleTxResponse(res, provider.api).then(
      (txRes: any): void => {
        const txHash = transfer.hash.toHex();
        txHandler({
          txIdent, txHash, isInBlock: txRes.result.status.isInBlock, isComplete: txRes.result.status.isFinalized,
        });
      },
    ).catch((rej: any) => {
      // finalized error is ignored
      if (rej.result.status.isInBlock) {
        const txHash = transfer.hash.toHex();
        handleErr(rej.message, txIdent, txHash, txHandler);
      }
    })).catch((e) => {
    console.log('sendToNativeAddress err=', e);
    handleErr(e, txIdent, '', txHandler);
  });
  return Promise.resolve(txIdent);
}

const filterCurrentAccount = (accounts: ReefSigner[], selectedAccountIndex: number): ReefSigner[] => accounts.filter((a) => a.address !== accounts[selectedAccountIndex].address);

const transferFeeNative = utils.parseEther('1.53').toString();
const existentialDeposit = utils.parseEther('1.001').toString();

const getSubtractedFeeAndExistential = (txToken: TokenWithAmount): string => reefUtils.toUnits({ balance: txToken.balance.sub(transferFeeNative).sub(existentialDeposit), decimals: 18 });

const getSubtractedFee = (txToken: TokenWithAmount): string => reefUtils.toUnits({ balance: txToken.balance.sub(transferFeeNative), decimals: 18 });

function toAmountInputValue(amt: string): string {
  return toDecimalPlaces(amt, 8);
}

export const TransferComponent = ({
  tokens, from, token,
}: TransferComponent): JSX.Element => {
  const { provider } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { selectedAccount: selectedAccountIndex, accounts } = useAppSelector((state) => state.signers);
  const [availableTxAccounts, setAvailableTxAccounts] = useState<ReefSigner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [txToken, setTxToken] = useState(token);
  const [to, setTo] = useState('');
  const [foundToAccountAddress, setFoundToAccountAddress] = useState<ReefSigner|null>();
  const [validationError, setValidationError] = useState('');
  const [resultMessage, setResultMessage] = useState<{complete: boolean, title: string, message: string, url?: string, loading?: boolean} | null>(null);
  const [lastTxIdentInProgress, setLastTxIdentInProgress] = useState<string>();
  const [txUpdateData, setTxUpdateData] = useState<TxStatusUpdate>();

  useEffect(() => {
    if (!lastTxIdentInProgress) {
      setResultMessage(null);
      return;
    }
    if (lastTxIdentInProgress === txUpdateData?.txIdent || txUpdateData?.txIdent === TX_IDENT_ANY) {
      if (txUpdateData?.error) {
        const errMessage = txUpdateData.error === 'balances.InsufficientBalance' ? 'Balance too low for transfer and fees.' : txUpdateData.error;
        setResultMessage({
          complete: true,
          title: 'Transaction failed',
          message: errMessage || '',
        });
        return;
      }
      if (!txUpdateData?.isInBlock && !txUpdateData?.isComplete) {
        setResultMessage({
          complete: false,
          title: 'Transaction initiated',
          message: 'Sending transaction to blockchain.',
          loading: true,
        });
        return;
      }
      if (txUpdateData?.isInBlock) {
        let message = 'Transaction was accepted in latest block.';
        if (txUpdateData.type !== TX_TYPE_EVM) {
          message += ' For maximum reliability you can wait block finality ~30sec.';
        }
        setResultMessage({
          complete: true,
          title: 'Transaction successfull',
          message,
          url: txUpdateData.url || `https://reefscan.com/transfer/${txUpdateData.txHash}`,
          loading: txUpdateData.type !== TX_TYPE_EVM,
        });
        return;
      }
      if (txUpdateData?.isComplete) {
        setResultMessage({
          complete: true,
          title: 'Transaction complete',
          message: 'Token transfer has been finalized.',
          url: txUpdateData.url || `https://reefscan.com/transfer/${txUpdateData.txHash}`,
        });
      }
    }
  }, [txUpdateData, lastTxIdentInProgress]);

  useEffect(() => {
    if (txUpdateData?.isInBlock || txUpdateData?.error) {
      const delay = txUpdateData.type === TX_TYPE_EVM ? 2000 : 0;
      setTimeout(() => dispatch(reloadTokens()), delay);
    }
  }, [txUpdateData]);

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    token.amount = txToken.amount;
    setTxToken(token);
  }, [token]);

  useEffect(() => {
    const exceptCurrent = filterCurrentAccount(accounts, selectedAccountIndex);
    if (txToken.address === REEF_TOKEN.address) {
      setAvailableTxAccounts(exceptCurrent);
      return;
    }
    setAvailableTxAccounts(exceptCurrent.filter((a) => !!a.isEvmClaimed));
  }, [accounts, selectedAccountIndex, txToken]);

  const amountChanged = (amount: string): void => {
    let amt = amount;
    if (parseFloat(amt) <= 0) {
      amt = '';
    }
    setTxToken({ ...txToken, amount: toAmountInputValue(amt) });
  };

  const addressChanged = (addr: string): Promise<void> => Promise.resolve();

  const tokenSelected = (tkn: Token): void => {
    if (tkn.address !== txToken.address) {
      setTxToken({ ...tkn, amount: '', isEmpty: false } as TokenWithAmount);
    }
  };

  const onSendTxConfirmed = async (): Promise<void> => {
    if (isLoading || !provider) {
      return;
    }
    try {
      setIsLoading(true);
      ensureTokenAmount(txToken);
      if (utils.isAddress(to)) {
        const txIdent = await sendToEvmAddress(txToken, from, to, setTxUpdateData);
        setLastTxIdentInProgress(txIdent);
        setTxUpdateData({ txIdent });
      } else if (isSubstrateAddress(to)) {
        const txIdent = await sendToNativeAddress(provider, from, utils.parseEther(txToken.amount), to, setTxUpdateData);
        setLastTxIdentInProgress(txIdent);
        setTxUpdateData({ txIdent });
      }
    } catch (err: any) {
      console.log('onSendTxConfirmed error =', err);
      setLastTxIdentInProgress(TX_IDENT_ANY);
      setTxUpdateData({ txIdent: TX_IDENT_ANY, error: err.message || err });
    }
    setIsLoading(false);
  };

  const initTransferUi = (): void => {
    setLastTxIdentInProgress('');
    setResultMessage(null);
    amountChanged('');
    setTo('');
  };

  useEffect(() => {
    if (!txToken.amount || utils.parseEther(txToken.amount).isZero()) {
      setValidationError('Set amount');
      return;
    }

    const amountOverBalance = utils.parseEther(txToken.amount).gt(txToken.balance);
    if (!amountOverBalance && txToken.address === REEF_TOKEN.address) {
      const isOverTxFee = parseFloat(txToken.amount) > parseFloat(toAmountInputValue(getSubtractedFee(txToken)));
      if (isOverTxFee) {
        setValidationError(`Amount too high for transfer fee ( ~${utils.formatUnits(transferFeeNative, 18)}REEF)`);
        return;
      }
    }

    if (amountOverBalance) {
      setValidationError('Amount exceeds balance');
      return;
    }

    if (!to.trim()) {
      setValidationError('Set address');
      return;
    }

    if (!isSubstrateAddress(to) && !utils.isAddress(to)) {
      setValidationError('Send to not valid address');
      return;
    }
    setValidationError('');
  }, [to, txToken]);

  useEffect(() => {
    if (!to || !accounts || !accounts.length) {
      setFoundToAccountAddress(null);
      return;
    }
    const foundToAddrAccount = accounts.find((a) => a.address.toLowerCase() === to.toLowerCase() || a.evmAddress.toLowerCase() === to.toLowerCase());
    if (foundToAddrAccount) {
      setFoundToAccountAddress(foundToAddrAccount);
      return;
    }
    setFoundToAccountAddress(null);
  }, [to, accounts]);

  const onAccountSelect = (accountIndex: number, selected: ReefSigner):void => {
    const selectAcc = async (): Promise<void> => {
      let addr = '';
      if (txToken.address === REEF_TOKEN.address) {
        addr = await selected.signer.getSubstrateAddress();
      }
      if (!addr && selected.isEvmClaimed) {
        addr = selected.evmAddress;
      }
      setTo(addr);
    };
    selectAcc();
  };

  return (
    <>
      { !resultMessage
    && (
    <>
      <ComponentCenter>
        <Card>
          <CardHeader>
            <CardHeaderBlank />
            <CardTitle title="Send Tokens" />
            <CardHeaderBlank />
          </CardHeader>
          <TokenAmountFieldMax
            token={txToken}
            tokens={tokens}
            id="transfer-token"
            onAmountChange={amountChanged}
            onTokenSelect={tokenSelected}
            onAddressChange={addressChanged}
            hideSelectTokenCommonBaseView
            afterBalanceEl={(txToken.address === REEF_TOKEN.address && isSubstrateAddress(to)) ? (
              <span>
                {txToken.amount !== toAmountInputValue(getSubtractedFee(txToken)) && <span className="text-primary text-decoration-none" role="button" onClick={() => amountChanged(getSubtractedFee(txToken))}>(Max)</span>}
                {txToken.amount === toAmountInputValue(getSubtractedFee(txToken)) && <span className="text-primary text-decoration-none" role="button" onClick={() => amountChanged(getSubtractedFeeAndExistential(txToken))}>(Keep existential deposit)</span>}
              </span>
            ) : <span />}
          />
          <MT size="2">
            <Input
              value={to}
              maxLength={70}
              onChange={(toVal) => setTo(toVal.trim())}
              placeholder="Send to address"
              disabled={isLoading}
            />
            {foundToAccountAddress && (
              <span className="pl-1rem">
                <MiniText>
                  Selected account:&nbsp;
                  {foundToAccountAddress?.name}
                </MiniText>
              </span>
            )}
            <OpenModalButton id="selectMyAddress" disabled={isLoading} className="btn-empty link-text text-xs text-primary pl-1rem">
              Select account
            </OpenModalButton>
          </MT>
          <MT size="2">
            <CenterColumn>
              <OpenModalButton id="txModalToggle" disabled={!!validationError || isLoading}>
                {isLoading ? (
                  <LoadingButtonIconWithText
                    text="Sending"
                  />
                ) : validationError || 'Send'}
              </OpenModalButton>
            </CenterColumn>
          </MT>
        </Card>
      </ComponentCenter>

      <AccountListModal
        id="selectMyAddress"
        accounts={availableTxAccounts}
        selectAccount={onAccountSelect}
        title={(
          <>
            Select account&nbsp;
            {txToken.address !== REEF_TOKEN.address
            && <span className="text-xs">(Ethereum VM enabled)</span>}
          </>
        )}
      />

      <ConfirmationModal id="txModalToggle" title="Confirm Transaction" confirmFun={onSendTxConfirmed} confirmLabel="Send">
        <TokenAmountView
          name={txToken.name}
          amount={txToken.amount}
          usdAmount={calculateUsdAmount(txToken)}
          placeholder="Send Token"
        />
        <Margin size="3">
          <ConfirmLabel title="Send To" value={`${to.substr(0, 10)} ... ${to.substr(to.length - 10)}`} />
        </Margin>
      </ConfirmationModal>
    </>
    )}
      {resultMessage && (
      <ComponentCenter>
        <Card>
          <CardHeader>
            <CardHeaderBlank />
            <CardTitle title={resultMessage.title} />
            <CardHeaderBlank />
          </CardHeader>
          <MT size="3">
            <div className="text-center">
              {resultMessage.loading && <Loading.Loading />}
              <div>
                {resultMessage.message}
                {!!resultMessage.url
                && (
                <div>
                  <br />
                  <a target="_blank" href={`${resultMessage.url}`} rel="noreferrer">
                    View transaction on
                    reefscan.com
                  </a>
                </div>
                )}
              </div>
            </div>
          </MT>
          <MT size="2">
            <ModalFooter>
              {!!resultMessage.complete && <Button onClick={initTransferUi}>Close</Button>}
            </ModalFooter>
          </MT>
        </Card>
      </ComponentCenter>
      )}
    </>
  );
};
