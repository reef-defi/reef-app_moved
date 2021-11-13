import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Components, reefTokenWithAmount, Token, TokenWithAmount,
} from '@reef-defi/react-lib';
import { RIcon, SendIcon, SwapIcon } from '../../common/Icons';
import { useAppSelector } from '../../store';

export const ActionButtons = (): JSX.Element => {
  const history = useHistory();
  const { tokens: txTokens } = useAppSelector((state) => state.tokens);
  const [txToken, setTxToken] = useState(reefTokenWithAmount());
  const [txAmount, setTxAmount] = useState('0');
  return (
    <div className="dashboard_actions col-12 col-md-6 d-flex d-flex-end d-flex-vert-center">
      <div className="mr-1">
        <button
          type="button"
          className="button-light dashboard_actions_button dashboard_actions_button-swap radius-border"
          onClick={() => {
            history.push('/swap');
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
          data-bs-toggle="modal"
          data-bs-target="#transfer-modal"
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
          className="button-light dashboard_actions_button dashboard_actions_button-buy radius-border"
        >
          <div className="svg-w fill-white">
            <RIcon />
          </div>
          <span className="dashboard_actions_button_text">Buy</span>
        </button>
      </div>

      <Components.Modal.Modal id="transfer-modal">
        <Components.Modal.ModalHeader>
          <Components.Text.Title>Account</Components.Text.Title>
          <Components.Modal.ModalClose />
        </Components.Modal.ModalHeader>
        <Components.Modal.ModalBody>
          <Components.Display.Border size="2">
            <Components.Display.ContentBetween>
              <Components.Display.Margin size="2">
                <Components.Display.FlexRow>
                  ttt
                </Components.Display.FlexRow>
              </Components.Display.Margin>
              <Components.TokenAmountFieldMax
                token={txToken}
                tokens={txTokens}
                id="sell-token-field-23"
                onAmountChange={setTxAmount}
                onTokenSelect={(t: Token) => setTxToken(t as TokenWithAmount)}
              />
            </Components.Display.ContentBetween>
            {/* <ContentBetween>
               <Components.Display.MutedText>
                <Components.Display..MiniText>
                  Connected with polkadot-extension
                </Components.Display..MiniText>
              </Components.Display.MutedText>
              <button
                type="button"
                className="btn btn-sm btn-reef border-rad"
                data-bs-target="#select-account-modal"
                data-bs-toggle="modal"
              >
                Switch account
              </button>
            </ContentBetween> */}
            {/* <Margin size="2">
              <FlexRow>
                ttt
              </FlexRow>
            </Margin> */}
            {/* <MT size="2" />
            <MX size="2">
                    <CopyToClipboard text={evmAddress}>
                <span className="form-text text-muted ms-2" style={{ cursor: 'pointer' }}>
                  <CopyIcon small />
                  <MiniText>Copy EVM Address</MiniText>
                </span>
                    </CopyToClipboard>
                    <a href={`${reefscanUrl}account/${address}`} target="_blank" className="form-text text-muted ms-3" style={{ textDecoration: 'none' }} rel="noreferrer">
                        <ExploreIcon small />
                        <small className="ms-1">View on Explorer</small>
                    </a>
                </MX> */}
          </Components.Display.Border>
          {/* <MT size="2" /> */}
        </Components.Modal.ModalBody>
      </Components.Modal.Modal>
    </div>
  );
};
