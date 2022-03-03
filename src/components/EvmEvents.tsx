import {
  appState,
  Components,
  graphql,
  hooks,
  ReefSigner,
  reefTokenWithAmount,
  Token,
  TokenWithAmount,
  utils as reefUtils,
} from '@reef-defi/react-lib';
import React, {useEffect, useRef, useState} from 'react';
import {Provider} from '@reef-defi/evm-provider';
import {ApolloClient, gql, SubscriptionOptions} from "@apollo/client";
import {ethers} from 'ethers';


const {
  isDataSet,
  getData,
  DataProgress,
} = reefUtils;

const {
  Loading, TransferComponent,
} = Components;

const getGqlContractEventsQuery = (
    contractAddress: string,
    methodSignature?: string,
    perPage = 1,
    offset = 0,
): SubscriptionOptions => {
  const EVM_EVENT_GQL = gql`
    subscription evmEvent(
      $address: String_comparison_exp!
      $perPage: Int!
      $offset: Int!
      $topic0: String_comparison_exp
    ) {
      evm_event(
        limit: $perPage
        offset: $offset
        order_by: [
          { block_id: desc }
          { extrinsic_index: desc }
          { event_index: desc }
        ]
        where: {
          _and: [
            { contract_address: $address }
            { topic_0: $topic0 }
            { method: { _eq: "Log" } }
          ]
        }
      ) {
        contract_address
        data_parsed
        data_raw
        topic_0
        topic_1
        topic_2
        topic_3
        block_id
        extrinsic_index
        event_index
      }
    }
  `;
  return {
    query: EVM_EVENT_GQL,
    variables: {
      address: { _eq: contractAddress },
      topic0: methodSignature
          ? { _eq: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(methodSignature)) }
          : {},
      perPage,
      offset,
    },
    fetchPolicy: 'network-only',
  };
};

export const EvmEvents = (): JSX.Element => {
  const apolloClient: ApolloClient<any>|undefined = hooks.useObservableState(graphql.apolloClientInstance$);
  const [lastEvent, setLastEvent] = useState<any>();
  const [contractAddress, setContractAddress] = useState('0xF5B362d1e8849Dd59500546E3D36C899d449BB67');
  const customEventSubs = useRef<any>();
  const libEventSubs = useRef<any>();

  useEffect(() => {
    if(!apolloClient){
      return;
    }
    // custom graphQL example
    const methodSignature = 'Transfer(address,address,uint256)'
    customEventSubs.current?.unsubscribe();
    customEventSubs.current = apolloClient?.subscribe(
        getGqlContractEventsQuery(contractAddress, methodSignature),
    ).subscribe(({data:{evm_event}}) => console.log('EVM EVENT=', evm_event));

    return ()=>{
      customEventSubs.current?.unsubscribe();
    }
  }, [apolloClient, contractAddress]);


  useEffect(() => {
    // reef library example
    // const methodSignature = 'Transfer(address,address,uint256)'
    libEventSubs.current?.unsubscribe();
    libEventSubs.current = appState.getEvmEvents$(contractAddress).subscribe(([evmEvent]:[any]) => {
      console.log("OBS EVM EV=", evmEvent);
      setLastEvent(evmEvent);
    });

    return ()=>{
      libEventSubs.current?.unsubscribe();
    }
  }, [contractAddress]);

  return (
    <>
      <h5>Evm Events</h5>
      <div>
        contract address:<input value={contractAddress} onChange={({value})=>setContractAddress(value)}/>
      </div>
      <p>last event block: {lastEvent?.block_id}</p>
      <div>

      </div>
    </>
  );
};
