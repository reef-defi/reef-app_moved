import {
  appState, hooks, ReefSigner, Components
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import BigNumber from 'bignumber.js';
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { RIcon, SendIcon, SwapIcon } from '../../common/Icons';
import Tabs from '../../common/Tabs';
import NftContext from '../../context/NftContext';
import TokenContext from '../../context/TokenContext';
import TokenPricesContext from '../../context/TokenPricesContext';
import Bind from '../bind/Bind';
// import { bonds } from '../bonds/utils/bonds';
import { ActionButtons } from './ActionButtons';
// import { Balance } from './Balance';
import './Dashboard.css';
import DashboardHead from './DashboardHead';
// import { Nfts } from './Nfts';
// import { Staking } from './Staking';
// import { TokenActivity } from './TokenActivity';
// import { TokenBalances } from './TokenBalances';

const {Icons} = Components;

// const DEFAULT_TABS = [
//   {
//     key: 'tokens',
//     title: 'Tokens',
//   },
//   {
//     key: 'staking',
//     title: 'Staking',
//     notification: bonds?.length,
//   },
//   {
//     key: 'nfts',
//     title: 'NFTs',
//   },
//   {
//     key: 'activity',
//     title: 'Activity',
//   },
// ];

const Dashboard = (): JSX.Element => {
  // let tabs = DEFAULT_TABS;
  const history = useHistory();

  const { nfts } = useContext(NftContext);
  const { tokens, loading } = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);

  const selectedSigner = hooks.useObservableState(appState.selectedSigner$);
  // const [tab, setTab] = useState<string>('');

  // If account is not bound, add bind tab to 'tabs' array
  // if (!!selectedSigner && !selectedSigner.isEvmClaimed) {
  //   const bindTab = { key: 'bind', title: 'Bind Account' };
  //   tabs = [bindTab, ...tabs];
  // }

  // useEffect(() => {
  //   setTab(tabs[0].key);
  // }, [selectedSigner]);

  const totalBalance = useMemo(() => tokens.reduce(
    (acc, { balance, decimals, address }) => acc.plus(
      new BigNumber(balance.toString())
        .div(new BigNumber(10).pow(decimals))
        .multipliedBy(tokenPrices[address] || 0),
    ),
    new BigNumber(0),
  ).toNumber(),
  [tokenPrices, tokens]);

  return (
    <div className='dashboard-mx'>
      <DashboardHead totalBalance={totalBalance} signer={selectedSigner || undefined} />
      <div className='container'>
        <Uik.Divider text='Account overview' className='mt-3'/>

        <div className='row'>
          <div className='col-md-4'>
            <Uik.Text type='lead' text="Your tokens: "/>
            <Uik.Table seamless >
              {/* <Uik.THead>
                <Uik.Tr>
                  <Uik.Th width="10">ID</Uik.Th>
                  <Uik.Th>Name</Uik.Th>
                  <Uik.Th align="center">Status</Uik.Th>
                  <Uik.Th align="right">Trend</Uik.Th>
                  <Uik.Th align="right">Amount</Uik.Th>
                </Uik.Tr>
              </Uik.THead> */}

              <Uik.TBody>
                <Uik.Tr>
                  <Uik.Td>
                    <Uik.Icon />
                  </Uik.Td>
                </Uik.Tr>
              </Uik.TBody>
            </Uik.Table>

          </div>
          <div className='col-md-4'>2</div>
          <div className='col-md-4'>3</div>
          <div className='col-md-4'>4</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
