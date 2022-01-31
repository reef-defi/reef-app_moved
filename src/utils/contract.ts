import axios, { AxiosResponse } from 'axios';
import { Contract } from 'ethers';
import { gql } from '@apollo/client';
import {
  Observable, switchMap, take, timeout, catchError, of, map, tap, firstValueFrom, skipWhile,
} from 'rxjs';
import { filter } from 'rxjs/operators';
import { apolloClientInstance$ } from './apolloConfig';

const CONTRACT_VERIFICATION_URL = 'api/verificator/submit-verification';

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

const CONTRACT_EXISTS_GQL = gql`
  subscription query ($address: String!) {
            contract(
              where: { address: { _eq: $address } }
            ) {
              address
            }
          }
`;
const isContractIndexed$ = (address: string): Observable<boolean> => apolloClientInstance$.pipe(
  timeout(120000),
  switchMap((apollo) => apollo.subscribe({
    query: CONTRACT_EXISTS_GQL,
    variables: { address },
    fetchPolicy: 'network-only',
  })),
  map((res:any) => res.data.contract && res.data.contract.length),
  skipWhile((v) => !v),
  catchError(() => of(false)),
  take(1),
);

export const verifyContract = async (deployedContract: Contract, contract: ReefContract, arg: string[], url?: string): Promise<boolean> => {
  if (!url) {
    return false;
  }

  try {
    if (!await firstValueFrom(isContractIndexed$(deployedContract.address.toLowerCase()))) {
      return false;
    }
    const body: VerificationContractReq = {
      address: deployedContract.address,
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
    await contractVerificatorApi.post<VerificationContractReq, AxiosResponse<string>>(`${url}/${CONTRACT_VERIFICATION_URL}`, body);
    // (verification_test, body)
    return true;
  } catch (err) {
    console.error(err);
    console.log('Verification err=', err);
    return false;
  }
};
