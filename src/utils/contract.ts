import axios, { AxiosResponse } from 'axios';
import { Contract, utils } from 'ethers';
import { gql } from '@apollo/client';
import { graphql } from '@reef-defi/react-lib';
import {
  Observable, switchMap, take, timeout, catchError, of, map, tap, firstValueFrom, skipWhile,
} from 'rxjs';

const CONTRACT_VERIFICATION_URL = '/api/verificator/submit-verification';

interface BaseContract {
    runs: number;
    source: string;
    target: string;
    optimization: string;
    compilerVersion: string;
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
const isContractIndexed$ = (address: string): Observable<boolean> => graphql.apolloClientInstance$.pipe(
  timeout(120000),
  switchMap((apollo) => apollo.subscribe({
    query: CONTRACT_EXISTS_GQL,
    variables: { address },
    fetchPolicy: 'network-only',
  })),
  map((res:any) => res.data.contract && res.data.contract.length),
  skipWhile((v) => !v),
  catchError((e) => {
    console.log('isContractIndexed$ err=', e);
    return of(false);
  }),
  take(1),
);

export const verifyContract = async (deployedContract: Contract, contract: ReefContract, arg: string[], url?: string): Promise<boolean> => {
  if (!url) {
    return false;
  }

  try {
    const contractAddress = toContractAddress(deployedContract.address);
    if (!await firstValueFrom(isContractIndexed$(contractAddress))) {
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
      // not required - license: contract.license,
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
