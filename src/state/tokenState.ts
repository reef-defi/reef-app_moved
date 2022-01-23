import {
  combineLatest, map, mergeScan, Observable, of, shareReplay, startWith, Subject, switchMap, timer, from,
} from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  api, Network, Pool, ReefSigner, reefTokenWithAmount, rpc, Token,
} from '@reef-defi/react-lib';
import { BigNumber } from 'ethers';
import { ApolloClient, gql } from '@apollo/client';
import { combineTokensDistinct, toTokensWithPrice } from './util';
import { getAddressUpdateActionTypes, UpdateDataCtx, UpdateDataType } from './updateCtxUtil';
import { selectedSigner$, selectedSignerUpdateCtx$ } from './accountState';
import { selectedNetworkSubj } from './providerState';
import { apolloClientInstance$ } from '../utils/apolloConfig';

const validatedTokens = { tokens: [] };

export const reefPrice$ = timer(0, 60000).pipe(
  switchMap(api.retrieveReefCoingeckoPrice),
  shareReplay(1),
);

export const validatedTokens$ = of(validatedTokens.tokens as Token[]);
export const reloadSignerTokens$ = new Subject<void>();

function updateReefBalance(tokens: Token[], balance: BigNumber): Promise<Token[]> {
  const reefTkn = tokens.find((t) => t.address === reefTokenWithAmount().address);
  if (reefTkn) {
    reefTkn.balance = balance;
  }
  return Promise.resolve([...tokens]);
}

export const selectedSignerTokenBalancesHTTP$ = combineLatest([selectedSignerUpdateCtx$, selectedNetworkSubj, reloadSignerTokens$.pipe(startWith(null))]).pipe(
  mergeScan((state: { tokens: Token[], stopEmit?: boolean }, [signerCtx, network, _]: [UpdateDataCtx<ReefSigner>, Network, any]) => {
    if (!signerCtx.data) {
      return Promise.resolve({ tokens: [], stopEmit: false });
    }
    const isTokenUpdate = getAddressUpdateActionTypes(signerCtx.data.address, signerCtx.updateActions).indexOf(UpdateDataType.ACCOUNT_TOKENS) >= 0;
    if (isTokenUpdate) {
      return api.loadSignerTokens(signerCtx.data, network).then((tokens) => ({ tokens, stopEmit: false }));
    }
    const isReefUpdate = getAddressUpdateActionTypes(signerCtx.data.address, signerCtx.updateActions).indexOf(UpdateDataType.ACCOUNT_NATIVE_BALANCE) >= 0;
    if (isReefUpdate) {
      return updateReefBalance(state.tokens, signerCtx.data.balance).then((tokens) => ({ tokens, stopEmit: false }));
    }
    return Promise.resolve({ tokens: state.tokens, stopEmit: true });
  }, { tokens: [], stopEmit: false }),
  filter((v: { tokens: Token[], stopEmit?: boolean }) => !v.stopEmit),
  map((state) => state.tokens),
  shareReplay(1),
) as Observable<Token[]>;

const SIGNER_TOKENS_GQL = gql`
  subscription query ($accountId: String!) {
            token_holder(
              order_by: { balance: desc }
              where: { signer: { _eq: $accountId } }
            ) {
              token_address
              balance
              decimals
            }
          }
`;
const CONTRACT_DATA_GQL = gql`
  query query ($addresses: [String!]!) {
            verified_contract(
              where: { address: { _in: $addresses } }
            ) {
              address
              contract_data
            }
          }
`;

// eslint-disable-next-line camelcase
const fetchTokensData = (apollo: ApolloClient<any>, missingCacheContractDataAddresses: string[], state: { tokens: Token[]; contractData: Token[] }): Promise<Token[]> => apollo.query({
  query: CONTRACT_DATA_GQL,
  variables: { addresses: missingCacheContractDataAddresses },
})
// eslint-disable-next-line camelcase
  .then((verContracts) => verContracts.data.verified_contract.map((vContract: { address: string, contract_data: any }) => ({
    address: vContract.address,
    iconUrl: vContract.contract_data.token_icon_url,
    decimals: vContract.contract_data.decimals,
    name: vContract.contract_data.name,
    symbol: vContract.contract_data.symbol,
  } as Token)))
  .then((newTokens) => newTokens.concat(state.contractData));

// TODO replace with our own from lib and remove
const toPlainString = (num: number): string => (`${+num}`).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
  (a, b, c, d, e) => (e < 0
    ? `${b}0.${Array(1 - e - c.length).join('0')}${c}${d}`
    : b + c + d + Array(e - d.length + 1).join('0')));

export const selectedSignerTokenBalancesWS$ = combineLatest([apolloClientInstance$, selectedSigner$]).pipe(
  switchMap(([apollo, signer]) => (!signer ? []
    : from(apollo.subscribe({
      query: SIGNER_TOKENS_GQL,
      variables: { accountId: signer.address },
      fetchPolicy: 'network-only',
    })).pipe(
      map((res: any) => (res.data && res.data.token_holder ? res.data.token_holder : undefined)),
      // eslint-disable-next-line camelcase
      mergeScan((state: { tokens: Token[], contractData: Token[] }, tokenBalances: { token_address: string, balance: number, decimals: number }[]) => {
        const missingCacheContractDataAddresses = tokenBalances.filter((tb) => !state.contractData.some((cd) => cd.address === tb.token_address)).map((tb) => tb.token_address);
        const contractDataPromise = missingCacheContractDataAddresses.length
        // eslint-disable-next-line camelcase
          ? fetchTokensData(apollo, missingCacheContractDataAddresses, state)
          : Promise.resolve(state.contractData);

        return contractDataPromise.then((cData: Token[]) => {
          const tkns = tokenBalances.map((tBalance) => {
            const cDataTkn = cData.find((cd) => cd.address === tBalance.token_address) as Token;
            return { ...cDataTkn, balance: BigNumber.from(toPlainString(tBalance.balance)) };
          }).filter((v) => !!v);
          return { tokens: tkns, contractData: cData };
        });
      }, { tokens: [], contractData: [] }),
      map((val: {tokens: Token[]}) => val.tokens),
    )

  )),
);

export const allAvailableSignerTokens$ = combineLatest([selectedSignerTokenBalancesWS$, validatedTokens$]).pipe(
  map(combineTokensDistinct),
  shareReplay(1),
);

// TODO when network changes signer changes as well? this could make 2 requests unnecessary - check
export const pools$: Observable<Pool[]> = combineLatest([allAvailableSignerTokens$, selectedNetworkSubj, selectedSigner$]).pipe(
  switchMap(([tkns, network, signer]) => {
    console.log('LOAD pools=', signer, tkns);
    return signer ? rpc.loadPools(tkns, signer.signer, network.factoryAddress) : [];
  }),
  shareReplay(1),
);

// TODO pools and tokens emit events at same time - check how to make 1 event from it
export const tokenPrices$ = combineLatest([allAvailableSignerTokens$, reefPrice$, pools$]).pipe(
  map(toTokensWithPrice),
  shareReplay(1),
);
