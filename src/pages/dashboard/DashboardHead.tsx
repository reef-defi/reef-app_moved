import { ReefSigner } from "@reef-defi/react-lib";
import Uik from "@reef-defi/ui-kit";
import React from "react"
import { useHistory } from "react-router-dom";
import {Components} from "@reef-defi/react-lib";
import { RIcon, SendIcon, SwapIcon } from "../../common/Icons";
import "./DashboardHead.css";

const { Icons } = Components;

interface DashboardHead {
  signer?: ReefSigner
  totalBalance: number
}

const DashboardHead = ({signer, totalBalance} : DashboardHead): JSX.Element => {
  const history = useHistory();

  const address = signer ? `${signer.address.slice(0, 7)}...${signer.address.slice(signer.address.length-5)}` : "";
  const evmAddress = signer ? `${signer.evmAddress.slice(0, 7)}...${signer.evmAddress.slice(signer.evmAddress.length-5)}` : "";
  return (
    <div className="stats">
      <div className='stats__wrapper py-4'>
        <div>
          <div className='d-flex flex-row py-0'>
            <div className='my-auto'>
              <Icons.ReefAddressIcon address={signer?.address || '0x'} />
            </div>
            <div className='ps-4 ms-2 base-stats d-flex flex-column'>
              {/* Quite useless... */}
              {/* <Uik.Text type='headline'>{signer?.name || ''}</Uik.Text>
              <Uik.Text type='lead' text='Balance:'/>
              <Uik.Text type='headline' text={`$ ` + Uik.utils.formatHumanAmount(totalBalance)} /> */}
              <div className='my-1'>
                <span className='fs-3'>{(signer?.name || '')}</span>
                <span className='fs-5'>{` (` + (signer?.source || '') + `)`}</span>
              </div>
              <span className='fs-5 mt-1 mb-0'>Balance:</span>
              <span className='fs-4 fw-bold mt-0 mb-1'>{`$ ` + Uik.utils.formatHumanAmount(totalBalance)}</span>
            </div>
          </div>
        </div>

        <div className='stats__token px-5 py-auto'>
          <span className='fs-6'>Native address:</span>
          <span className='fs-5 ps-1'>{address}</span>
          <span className='fs-6'>Evm Address:</span>
          <span className='fs-5 ps-1'>{evmAddress}</span>
        </div>

        <div className='stats__token flex-row px-5 py-auto'>
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
      </div>
      <Uik.Bubbles />
    </div>
  );
}

export default DashboardHead;