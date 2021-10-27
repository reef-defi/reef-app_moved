import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, Components } from '@reef-defi/react-lib';
import { useAppSelector } from '../../store';
import { useLoadSignerTokens } from '../../hooks/useLoadSignerTokens';
import { TokenBalances } from './TokenBalances';
import {
  isValueWithStatusSet,
  TokenWithPrice,
  useSignerTokenBalances,
  ValueStatus, ValueWithStatus,
} from '../../hooks/useSignerTokenBalances';
import { toCurrencyFormat } from '../../utils/utils';
import { Balance } from './Balance';
import { SendIcon } from '../../common/Icons';
import { ActionButtons } from './ActionButtons';

const { retrieveReefCoingeckoPrice } = api;
const { Loading } = Components.Loading;

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const { isLoading: tokensLoading } = useAppSelector((state) => state.tokens);
  const { pools } = useAppSelector((state) => state.pools);
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  const selectedSigner = selectedAccount > -1 && accounts.length > 0 ? accounts[selectedAccount].signer : undefined;
  const signerTokens = useLoadSignerTokens(selectedSigner);
  const [reefPrice, setReefPrice] = useState<number|ValueStatus>(ValueStatus.LOADING);
  const signerTokenBalances: TokenWithPrice[] = useSignerTokenBalances(signerTokens, pools, reefPrice);

  const totalBalance = signerTokenBalances.reduce((state: ValueWithStatus, curr) => {
    if (Number.isNaN(curr.balanceValue) || !isValueWithStatusSet(curr.balanceValue)) {
      return state;
    }
    if (!Number.isNaN(+curr.balanceValue as number) && isValueWithStatusSet(curr.balanceValue)) {
      const stateNr = isValueWithStatusSet(state) ? state as number : 0;
      return stateNr + (curr.balanceValue as number);
    }
    return state;
  }, ValueStatus.LOADING);

  useEffect(() => {
    const getPrice = async ():Promise<void> => {
      let price: number|ValueStatus = ValueStatus.NO_DATA;
      try {
        price = await retrieveReefCoingeckoPrice();
      } catch (e) {
      }
      setReefPrice(price);
    };
    const interval = setInterval(getPrice, 30000);
    getPrice();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-100">
      <div className="mb-4 row">
        <Balance balance={totalBalance} />
        <ActionButtons />
        {/* <div className="dashboard_actions col-12 col-md-6 d-flex d-flex-end d-flex-vert-center">
          <div className="mr-1">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-swap radius-border" onClick={() => { history.push('/swap'); }}>
              <svg className="fill-white" strokeWidth="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" /></svg>
              <br />
              <span className="dashboard_actions_button_text">Swap</span>
            </button>
          </div>
          <div className="mr-1">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-send radius-border">
              <SendIcon />
              <br />
              <span className="dashboard_actions_button_text">Send</span>
            </button>
          </div>
          <div className="">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-buy radius-border">
              <span className="dashboard_actions_button_text">Buy</span>
            </button>
          </div>
        </div> */}
      </div>
      <TokenBalances tokens={signerTokenBalances} />
    </div>
  );
};

export default Dashboard;
