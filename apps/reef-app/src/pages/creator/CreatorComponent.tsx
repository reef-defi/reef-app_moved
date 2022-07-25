import {
  availableNetworks, Components, Network, ReefSigner, utils as reefUtils,
} from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { Contract, ContractFactory, utils } from 'ethers';
import { Link } from 'react-router-dom';
import { verifyContract } from '../../utils/contract';
import { DeployContractData, deployTokens } from './tokensDeployData';

const {
  Display, Card: CardModule, TokenAmountFieldMax, Modal, Loading, Input: InputModule,
  TokenAmountView, Label, Button: ButtonModule,
} = Components;
const {

  ComponentCenter, MT, CenterColumn, Margin, CenterRow,
} = Display;
const {
  CardHeader, CardHeaderBlank, CardTitle, Card,
} = CardModule;
const {
  OpenModalButton, default: ConfirmationModal, ModalFooter, ModalBody,
} = Modal;

const { LoadingButtonIconWithText } = Loading;
const {
  Input, NumberInput, InputAmount, CheckboxInput,
} = InputModule;
const { ConfirmLabel } = Label;
const { calculateUsdAmount } = reefUtils;
const { Button } = ButtonModule;

interface CreatorComponent {
    signer: ReefSigner | undefined;
    network: Network;
    onTxUpdate?: reefUtils.TxStatusHandler;
}

interface ITokenOptions {
  burnable: boolean;
  mintable: boolean;
}

async function verify(contract: Contract, args: string[], network: Network, contractData: DeployContractData): Promise<boolean> {
  const contractDataSettings = contractData.metadata.settings;
  const { compilationTarget } = contractDataSettings;
  const compTargetFileName = Object.keys(compilationTarget)[0];
  const verified = await verifyContract(contract, {
    source: JSON.stringify(contractData.sources),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contractName: compilationTarget[compTargetFileName],
    target: contractDataSettings.evmVersion,
    compilerVersion: `v${contractData.metadata.compiler.version}`,
    optimization: contractDataSettings.optimizer.enabled.toString(),
    filename: compTargetFileName,
    runs: contractData.metadata.settings.optimizer.runs,
    license: 'MIT',
  },
  args,
  network.reefscanUrl);
  return verified;
}

const createToken = async ({
  signer, network, tokenName, symbol, initialSupply, tokenOptions, onTxUpdate, setResultMessage, setVerifiedContract, setDeployedContract,
}: {signer?: ReefSigner, setResultMessage: any, tokenName: string, symbol: string, initialSupply: string, tokenOptions: ITokenOptions, network: Network, onTxUpdate?: reefUtils.TxStatusHandler, setVerifiedContract: any, setDeployedContract: any}): Promise<void> => {
  if (!signer) {
    console.log('signer not set ');
    return;
  }
  setResultMessage({ complete: false, title: 'Deploying token', message: 'Sending token contract to blockchain.' });
  const args = [tokenName, symbol.toUpperCase(), utils.parseEther(initialSupply).toString()];
  let deployContractData = deployTokens.mintBurn;
  if (!tokenOptions.burnable && !tokenOptions.mintable) {
    deployContractData = deployTokens.noMintNoBurn;
  } else if (tokenOptions.burnable && !tokenOptions.mintable) {
    deployContractData = deployTokens.noMintBurn;
  } else if (!tokenOptions.burnable && tokenOptions.mintable) {
    deployContractData = deployTokens.mintNoBurn;
  }
  const deployAbi = deployContractData.metadata.output.abi;
  const deployBytecode = `0x${deployContractData.bytecode.object}`;
  const reef20Contract = new ContractFactory(deployAbi, deployBytecode, signer?.signer);
  const txIdent = Math.random().toString(10);
  let contract: Contract|undefined;
  let verified = false;
  if (onTxUpdate) {
    onTxUpdate({
      txIdent,
    });
  }
  try {
    contract = await reef20Contract.deploy(...args);
  } catch (err:any) {
    if (onTxUpdate) {
      onTxUpdate({
        txIdent,
        error: { message: err.message, code: reefUtils.TX_STATUS_ERROR_CODE.ERROR_UNDEFINED },
        txTypeEvm: true,
        addresses: [signer.address],
      });
    }
    console.log('deploy err=', err);
  }
  if (!contract) {
    setResultMessage({ complete: true, title: 'Error creating token', message: 'Deploying contract failed.' });
    return;
  }
  setDeployedContract(contract);
  if (onTxUpdate) {
    onTxUpdate({
      txIdent,
      txHash: contract.hash,
      isInBlock: true,
      txTypeEvm: true,
      url: `https://${network === availableNetworks.mainnet ? '' : `${network.name}.`}reefscan.com/extrinsic/${contract.hash}`,
      addresses: [signer.address],
    });
  }
  try {
    setResultMessage({ complete: false, title: 'Verifying deployed token', message: 'Smart contract bytecode is being validated.' });
    verified = await verify(contract, args, network, deployContractData);
  } catch (err) {
    console.log('verify err=', err);
  }
  if (verified) {
    setVerifiedContract(contract);
    setResultMessage({
      complete: true, title: 'Token created', message: `Success, your new token ${tokenName} is deployed. Innitial supply is ${initialSupply} ${symbol.toUpperCase()}. Next step is to create a pool so users can start trading.`, contract,
    });
  } else {
    setResultMessage({ complete: true, title: 'Error verifying token', message: `Verifying deployed contract ${contract.address} failed.` });
  }
};

export const CreatorComponent = ({
  signer, onTxUpdate, network,
}: CreatorComponent): JSX.Element => {
  const [resultMessage, setResultMessage] = useState<{complete: boolean, title: string, message: string, contract?: Contract} | null>(null);
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [tokenOptions, setTokenOptions] = useState<ITokenOptions>({ burnable: true, mintable: true });
  const [initialSupply, setInitialSupply] = useState('');
  const [validationMsg, setValidationMsg] = useState('');
  const [verifiedContract, setVerifiedContract] = useState<Contract>();
  const [deployedContract, setDeployedContract] = useState<Contract>();

  useEffect(() => {
    if (tokenName.trim().length < 1) {
      setValidationMsg('Set token name');
      return;
    }

    if (symbol.trim().length < 1) {
      setValidationMsg('Set token symbol');
      return;
    }

    if (initialSupply.trim().length < 1) {
      setValidationMsg('Set innitial supply');
      return;
    }
    const iSupply = parseInt(initialSupply, 10);
    if (Number.isNaN(iSupply) || iSupply < 1) {
      setValidationMsg('Initial supply must be positive whole number');
      return;
    }
    try {
      utils.parseEther(initialSupply);
    } catch (e) {
      setValidationMsg('Initial supply not valid');
      return;
    }

    setValidationMsg('');
  }, [tokenName, symbol, initialSupply]);

  const init = (): void => {
    setTokenName('');
    setSymbol('');
    setInitialSupply('');
    setResultMessage(null);
  };

  // @ts-ignore
  return (
    <>
      { !resultMessage
    && (
    <>
      <ComponentCenter>
        <Card>
          <CardHeader>
            <CardHeaderBlank />
            <CardTitle title="Create Your Token" />
            <CardHeaderBlank />
          </CardHeader>

          <MT size="2">
            <Input
              value={tokenName}
              maxLength={42}
              onChange={setTokenName}
              placeholder="Token Name"
            />
          </MT>
          <MT size="2">
            <Input
              value={symbol}
              maxLength={42}
              onChange={setSymbol}
              placeholder="Token Symbol"
            />
          </MT>
          <MT size="2">
            <NumberInput
              className="form-control form-control-lg border-rad"
              value={initialSupply}
              min={1}
              onChange={(e) => { setInitialSupply(e || ''); }}
              disableDecimals
              placeholder="Token Initial Supply Number"
            />
            <div><small className="text-color-disabled">{initialSupply && `Decimal value on chain: ${utils.parseEther(initialSupply)}`}</small></div>
          </MT>
          <MT size="2">
            <div className="d-flex">
              <div className="mr-2">
                <CheckboxInput
                  checked={tokenOptions.burnable}
                  onChange={(evt) => setTokenOptions({ ...tokenOptions, burnable: !tokenOptions.burnable })}
                  id="burn"
                  labelText="Burnable"
                />
              </div>
              <CheckboxInput
                checked={tokenOptions.mintable}
                onChange={(evt) => setTokenOptions({ ...tokenOptions, mintable: !tokenOptions.mintable })}
                id="mint"
                labelText="Mintable"
              />
            </div>
          </MT>
          <MT size="2">
            <CenterColumn>
              <OpenModalButton id="createModalToggle" disabled={!!validationMsg}>
                {validationMsg || 'Create'}
              </OpenModalButton>
            </CenterColumn>
          </MT>
        </Card>
      </ComponentCenter>

      <ConfirmationModal
        id="createModalToggle"
        title="Confirm and Create"
        confirmBtnLabel="Create"
        confirmFun={() => createToken({
          signer, network, tokenName, symbol, initialSupply, tokenOptions, onTxUpdate, setResultMessage, setVerifiedContract, setDeployedContract,
        })}
      >
        <Margin size="3">
          <ConfirmLabel title="Name" value={tokenName} />
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Symbol" value={symbol.toUpperCase()} />
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Initial Supply" value={initialSupply ? utils.parseEther(initialSupply).toString() : ''} />
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Burnable" value={tokenOptions.burnable ? 'Yes' : 'No'} />
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Mintable" value={tokenOptions.mintable ? 'Yes' : 'No'} />
        </Margin>
      </ConfirmationModal>
    </>
    )}

      {resultMessage && (
      <ComponentCenter>
        <Card>
          <CardHeader>
            <CardHeaderBlank />
            <CardTitle title={resultMessage.title} />
            <CardHeaderBlank />
          </CardHeader>
          <MT size="3">
            <div className="text-center">
              {!resultMessage.complete && <Loading.Loading />}
              <div>
                <p>
                  {resultMessage.message}
                  <br />
                  {resultMessage.contract && (
                  <small><a href={`${network.reefscanFrontendUrl}/contract/${resultMessage.contract.address}`} target="self">open in explorer</a></small>
                  )}
                </p>

              </div>
            </div>
          </MT>
          <MT size="2">
            <ModalFooter>
              <Button disabled={!resultMessage.complete} onClick={init}>Close</Button>
              {resultMessage.complete && (
              <Link to={`/add-supply/0x0000000000000000000000000000000001000000/${deployedContract?.address}`} className="btn btn-reef border-rad">
                <span>Create pool</span>
              </Link>
              )}
              {!resultMessage.complete && <Button disabled>Create pool</Button>}
            </ModalFooter>
          </MT>
        </Card>
      </ComponentCenter>
      )}
    </>
  );
};
