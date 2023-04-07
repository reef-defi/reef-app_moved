import {
  availableNetworks,
  Network,
  ReefSigner,
  utils as reefUtils,
} from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpRightFromSquare, faCoins } from '@fortawesome/free-solid-svg-icons';
import { Contract, ContractFactory, utils } from 'ethers';
import { useHistory } from 'react-router-dom';
import Uik from '@reef-defi/ui-kit';
import { verifyContract } from '../../utils/contract';
import { DeployContractData, deployTokens } from './tokensDeployData';
import './creator.css';
import IconUpload from './IconUpload';
import ConfirmToken from './ConfirmToken';

interface CreatorComponent {
  signer: ReefSigner | undefined;
  network: Network;
  onTxUpdate?: reefUtils.TxStatusHandler;
}

interface ITokenOptions {
  burnable: boolean;
  mintable: boolean;
}

interface ResultMessage {
  complete: boolean;
  title: string;
  message: string;
  contract?: Contract;
}

interface CreateToken {
  signer?: ReefSigner;
  setResultMessage: (result: ResultMessage) => void;
  tokenName: string;
  symbol: string;
  initialSupply: string;
  tokenOptions: ITokenOptions;
  network: Network;
  onTxUpdate?: reefUtils.TxStatusHandler;
  setVerifiedContract: (contract: Contract) => void;
  setDeployedContract: (contract: Contract) => void;
}

async function verify(
  contract: Contract,
  args: string[],
  network: Network,
  contractData: DeployContractData,
): Promise<boolean> {
  const contractDataSettings = contractData.metadata.settings;
  const { compilationTarget } = contractDataSettings;
  const compTargetFileName = Object.keys(compilationTarget)[0];
  const verified = await verifyContract(
    contract,
    {
      source: JSON.stringify(contractData.sources),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      contractName: compilationTarget[compTargetFileName],
      target: contractDataSettings.evmVersion,
      compilerVersion: `v${contractData.metadata.compiler.version}`,
      optimization: contractDataSettings.optimizer.enabled.toString(),
      filename: compTargetFileName,
      runs: contractData.metadata.settings.optimizer.runs,
      license: 'MIT',
    },
    args,
    network.verificationApiUrl,
  );
  return verified;
}

const createToken = async ({
  signer,
  network,
  tokenName,
  symbol,
  initialSupply,
  tokenOptions,
  onTxUpdate,
  setResultMessage,
  setVerifiedContract,
  setDeployedContract,
}: CreateToken): Promise<void> => {
  if (!signer) {
    console.log('signer not set ');
    return;
  }
  setResultMessage({
    complete: false,
    title: 'Deploying token',
    message: 'Sending token contract to blockchain.',
  });
  const args = [
    tokenName,
    symbol.toUpperCase(),
    utils.parseEther(initialSupply).toString(),
  ];
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
  const reef20Contract = new ContractFactory(
    deployAbi,
    deployBytecode,
    signer?.signer,
  );
  const txIdent = Math.random().toString(10);
  let contract: Contract | undefined;
  let verified = false;
  if (onTxUpdate) {
    onTxUpdate({
      txIdent,
    });
  }
  try {
    contract = await reef20Contract.deploy(...args);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (onTxUpdate) {
      onTxUpdate({
        txIdent,
        error: {
          message: err.message,
          code: reefUtils.TX_STATUS_ERROR_CODE.ERROR_UNDEFINED,
        },
        txTypeEvm: true,
        addresses: [signer.address],
      });
    }
    console.log('deploy err=', err);
  }
  if (!contract) {
    setResultMessage({
      complete: true,
      title: 'Error creating token',
      message: 'Deploying contract failed.',
    });
    return;
  }
  setDeployedContract(contract);
  if (onTxUpdate) {
    onTxUpdate({
      txIdent,
      txHash: contract.hash,
      isInBlock: true,
      txTypeEvm: true,
      url: `https://${
        network === availableNetworks.mainnet ? '' : `${network.name}.`
      }reefscan.com/extrinsic/${contract.hash}`,
      addresses: [signer.address],
    });
  }
  try {
    setResultMessage({
      complete: false,
      title: 'Verifying deployed token',
      message: 'Smart contract bytecode is being validated.',
    });
    verified = await verify(contract, args, network, deployContractData);
  } catch (err) {
    console.log('verify err=', err);
  }
  if (verified) {
    setVerifiedContract(contract);
    setResultMessage({
      complete: true,
      title: 'Token created',
      message: `Success, your new token ${tokenName} is deployed. Innitial supply is ${initialSupply} ${symbol.toUpperCase()}. Next step is to create a pool so users can start trading.`,
      contract,
    });
  } else {
    setResultMessage({
      complete: true,
      title: 'Error verifying token',
      message: `Verifying deployed contract ${contract.address} failed.`,
    });
  }
};

export const CreatorComponent = ({
  signer,
  onTxUpdate,
  network,
}: CreatorComponent): JSX.Element => {
  const [resultMessage, setResultMessage] = useState<{
    complete: boolean;
    title: string;
    message: string;
    contract?: Contract;
  } | null>(null);
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [tokenOptions, setTokenOptions] = useState<ITokenOptions>({
    burnable: true,
    mintable: true,
  });
  const [initialSupply, setInitialSupply] = useState('');
  const [validationMsg, setValidationMsg] = useState('');
  const [, setVerifiedContract] = useState<Contract>();
  // eslint-disable-next-line
  const [deployedContract, setDeployedContract] = useState<Contract>();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

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
  const handleSupplyInput = (value = ''): void => {
    const numeric = value.replace(/[^0-9]/g, '');
    setInitialSupply(numeric || '');
  };

  const [icon, setIcon] = useState('');

  const history = useHistory();

  // @ts-ignore
  return (
    <>
      <>
        {!resultMessage && (
          <div className="creator">
            <div className="creator__form">
              <Uik.Container flow="spaceBetween">
                <Uik.Container vertical flow="start">
                  <Uik.Text type="headline">Create Your Token</Uik.Text>
                  <Uik.Text type="lead">Use Reef chain to create your own token.</Uik.Text>
                </Uik.Container>
                <IconUpload
                  value={icon}
                  onChange={(e) => setIcon(e)}
                />
              </Uik.Container>

              <Uik.Form>
                <Uik.Container className="creator__form-main">
                  <Uik.Input
                    label="Token Name"
                    placeholder="My Token"
                    value={tokenName}
                    maxLength={42}
                    onInput={(e) => setTokenName(e.target.value)}
                  />

                  <Uik.Input
                    className="creator__token-symbol-input"
                    label="Token Symbol"
                    placeholder="MYTKN"
                    value={symbol}
                    maxLength={42}
                    onInput={(e) => setSymbol(e.target.value)}
                  />
                </Uik.Container>

                <Uik.Input
                  label="Initial Supply"
                  placeholder="0"
                  value={initialSupply}
                  min={1}
                  onInput={(e) => handleSupplyInput(e.target.value)}
                />

                <Uik.Container className="creator__form-bottom">
                  <Uik.Toggle
                    label="Burnable"
                    onText="Yes"
                    offText="No"
                    value={tokenOptions.burnable}
                    onChange={() => setTokenOptions({
                      ...tokenOptions,
                      burnable: !tokenOptions.burnable,
                    })}
                  />

                  <Uik.Toggle
                    label="Mintable"
                    onText="Yes"
                    offText="No"
                    value={tokenOptions.mintable}
                    onChange={() => setTokenOptions({
                      ...tokenOptions,
                      mintable: !tokenOptions.mintable,
                    })}
                  />
                </Uik.Container>
              </Uik.Form>
            </div>
            <div className="creator__preview">
              <div className="creator__preview-wrapper">
                <Uik.Text type="lead" className="creator__preview-title">Token Preview</Uik.Text>

                <div className="creator__preview-token">
                  <div className="creator__preview-token-image">
                    {
                      !!icon
                      && (
                      <img
                        src={icon}
                        alt="Token icon"
                        key={icon}
                      />
                      )
                    }
                  </div>
                  <div className="creator__preview-token-info">
                    <div className="creator__preview-token-name">{ tokenName }</div>
                    <div className="creator__preview-token-symbol">{ symbol }</div>
                  </div>

                  {
                    !!initialSupply
                    && <Uik.Text className="creator__preview-token-supply" type="headline">{ Uik.utils.formatHumanAmount(initialSupply) }</Uik.Text>
                  }
                </div>

                <div
                  className={`
                    creator__preview-info
                    ${!tokenOptions.burnable ? 'creator__preview-info--disabled' : ''}
                  `}
                >
                  <Uik.Container flow="start">
                    <Uik.Icon icon={tokenOptions.burnable ? faCheckCircle : faXmarkCircle} />
                    <Uik.Text>
                      { !tokenOptions.burnable && 'Not ' }
                      Burnable
                    </Uik.Text>
                  </Uik.Container>
                  <Uik.Text type="mini">
                    Existing tokens
                    {' '}
                    { tokenOptions.burnable ? 'can' : 'cannot' }
                    {' '}
                    be destroyed to decrease the total supply.
                  </Uik.Text>
                </div>

                <div
                  className={`
                    creator__preview-info
                    ${!tokenOptions.mintable ? 'creator__preview-info--disabled' : ''}
                  `}
                >
                  <Uik.Container flow="start">
                    <Uik.Icon icon={tokenOptions.mintable ? faCheckCircle : faXmarkCircle} />
                    <Uik.Text>
                      { !tokenOptions.mintable && 'Not ' }
                      Mintable
                    </Uik.Text>
                  </Uik.Container>
                  <Uik.Text type="mini">
                    New tokens
                    {' '}
                    { tokenOptions.mintable ? 'can' : 'cannot' }
                    {' '}
                    be created and added to the total supply.
                  </Uik.Text>
                </div>
                <Uik.Button
                  disabled={!!validationMsg}
                  text="Create Token"
                  fill={!validationMsg}
                  size="large"
                  onClick={() => setConfirmOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        <ConfirmToken
          name={tokenName}
          symbol={symbol}
          supply={initialSupply}
          isBurnable={tokenOptions.burnable}
          isMintable={tokenOptions.mintable}
          isOpen={isConfirmOpen}
          icon={icon}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => createToken({
            signer,
            network,
            tokenName,
            symbol,
            initialSupply,
            tokenOptions,
            onTxUpdate,
            setResultMessage,
            setVerifiedContract,
            setDeployedContract,
          })}
        />
      </>

      {
        resultMessage
        && (
        <div className="creator">
          <div className="creator__creating" key={resultMessage.title}>
            { !resultMessage.complete && <Uik.Loading /> }

            <Uik.Text type="headline">{ resultMessage.title }</Uik.Text>
            <Uik.Text>{ resultMessage.message }</Uik.Text>

            {
              !!resultMessage.contract
              && resultMessage.complete
              && (
              <div className="creator__creating-cta">
                <Uik.Button
                  text="View in Explorer"
                  icon={faArrowUpRightFromSquare}
                  size="large"
                  onClick={() => window.open(`${network.reefscanFrontendUrl}/contract/${resultMessage.contract?.address}`)}
                />

                <Uik.Button
                  fill
                  text="Create a Pool"
                  icon={faCoins}
                  size="large"
                  onClick={() => history.push('/pools')}
                />
              </div>
              )
            }

            {
              resultMessage.title === 'Error creating token'
              && (
              <div className="creator__creating-cta">
                <Uik.Button
                  text="Return to Creator"
                  size="large"
                  onClick={init}
                />
              </div>
              )
            }
          </div>
        </div>
        )
      }
    </>
  );
};
