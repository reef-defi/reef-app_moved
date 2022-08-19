import axios, { AxiosResponse } from 'axios';
import { Contract, utils } from 'ethers';
import { ApolloClient, gql } from '@apollo/client';
import { firstValueFrom, Observable } from 'rxjs';
import { graphql } from '@reef-defi/react-lib';

const CONTRACT_VERIFICATION_URL = '/api/verificator/submit-verification';

interface BaseContract {
    runs: number;
    source: string;
    target: string;
    optimization: string;
    compilerVersion: string;
    license: string;
}

export interface VerificationContractReq extends BaseContract {
    name: string;
    address: string;
    filename: string;
    arguments: string;
}

export interface ReefContract extends BaseContract {
    filename: string;
    contractName: string;
}

const contractVerificatorApi = axios.create();

const toContractAddress = (address: string): string => utils.getAddress(address);

const CONTRACT_EXISTS_GQL = gql`
  subscription query ($address: String!) {
            contract(
              where: { address: { _eq: $address } }
            ) {
              address
            }
          }
`;
/* const isContractIndexed$ = (address: string): Observable<boolean> => graphql.apolloClientInstance$.pipe(
  timeout(120000),
  switchMap((apollo) => {
      const rxjsSubj = new Subject();
      // apollo does not use rxjs and switchMap has issues
      apollo.subscribe({
          query: CONTRACT_EXISTS_GQL,
          variables: {address},
          fetchPolicy: 'network-only',
      }).subscribe({
          next(x) { rxjsSubj.next(x) },
          error(err) { rxjsSubj.error(err) },
          complete() { rxjsSubj.complete() }
      });
      return rxjsSubj;
  }),
  map((res:any) => res.data.contract && res.data.contract.length),
  skipWhile((v) => !v),
  catchError((e) => {
    console.log('isContractIndexed$ err=', e);
    return of(false);
  }),
  take(1),
); */
/* es-disable-next-line */
const isContrIndexed = async (address: string): Promise<boolean> => new Promise(async (resolve) => {
  const tmt = setTimeout(() => {
    resolve(false);
  }, 120000);
  const apolloClInst$: unknown = graphql.apolloClientInstance$;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const apollo = await firstValueFrom(apolloClInst$ as Observable<ApolloClient<any>>);
  apollo.subscribe({
    query: CONTRACT_EXISTS_GQL,
    variables: { address },
    fetchPolicy: 'network-only',
  }).subscribe({
    next(result) {
      if (result.data.contract && result.data.contract.length) {
        clearTimeout(tmt);
        resolve(true);
      }
    },
    error(err) {
      clearTimeout(tmt);
      console.log('isContrIndexed error=', err);
      resolve(false);
    },
    complete() {
      clearTimeout(tmt);
    },

  });
}) as Promise<boolean>;

export const verifyContract = async (deployedContract: Contract, contract: ReefContract, arg: string[], url?: string): Promise<boolean> => {
  if (!url) {
    return false;
  }

  try {
    const contractAddress = toContractAddress(deployedContract.address);
    if (!await isContrIndexed(contractAddress)) {
    // if (!await firstValueFrom(isContractIndexed$(contractAddress))) {
      return false;
    }
    const body: VerificationContractReq = {
      address: contractAddress,
      arguments: JSON.stringify(arg),
      name: contract.contractName,
      filename: contract.filename,
      target: contract.target,
      source: contract.source,
      optimization: contract.optimization,
      compilerVersion: contract.compilerVersion,
      license: contract.license,
      runs: contract.runs,
    };
    await contractVerificatorApi.post<VerificationContractReq, AxiosResponse<string>>(`${url}${CONTRACT_VERIFICATION_URL}`, body);
    // (verification_test, body)
    return true;
  } catch (err) {
    console.error('Verification err=', err);
    return false;
  }
};
