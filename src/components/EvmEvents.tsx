import {Components, graphql, hooks, utils as reefUtils, appState,} from '@reef-defi/react-lib';
import React, {useEffect, useRef, useState} from 'react';
import {ApolloClient, gql, SubscriptionOptions} from "@apollo/client";
import {ethers} from 'ethers';
import {from, map, Observable, scan, switchMap} from "rxjs";


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
    methodSignature?: string | null,
    fromBlockId?: number,
    toBlockId?: number,
): SubscriptionOptions => {
    const EVM_EVENT_GQL = gql`
    query evmEvent(
      $address: String_comparison_exp!
      $blockId: bigint_comparison_exp!
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
            address: {_eq: contractAddress},
            topic0: methodSignature
                ? {_eq: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(methodSignature))}
                : {},
            blockId: toBlockId ? {_gte: fromBlockId, _lte: toBlockId} : {_eq: fromBlockId},
        },
        fetchPolicy: 'network-only',
    };
};

const getGqlLastFinalizedBlock = (): SubscriptionOptions => {
    const FINALISED_BLOCK_GQL = gql`
    subscription finalisedBlock {
      block(order_by: {id: desc}, limit: 1, where: {finalized: {_eq: true}}) {
        id
      }
    }
  `;
    return {
        query: FINALISED_BLOCK_GQL,
        variables: {},
        fetchPolicy: 'network-only',
    };
};

function getEvmEvents$(apolloClient: ApolloClient<any>, contractAddress: string, methodSignature?: string, fromBlockId?: number, toBlockId?: number): Observable<any> {
    if (!fromBlockId) {
        return graphql.zenToRx(apolloClient.subscribe(getGqlLastFinalizedBlock())).pipe(
            scan((state, res: any) => {
                const block = res?.data?.block?.length ? res.data.block[0] : null;
                if (!block) {
                    console.warn("NO FINALISED BLOCK RESULT",res);
                    return state;
                }
                let newBlockId = block.id;
                const diff = state.prevBlockId ? newBlockId - state.prevBlockId : 1;
                let fromBlockId = newBlockId;
                let toBlockId = undefined;
                if (diff > 1 && state.prevBlockId) {
                    toBlockId = newBlockId;
                    fromBlockId = state.prevBlockId + 1;
                }
                return {prevBlockId: newBlockId, fromBlockId, toBlockId};
            }, {prevBlockId: undefined, fromBlockId: undefined, toBlockId: undefined}),
            switchMap((res: { fromBlockId: number, toBlockId: number | undefined }) => {
                return from(apolloClient?.query(
                    getGqlContractEventsQuery(contractAddress, methodSignature, res.fromBlockId, res.toBlockId),
                )).pipe(
                    map((events) => ({
                        fromBlockId: res.fromBlockId,
                        toBlockId: res.toBlockId || res.fromBlockId,
                        evmEvents: events.data.evm_event
                    }))
                );
            })
        ) as Observable<any>;
    }
    return from(apolloClient?.query(
        getGqlContractEventsQuery(contractAddress, methodSignature, fromBlockId, toBlockId),
    ))
}

export const EvmEvents = (): JSX.Element => {
    const apolloClient: ApolloClient<any> | undefined = hooks.useObservableState(graphql.apolloClientInstance$);
    const [lastEvents, setLastEvents] = useState<any>();
    const [contractAddress, setContractAddress] = useState('');
    const customEventSubs = useRef<any>();
    const libEventSubs = useRef<any>();

    useEffect(() => {
        // custom graphQL example
        async function fn() {
            if (!apolloClient) {
                return;
            }
            const methodSignature = 'Transfer(address,address,uint256)'
            customEventSubs.current?.unsubscribe();
            let fromBlockId = 0;
            customEventSubs.current = getEvmEvents$(apolloClient, contractAddress, methodSignature, fromBlockId).subscribe((val: any) => {
                console.log("EVM EVENTS=", val);
                setLastEvents(val)
            });
        };
        fn();
        return () => {
            customEventSubs.current?.unsubscribe();
        }
    }, [apolloClient, contractAddress]);

    useEffect(() => {
          // reef library example
          // const methodSignature = 'Transfer(address,address,uint256)'
          libEventSubs.current?.unsubscribe();
          libEventSubs.current = appState.getEvmEvents$(contractAddress).subscribe((evmEvents: any) => {
            console.log("OBS EVM EV=", evmEvents);
          });

          return ()=>{
            libEventSubs.current?.unsubscribe();
          }
        }, [contractAddress]);

    return (
        <>
            <h5>Evm Events</h5>
            <div>
                contract address:<input value={contractAddress}
                                        onChange={({target: {value}}) => setContractAddress(value)}/>
            </div>

            <div>
            {!lastEvents && <span>No event to display</span>}
            {lastEvents && <>
                <div>block id: {lastEvents.fromBlockId}</div>
                <div>events len: {lastEvents.evmEvents.length}</div>
            </>}

            </div>
        </>
    );
};
