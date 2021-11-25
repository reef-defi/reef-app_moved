import {
  Components,
  ensureTokenAmount,
  hooks,
  Network,
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
import { useAppDispatch, useAppSelector } from '../../store';
import { reloadTokens } from '../../store/actions/tokens';
import { currentNetwork } from '../../environment';
import { toDecimalPlaces } from '../../utils/utils';

const {
  Display, Card: CardModule, TokenAmountFieldMax, Modal, Loading, Input: InputModule,
  TokenAmountView, Label, Button: ButtonModule, AccountListModal,
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
const { LoadingButtonIconWithText } = Loading;
const { Input } = InputModule;
const { ConfirmLabel } = Label;
const { calculateUsdAmount } = reefUtils;
const { Button } = ButtonModule;

interface TransferComponent {
    tokens: Token[];
    network: Network;
    from: ReefSigner;
    token: TokenWithAmount;
}

const isSubstrateAddress = (to: string): boolean => {
  try {
    return !!decodeAddress(to, true, 42);
  } catch (err) {
  }
  return false;
};

type ResultMessageSetter = (val: { success: boolean, title: string, message: string }) => void;

const setErrorResultMessage = (e: any, setResultMessage: (val: { success: boolean; title: string; message: string }) => void): void => {
  const reason = e && e.message?.startsWith('1010') ? 'Balance too low.' : '';
  setResultMessage({ success: false, title: 'Transaction failed', message: `No tokens transfered. ${reason}` });
};

async function sendToEvmAddress(txToken: TokenWithAmount, signer: ReefSigner, to: string, setResultMessage: ResultMessageSetter): Promise<void> {
  const contract = await rpc.getContract(txToken.address, signer.signer);
  const decimals = await contract.decimals();
  const toAmt = utils.parseUnits(txToken.amount, decimals);
  try {
    const contractCall = await contract.transfer(to, toAmt.toString());
    setResultMessage({ success: true, title: 'Transaction successful', message: `https://reefscan.com/extrinsic/${contractCall.hash}` });
    // TODO reload token balance
  } catch (e) {
    setErrorResultMessage(e, setResultMessage);
  }
}

async function sendToNativeAddress(provider: Provider, signer: ReefSigner, toAmt: BigNumber, to: string, setResultMessage: ResultMessageSetter): Promise<void> {
  try {
    const transfer = provider.api.tx.balances.transfer(to, toAmt.toString());
    const substrateAddress = await signer.signer.getSubstrateAddress();
    const hash = await transfer.signAndSend(substrateAddress, { signer: signer.signer.signingKey });
    return new Promise((resolve) => {
      // wait for reefscan to register tx
      setTimeout(() => {
        setResultMessage({
          success: true,
          title: 'Transaction successful',
          message: `https://reefscan.com/transfer/${hash.toString()}`,
        });
        resolve();
      },
      5000);
    });
    // TODO reload token balance
  } catch (e: any) {
    setErrorResultMessage(e, setResultMessage);
  }
  return Promise.resolve();
}

const filterCurrentAccount = (accounts: ReefSigner[], selectedAccountIndex: number): ReefSigner[] => accounts.filter((a) => a.address !== accounts[selectedAccountIndex].address);

export const TransferComponent = ({
  tokens, network, from, token,
}: TransferComponent): JSX.Element => {
  const [provider] = hooks.useProvider(currentNetwork.rpcUrl);
  const dispatch = useAppDispatch();
  const { selectedAccount: selectedAccountIndex, accounts } = useAppSelector((state) => state.signers);
  const [availableTxAccounts, setAvailableTxAccounts] = useState<ReefSigner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [txToken, setTxToken] = useState(token);
  const [to, setTo] = useState('');
  const [validationError, setValidationError] = useState('');
  const [resultMessage, setResultMessage] = useState<{success: boolean, title: string, message: string} | null>(null);

  useEffect(() => {
    setTxToken(token);
  }, [token]);

  useEffect(() => {
    const exceptCurrent = filterCurrentAccount(accounts, selectedAccountIndex);
    if (txToken.address === reefTokenWithAmount().address) {
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
    if (amt) {
      const maxWithoutTxFee = txToken.balance.sub(utils.parseEther('2'));
      if (!maxWithoutTxFee.gt(BigNumber.from('0'))) {
        amt = '';
      } else if (maxWithoutTxFee.lt(utils.parseEther(amount))) {
        amt = utils.formatUnits(maxWithoutTxFee, 18).toString();
      }
    }

    setTxToken({ ...txToken, amount: toDecimalPlaces(amt, 8) });
  };

  const addressChanged = (addr: string): Promise<void> => Promise.resolve();

  const tokenSelected = (tkn: Token): void => {
    setTxToken({ ...tkn, amount: '0', isEmpty: false } as TokenWithAmount);
  };

  const onSendTxConfirmed = async (): Promise<void> => {
    if (isLoading || !provider) {
      return;
    }
    setIsLoading(true);
    ensureTokenAmount(txToken);
    if (utils.isAddress(to)) {
      await sendToEvmAddress(txToken, from, to, setResultMessage);
    }
    if (isSubstrateAddress(to)) {
      await sendToNativeAddress(provider, from, utils.parseEther(txToken.amount), to, setResultMessage);
    }
    setIsLoading(false);
  };

  const initTransfer = (): void => {
    setResultMessage(null);
    amountChanged('');
    setTo('');
  };

  useEffect(() => {
    if (!txToken.amount || utils.parseEther(txToken.amount).isZero()) {
      setValidationError('Set amount');
      return;
    }

    if (utils.parseEther(txToken.amount).gt(txToken.balance)) {
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

  // update balance
  useEffect(() => {
    if (resultMessage && resultMessage.success) {
      setTimeout(() => dispatch(reloadTokens()), 4000);
    }
  }, [resultMessage]);

  const onAccountSelect = (accountIndex: number, selected: ReefSigner):void => {
    const selectAcc = async (): Promise<void> => {
      let addr = '';
      if (txToken.address === reefTokenWithAmount().address) {
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
          />
          <MT size="2">
            <Input
              value={to}
              maxLength={70}
              onChange={(toVal) => setTo(toVal.trim())}
              placeholder="Send to address"
              disabled={isLoading}
            />
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
            {txToken.address !== reefTokenWithAmount().address
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
              {resultMessage.success ? (
                <div>
                  Tokens sent. Check transaction on&nbsp;
                  <a target="_blank" href={resultMessage.message} rel="noreferrer">reefscan</a>
                  .
                </div>
              ) : (<div>{resultMessage.message}</div>)}
            </div>
          </MT>
          <MT size="2">
            <ModalFooter>
              <Button onClick={initTransfer}>Close</Button>
            </ModalFooter>
          </MT>
        </Card>
      </ComponentCenter>
      )}
    </>
  );
};
