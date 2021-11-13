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
import { BigNumber, utils } from 'ethers';
import {ERC20} from "../../../../reef-react-lib/dist/assets/abi/ERC20";

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

interface CreatorComponent {
    signer: ReefSigner;
}

export const CreatorComponent = ({
  signer,
}: CreatorComponent): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(utils.parseEther('1000000000'));

  const createToken = (): void => {
    const abi = ERC20;

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
            <CardTitle title="Create Token" />
            <CardHeaderBlank />
          </CardHeader>

          <MT size="2">
            <Input
              value={tokenName}
              maxLength={42}
              onChange={setTokenName}
              placeholder="Token Name"
              disabled={isLoading}
            />
          </MT>
          <MT size="2">
            <Input
              value={symbol}
              maxLength={42}
              onChange={setSymbol}
              placeholder="Token Symbol"
              disabled={isLoading}
            />
          </MT>
          <MT size="2">
            <Input
              value={totalSupply}
              maxLength={42}
              onChange={setTotalSupply}
              placeholder="Token Total Supply Number"
              disabled={isLoading}
            />
          </MT>
          <Button onClick={createToken} />
          {/* <MT size="2">
            <CenterColumn>
              <OpenModalButton id="txModalToggle" disabled={!!validationError || isLoading}>
                {isLoading ? (
                  <LoadingButtonIconWithText
                    text="Sending"
                  />
                ) : validationError || 'Send'}
              </OpenModalButton>
            </CenterColumn>
          </MT> */}
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
            <CardTitle title={resultMessage} />
            <CardHeaderBlank />
          </CardHeader>
          <MT size="3">
            <div className="text-center">No tokens sent.</div>
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
