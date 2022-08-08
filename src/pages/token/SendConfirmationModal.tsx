import { TokenWithAmount, Components, utils } from '@reef-defi/react-lib';

import React from 'react';

const {Modal, Display, TokenAmountView, Label} = Components;
const {default: ConfirmationModal} = Modal;
interface SendConfirmationModal {
  id: string;
  to: string;
  token: TokenWithAmount;
  confirmFun: () => void;
}

const SendConfirmationModal = ({
  id,
  to,
  token: {
    amount,
    decimals,
    price,
    name,
  },
  confirmFun,
}: SendConfirmationModal): JSX.Element => (
  <ConfirmationModal
    id={id}
    title="Send tokens"
    confirmFun={confirmFun}
    confirmBtnLabel="Send tokens"
  >
    <TokenAmountView
      name={name}
      amount={amount}
      usdAmount={utils.calculateUsdAmount({ amount, price, decimals })}
      placeholder="Send Token"
    />

    <Display.Margin size="3">
      <Label.ConfirmLabel
        title="Send To"
        value={`${to.substr(0, 10)} ... ${to.substr(to.length - 10)}`}
      />
    </Display.Margin>
  </ConfirmationModal>
);

export default SendConfirmationModal;
