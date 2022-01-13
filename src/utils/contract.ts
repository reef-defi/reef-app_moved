import axios, { AxiosResponse } from 'axios';
import { Contract } from 'ethers';
import { delay } from './utils';

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

export const verifyContract = async (deployedContract: Contract, contract: ReefContract, arg: string[], url?: string): Promise<boolean> => {
  if (!url) {
    return false;
  }
  try {
    await delay(5000);
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
    await contractVerificatorApi.post<VerificationContractReq, AxiosResponse<string>>(`${url}${CONTRACT_VERIFICATION_URL}`, body);
    // (verification_test, body)
    return true;
  } catch (err) {
    console.error(err);
    console.log('Verification err=', err);
    return false;
  }
};

/* TODO remove
export const onTxUpdate = (dispatch: Dispatch<TokensActions>, txUpdateData: utils.TxStatusUpdate): void => {
  if (txUpdateData?.isInBlock || txUpdateData?.error) {
    console.log('onTxUpdate RELOADDD');
    const delayMillis = txUpdateData.txTypeEvm ? 2000 : 0;
    setTimeout(() => dispatch(reloadTokens()), delayMillis);
  }
}; */
