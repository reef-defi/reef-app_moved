import {
  Components, Network, ReefSigner, Token, TokenWithAmount,
} from '@reef-defi/react-lib';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const {
  Display, Card: CardModule, TokenAmountFieldMax, Modal, Loading,
} = Components;
const { ComponentCenter, MT, CenterColumn } = Display;
const {
  CardHeader, CardHeaderBlank, CardTitle, Card,
} = CardModule;
const { OpenModalButton } = Modal;
const { LoadingButtonIconWithText } = Loading;

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
  const history = useHistory();
  const [txToken, setTxToken] = useState(token);

  const amountChanged = (amt: string): void => {
    console.log('AAA', amt);
    setTxToken({ ...txToken, amount: amt });
  };

  const tokenSelected = (tkn: Token): void => {
    console.log('AAA', tkn);
    setTxToken({ ...tkn, amount: '0', isEmpty: false } as TokenWithAmount);
  };

  return (
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
        />
        <MT size="2">
          <CenterColumn>
            <OpenModalButton id="swapModalToggle">
              {isLoading ? (
                <LoadingButtonIconWithText
                  text="Sending"
                />
              ) : 'Send'}
            </OpenModalButton>
          </CenterColumn>
        </MT>
        {/* <SwapConfirmationModal
                    buy={buy}
                    sell={sell}
                    id="swapModalToggle"
                    percentage={settings.percentage}
                    confirmFun={onSwap}
                /> */}
      </Card>
    </ComponentCenter>
  );
};
