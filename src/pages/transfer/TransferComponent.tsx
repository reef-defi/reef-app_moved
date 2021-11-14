import {
  Components,
  ensureTokenAmount,
  Network,
  ReefSigner,
  rpc,
  Token,
  TokenWithAmount,
  utils as reefUtils,
} from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { utils } from 'ethers';

const {
  Display, Card: CardModule, TokenAmountFieldMax, Modal, Loading, Input: InputModule,
  TokenAmountView, Label, Button: ButtonModule,
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

export const TransferComponent = ({
  tokens, network, from, token,
}: TransferComponent): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [txToken, setTxToken] = useState(token);
  const [to, setTo] = useState('');
  const [validationError, setValidationError] = useState('');
  const [resultMessage, setResultMessage] = useState<{success: boolean, title: string, message: string} | null>(null);

  const amountChanged = (amount: string): void => {
    let amt = amount;
    if (parseFloat(amt) <= 0) {
      amt = '';
    }
    setTxToken({ ...txToken, amount: amt });
  };

  const addressChanged = (addr: string): Promise<void> => Promise.resolve();

  const tokenSelected = (tkn: Token): void => {
    setTxToken({ ...tkn, amount: '0', isEmpty: false } as TokenWithAmount);
  };

  const onConfirmed = async (): Promise<void> => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const { signer, evmAddress } = from;
    ensureTokenAmount(txToken);
    const contract = await rpc.getContract(txToken.address, signer);
    const decimals = await contract.decimals();
    console.log('dec', decimals);
    const toAmt = utils.parseUnits(txToken.amount, decimals);
    const myBal = await contract.balanceOf(evmAddress);
    const hisBal = await contract.balanceOf(to);
    console.log('BALL=', utils.formatUnits(myBal.toString(), decimals), utils.formatUnits(hisBal.toString(), decimals));
    try {
      const contractCall = await contract.transfer(to, toAmt.toString());
      console.log('CC', contractCall.toString());
      setResultMessage({ success: true, title: 'Transaction successful', message: contractCall.hash });
      // TODO reload token balance
    } catch (e) {
      console.log('Transfer error', e, toAmt.toString());
      setResultMessage({ success: false, title: 'Transaction failed', message: 'No tokens transfered.' });
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
      setValidationError('Amount is empty');
      return;
    }

    if (utils.parseEther(txToken.amount).gt(txToken.balance)) {
      setValidationError('Value exceeds balance');
      return;
    }

    if (to.length > 42) {
      setValidationError('To value too long');
      return;
    }

    if (!utils.isAddress(to)) {
      setValidationError('Send to not valid address');
      return;
    }
    setValidationError('');
  }, [to, txToken]);

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
              maxLength={42}
              onChange={setTo}
              placeholder="Send to 0x..."
              disabled={isLoading}
            />
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

      <ConfirmationModal id="txModalToggle" title="Confirm and Send" confirmFun={onConfirmed} closeOnConfirm>
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
                  <a target="_blank" href={`https://reefscan.com/extrinsic/${resultMessage.message}`} rel="noreferrer">reefscan</a>
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
