import axios, { AxiosResponse } from 'axios';
import { Contract, utils } from 'ethers';
import { ApolloClient, gql } from '@apollo/client';
import { firstValueFrom, Observable } from 'rxjs';
import { graphql } from '@reef-defi/react-lib';

const CONTRACT_VERIFICATION_URL = '/verification/submit';

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
      contracts(limit: 1, where: {id_eq: $address}) {
        id
      }
  }
          
          
`;

const isContrIndexed = async (address: string): Promise<boolean> => new Promise(async (resolve) => {
  const tmt = setTimeout(() => {
    resolve(false);
  }, 120000);
  const apolloClInst$: unknown = graphql.apolloExplorerClientInstance$;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const apollo = await firstValueFrom(apolloClInst$ as Observable<ApolloClient<any>>);
  const subs = apollo.subscribe({
    query: CONTRACT_EXISTS_GQL,
    variables: { address },
    fetchPolicy: 'network-only',
  }).subscribe({
    next(result) {
      if (result.data.contracts && result.data.contracts.length) {
        clearTimeout(tmt);
        resolve(true);
        subs.unsubscribe();
      }
    },
    error(err) {
      clearTimeout(tmt);
      console.log('isContrIndexed error=', err);
      resolve(false);
      subs.unsubscribe();
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
