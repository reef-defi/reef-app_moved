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
    atBlockId: number,
    methodSignature?: string,
    toBlockId?: number,
): SubscriptionOptions => {
  const EVM_EVENT_GQL = gql`
    subscription evmEvent(
      $address: String_comparison_exp!
      $blockId: Int_comparison_exp!
      $topic0: String_comparison_exp
    ) {
      evm_event(
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
            { block_id: $blockId }
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
      blockId: toBlockId?{ _gte: atBlockId, _lt: toBlockId }:{ _eq: atBlockId },
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
    let atBlockId = 111;
    customEventSubs.current = apolloClient?.subscribe(
        getGqlContractEventsQuery(contractAddress, atBlockId, methodSignature),
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
        contract address:<input value={contractAddress} onChange={({target:{value}})=>setContractAddress(value)}/>
      </div>
      {!lastEvent && <p>No event to display</p> }
      {lastEvent && <>
        <p>event in block: {lastEvent?.block_id}</p>
        <p>event json: {JSON.stringify(lastEvent?.data_raw)}</p>
      </>}
      <div>

      </div>
    </>
  );
};
