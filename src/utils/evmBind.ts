import { ethers } from 'ethers';
import { ReefSigner } from '@reef-defi/react-lib';
import { decodeAddress } from '@polkadot/util-crypto';
import { ApiPromise, SubmittableResult } from '@polkadot/api';
import { Bytes, concat } from '@ethersproject/bytes';
import { toUtf8Bytes } from '@ethersproject/strings';
import { Provider } from '@reef-defi/evm-provider';
import { hexToString, u8aToHex } from '@polkadot/util';

export const metamaskSignature = async (data: Bytes): Promise<string | void> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { ethereum } = window;
  if (ethereum) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts) {
      alert('Metamask connection refused');
      return Promise.resolve();
    }
    const ethereumProvider = new ethers.providers.Web3Provider(ethereum);
    const ethereumSigner = ethereumProvider.getSigner(0);
    if (ethereumSigner) {
      // const ethereumAddress = await ethereumSigner.getAddress();
      return ethereumSigner.signMessage(data);
    }
  }
  return Promise.resolve();
};

const _signMessage = async (
  evmAddress: string,
  message: Bytes | string,
): Promise<string> => {
  if (!evmAddress) {
    throw new Error('No binding evm address');
  }
  const messagePrefix = '\x19Ethereum Signed Message:\n';
  if (typeof message === 'string') {
    // eslint-disable-next-line no-param-reassign
    message = toUtf8Bytes(message);
  }
  const bytesMsg = concat([
    toUtf8Bytes(messagePrefix),
    toUtf8Bytes(String(message.length)),
    message,
  ]);
  const res = await metamaskSignature(bytesMsg);
  return res || '';
};

export const getMetamaskSigner = async (): Promise<ethers.providers.JsonRpcSigner | void> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { ethereum } = window;
  if (ethereum) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts) {
      alert('Metamask connection refused');
      return Promise.resolve();
    }
    const ethereumProvider = new ethers.providers.Web3Provider(ethereum);
    return ethereumProvider.getSigner(0);
  }
  return Promise.resolve();
};

const decodeMessage = (reason: any, code: string): string => {
  const reasonString = JSON.stringify(reason).toLowerCase();
  let codeString = `0x${code.substr(138)}`.replace(/0+$/, '');

  // If the codeString is an odd number of characters, add a trailing 0
  if (codeString.length % 2 === 1) {
    codeString += '0';
  }

  return `${reasonString} ${hexToString(codeString)}`;
};

const handleTxResponse = (
  result: SubmittableResult,
  api: ApiPromise,
): Promise<{
  result: SubmittableResult;
  message?: string;
}> => new Promise((resolve, reject) => {
  if (result.status.isFinalized || result.status.isInBlock) {
    const createdFailed = result.findRecord('evm', 'CreatedFailed');
    const executedFailed = result.findRecord('evm', 'ExecutedFailed');

    result.events
      .filter(({ event: { section } }): boolean => section === 'system')
      .forEach((event): void => {
        const {
          event: { data, method },
        } = event;

        if (method === 'ExtrinsicFailed') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const [dispatchError] = data as any[];

          let message = dispatchError.type;

          if (dispatchError.isModule) {
            try {
              const mod = dispatchError.asModule;
              const error = api.registry.findMetaError(
                new Uint8Array([mod.index.toNumber(), mod.error.toNumber()]),
              );
              message = `${error.section}.${error.name}`;
            } catch (error) {
              // swallow
            }
          }

          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message, result });
        } else if (method === 'ExtrinsicSuccess') {
          const failed = createdFailed || executedFailed;
          if (failed) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              message: decodeMessage(
                failed.event.data[1].toJSON(),
                      failed.event.data[2].toJSON() as string,
              ),
              result,
            });
          }
          resolve({ result });
        }
      });
  } else if (result.isError) {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject({ result });
  }
});

export const claimEvmAccount = async (rSigner: ReefSigner, provider: Provider): Promise<void> => {
  const sgnr = rSigner.signer;
  const mmSigner = await getMetamaskSigner();
  const evmAddress = await mmSigner?.getAddress();
  if (!evmAddress) {
    return;
  }

  const isConnented = await sgnr.isClaimed(evmAddress);
  const _substrateAddress = await sgnr.getSubstrateAddress();

  if (isConnented) return;

  const publicKey = decodeAddress(_substrateAddress);
  const data = `Reef evm:${Buffer.from(publicKey).toString('hex')}`;
  const signature = await _signMessage(evmAddress, data);
  const extrinsic = provider.api.tx.evmAccounts.claimAccount(
    evmAddress,
    signature,
  );

  await extrinsic.signAsync(_substrateAddress);

  await new Promise<void>((resolve, reject) => {
    extrinsic
      .send((result: SubmittableResult) => {
        handleTxResponse(result, provider.api)
          .then(() => {
            resolve();
          })
          .catch(({ message, result: res }: any) => {
            if (message === 'evmAccounts.AccountIdHasMapped') {
              resolve();
            }
            reject(message);
          });
      })
      .catch((error: any) => {
        reject(error && error.message);
      });
  });
};
