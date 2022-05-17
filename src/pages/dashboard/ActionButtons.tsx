import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Components, reefTokenWithAmount, Token, TokenWithAmount,
} from '@reef-defi/react-lib';
import { RIcon, SendIcon, SwapIcon } from '../../common/Icons';

export const ActionButtons = (): JSX.Element => {
  const history = useHistory();
  const [txToken, setTxToken] = useState(reefTokenWithAmount());
  const [txAmount, setTxAmount] = useState('0');
  return (
    <div className="dashboard_actions col-12 col-md-6 d-flex d-flex-end d-flex-vert-center">
      <div className="mr-1">
        <button
          type="button"
          className="button-light dashboard_actions_button dashboard_actions_button-swap radius-border"
          onClick={() => {
            history.push('/swap/0x0000000000000000000000000000000001000000/0x');
          }}
        >
          <div className="svg-w fill-white">
            <SwapIcon />
          </div>
          <span className="dashboard_actions_button_text">Swap</span>
        </button>
      </div>
      <div className="mr-1">
        <button
          type="button"
          className="button-light dashboard_actions_button dashboard_actions_button-send radius-border"
          onClick={() => {
            history.push('/send');
          }}
        >
          <div className="svg-w fill-white">
            <SendIcon />
          </div>
          <span className="dashboard_actions_button_text">Send</span>
        </button>
      </div>
      <div className="">
        <button
          type="button"
          className="button-light dashboard_actions_button dashboard_actions_button-buy radius-border buy-binance-btn"
          onClick={() => {
            window.open('https://www.binance.com/en/trade/REEF_USDT?theme=dark&type=spot', '_blank');
          }}
        >
          <div className="svg-w fill-white">
            <RIcon />
          </div>
          <span className="dashboard_actions_button_text">Buy</span>
        </button>
      </div>
    </div>
  );
};
