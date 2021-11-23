import React, { useEffect } from 'react';
import { Components, utils } from '@reef-defi/react-lib';
import { ethers } from 'ethers';
import { gql, useSubscription } from '@apollo/client';

const { Loading } = Components.Loading;
const { CONTRACT_EVENTS_GQL } = utils;

const transferAbi = ['event Transfer(address indexed from, address indexed to, uint value)'];

function encodeTopicParam():void {
  /* testing to encode here but issue with compiling
const iface = new ethers.utils.Interface(abi);
const encdd = iface._encodeParams([ParamType.from({
  indexed: true,
  name: 'from',
  type: 'address',
})], ['0x9ADdFbFB23974488e51389A19A38946d102e83fE']);
console.log('ENCCCCC', encdd); */
}

function parseLogData(eventJson: string, abi: string[]): { address: string, logDescription: ethers.utils.LogDescription } | undefined {
  const eventLogJson: {topics: string[], data: string, address: string}[] = JSON.parse(eventJson);
  try {
    const iface = new ethers.utils.Interface(abi);
    const logDescription = iface.parseLog(eventLogJson[0]);
    return logDescription ? { address: eventLogJson[0].address, logDescription } : undefined;
  } catch (e) {
    // console.log('errParse=',e.message)
  }

  return undefined;
}

interface TokenActivity {
    address: string | undefined;
}

const offset = 0;
const perPage = 100;
const query = gql`subscription events(
            $perPage: Int!
            $offset: Int!
            $accountAddress: String!
          ) {
            event(
              limit: $perPage
              offset: $offset
              where: { section: { _eq: "evm" }, method: { _eq: "Log" }, data: {_like: $accountAddress}}
              order_by: { block_number: desc, event_index: desc }
            ) {
              block_number
              event_index
              data
              method
              phase
              section
              timestamp
            }
          }
  `;
// where: { section: { _eq: "evm" }, method: { _eq: "Log" },  data: {_like: $accountAddress}}

// "[{"address":"0x36265af0d406b9626c8cdfd7be650b7c78905bed","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000dc2674ff9c5041a8fd3a190aea8b635743341f8e","0x0000000000000000000000000000000000000000000000000000000000000003"],"data":"0x"}]"

export const TokenActivity = ({ address }: TokenActivity): JSX.Element => {
  const accAddress = '0x000000000000000000000000dc2674ff9c5041a8fd3a190aea8b635743341f8e';
  // const accAddress = '0x9ADdFbFB23974488e51389A19A38946d102e83fE';
  const { data: transfers, loading } = useSubscription(query, {
    variables: {
      offset, perPage, accountAddress: `%${accAddress}%`,

      // offset, perPage, blockNumber, contractAddressFilter: token ? `[{"address":"${token.address}"%` : '[{%',
    },
  });
  useEffect(() => {
    console.log('EEE', transfers);
    const transferEvents = transfers?.event?.map((t: any) => parseLogData(t.data, transferAbi)).filter((v: any) => !!v);
    console.log('TTT', transferEvents);
  }, [transfers, loading]);

  return (
    <div className="row">
      <div className="mb-4 col-12 d-flex d-flex-space-between d-flex-vert-base">
        <div>
          <h5 className="my-auto title-color text-semi-bold">Activity</h5>
        </div>
        <div>
          <button
            type="button"
            className="dashboard_refresh-btn button-light radius-border text-color-dark-accent text-regular"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path
                d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"
              />
            </svg>
            Refresh
          </button>
        </div>

      </div>
      <div className="col-12 card">
        {/* {!!token && (
        <div>
          <TokenActivityItem
            timestamp={(new Date()).getTime()}
            token={{ ...token, balance: BigNumber.from('234234') }}
            type={TokenActivityType.RECEIVE}
          />
        </div>
        )}
        {!token && ('Select token for recent transactions.')} */}
      </div>
    </div>
  );
};
