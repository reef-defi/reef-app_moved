import {
  appState, hooks, Token, TokenPrices, utils
} from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import BigNumber from 'bignumber.js';
import React, {
  useContext, useMemo
} from 'react';
import { useHistory } from 'react-router-dom';
import NftContext from '../../context/NftContext';
import PoolContext from '../../context/PoolContext';
import TokenContext from '../../context/TokenContext';
import TokenPricesContext from '../../context/TokenPricesContext';
import './Dashboard.css';
import DashboardHead from './DashboardHead';

const format = (token: Token, tokenPrices: TokenPrices): number => {
  const res = new BigNumber(token.balance.toString())
    .div(new BigNumber(10).pow(token.decimals))
    .multipliedBy(tokenPrices[token.address] || 0)
    .toFixed(4);
  return new BigNumber(res).toNumber();
}

const formatDateTs = (timestamp: number): string => {
  let date = new Date(timestamp);
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset * 60 * 1000));
  const formatted = date.toISOString().split('T')[0];
  return formatted.split('-').reverse().join('-');
};

const Dashboard = (): JSX.Element => {
  const { nfts } = useContext(NftContext);
  const { tokens, loading } = useContext(TokenContext);
  const tokenPrices = useContext(TokenPricesContext);
  const pools = useContext(PoolContext);

  const selectedSigner = hooks.useObservableState(appState.selectedSigner$);
  const transfers = hooks.useObservableState(appState.transferHistory$);
  
  const totalBalance = useMemo(() => tokens.reduce(
    (acc, { balance, decimals, address }) => acc.plus(
      new BigNumber(balance.toString())
        .div(new BigNumber(10).pow(decimals))
        .multipliedBy(tokenPrices[address] || 0),
    ),
    new BigNumber(0),
  ).toNumber(),
  [tokenPrices, tokens]);


  const userActiveTokens = useMemo(() => tokens
      .filter(({ address }) => tokenPrices[address])
      .filter(({ balance }) => balance.gt(0))
      .sort((a, b) => b.balance.gte(a.balance) ? 1 : -1),
    [tokens, tokenPrices]
  );

  const userNftsView = useMemo(() => nfts
    .slice(0, 10)
    .map(({ address, data, balance, iconUrl, name }) => (
      // TODO Create own component for nft
      <Uik.Tr key={address}>
        <Uik.Td>
          <img src={iconUrl} alt={address} style={{ width: 30, height: 30 }}/>
        </Uik.Td>
        <Uik.Td>{data.type === 'ERC721' ? data.name : name}</Uik.Td>
        <Uik.Td>{balance.toString()}</Uik.Td>
      </Uik.Tr>
    )), 
    [nfts]
  );

  const tokenView = useMemo(() => userActiveTokens
    .slice(0, 10)
    .map((token) => (
      // TODO Create own component for token
      <Uik.Tr key={token.address} className="dash-table-item">
        <Uik.Td>
          <img src={token.iconUrl} alt={token.symbol} style={{ width: 30, height: 30 }}/>
        </Uik.Td>
        <Uik.Td>
          <Uik.Text>{token.symbol}</Uik.Text>
        </Uik.Td>
        <Uik.Td>
          <Uik.Text>
            {`$ ` + Uik.utils.formatHumanAmount(format(token, tokenPrices), 2) }
          </Uik.Text>
        </Uik.Td>
      </Uik.Tr>
    )),
    [tokens, tokenPrices]
  );

  const userActivityView = useMemo(
    () =>
      (transfers || [])
        .slice(0, 10)
        .map(({ inbound, timestamp, token, url }, index) => (
          <Uik.Tr key={index}>
            <Uik.Td>
              <img
                src={token.iconUrl}
                alt={token.symbol}
                style={{ width: 30, height: 30 }}
              />
            </Uik.Td>
            <Uik.Td>
              <Uik.Text>{token.symbol}</Uik.Text>
            </Uik.Td>
            <Uik.Td>
              <Uik.Text>{formatDateTs(new Date(timestamp).getTime())}</Uik.Text>
            </Uik.Td>
            <Uik.Td>
              <span className={`${inbound ? "text-success" : "text-danger"}`}>
                {`$ ` + Uik.utils.formatHumanAmount(format(token, tokenPrices), 2)}
              </span>
            </Uik.Td>
          </Uik.Tr>
        )),
    [transfers, tokenPrices]
  );

  const poolView = useMemo(() => pools
    .filter(({token_data_1, token_data_2}) => !!token_data_1 && !!token_data_2)
    .slice(0, 10)
    .map(({address, token_data_1, token_data_2, token_1, token_2, reserved_1, reserved_2}) => {
      const balance1 = new BigNumber(reserved_1)
        .div(new BigNumber(10).pow(token_data_1!.decimals))
        .multipliedBy(tokenPrices[token_1] || 0);
      const balance2 = new BigNumber(reserved_2)
        .div(new BigNumber(10).pow(token_data_2!.decimals))
        .multipliedBy(tokenPrices[token_2] || 0);
      const res = balance1.plus(balance2).toFixed(4);

      return (
        <Uik.Tr key={address}>
          <Uik.Td>
            <img src={utils.getIconUrl(token_1)} alt={token_data_1!.symbol} style={{ width: 30, height: 30 }}/>
            /
            <img src={utils.getIconUrl(token_2)} alt={token_data_2!.symbol} style={{ width: 30, height: 30 }}/>
          </Uik.Td>
          <Uik.Td>
            <Uik.Text>{token_data_1!.symbol}/{token_data_2!.symbol}</Uik.Text>
          </Uik.Td>
          <Uik.Td>
            <Uik.Text>{'$ ' + Uik.utils.formatHumanAmount(res)}</Uik.Text>
          </Uik.Td>
        </Uik.Tr>
      )
    }),
    [pools, tokenPrices]
  )


  return (
    <div className='dashboard-mx'>
      <DashboardHead totalBalance={totalBalance} signer={selectedSigner || undefined} />

      <div className='container'>
        <Uik.Divider text='Account overview' className='mt-3'/>
        <div className='row mt-2'>
          <div className='col-md-4 p-4'>
            <Uik.Text type='lead' text="Tokens: "/>
            <Uik.Table 
              seamless
            >
              <Uik.TBody>
                {tokenView}
              </Uik.TBody>
            </Uik.Table>
          </div>
          <div className='col-md-4 p-4'>
            <Uik.Text type='lead' text="Nfts: "/>
            <Uik.Table seamless>
              <Uik.TBody>
                {userNftsView}
              </Uik.TBody>
            </Uik.Table>
          </div>
          <div className='col-md-4 p-4'>
            <Uik.Text type='lead' text="Bonds: "/>
            <Uik.Table seamless>
              <Uik.TBody>
                {}
              </Uik.TBody>
            </Uik.Table>
          </div>
          <div className='col-md-4 p-4'>
            <Uik.Text type='lead' text="Activity: "/>
            <Uik.Table seamless>
              <Uik.TBody>
                {userActivityView}
              </Uik.TBody>
            </Uik.Table>
          </div>
        </div>

        <Uik.Divider text='Market overview' className='mt-3'/>
        <div className='row mt-2'>
          <div className='col-md-4 p-4'>
            <Uik.Text type='lead' text="Top 10 Tokens: "/>
            <Uik.Table 
              seamless
            >
              <Uik.TBody>
                {tokenView}
              </Uik.TBody>
            </Uik.Table>
          </div>
          <div className='col-md-4 p-4'>
            <Uik.Text type='lead' text="Top 10 Pools: "/>
            <Uik.Table seamless>
              <Uik.TBody>
                {poolView}
              </Uik.TBody>
            </Uik.Table>
          </div>
          <div className='col-md-4 p-4'>
            <Uik.Text type='lead' text="Market activity:"/>
            <Uik.Table seamless>
              <Uik.TBody>
                {userActivityView}
              </Uik.TBody>
            </Uik.Table>
          </div>
        </div>
      </div>

      <div className='container-fluid bg-grey dashboard-footer d-flex justify-content-center pt-3'>
        <Uik.Text type='headline' text="Footer"/>
      </div>
    </div>
  );
};

export default Dashboard;
