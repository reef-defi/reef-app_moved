import { Components, ReefSigner, utils as reefUtils } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { Contract, ContractFactory, utils } from 'ethers';
import { Link } from 'react-router-dom';
import { verifyContract } from '../../utils/contract';
import { currentNetwork } from '../../environment';
import { reloadTokens } from '../../store/actions/tokens';
import { metadataReef20Deploy, contractsReef20Deploy, metadataArtifactReef20Deploy } from './reef20DeployTokenData';
import { reloadSignerTokens$ } from '../../state/tokenState';

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
const { Input, NumberInput, InputAmount } = InputModule;
const { ConfirmLabel } = Label;
const { calculateUsdAmount } = reefUtils;
const { Button } = ButtonModule;

interface CreatorComponent {
    signer: ReefSigner | undefined;
}

async function verify(contract: Contract, args: string[]): Promise<boolean> {
  const { compilationTarget } = metadataArtifactReef20Deploy.settings;
  const compTargetFileName = Object.keys(compilationTarget)[0];
  const verified = await verifyContract(contract, {
    source: JSON.stringify(contractsReef20Deploy),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contractName: compilationTarget[compTargetFileName],
    target: metadataArtifactReef20Deploy.settings.evmVersion,
    compilerVersion: `v${metadataArtifactReef20Deploy.compiler.version}`,
    optimization: metadataArtifactReef20Deploy.settings.optimizer.enabled.toString(),
    filename: compTargetFileName,
    runs: metadataArtifactReef20Deploy.settings.optimizer.runs,
  },
  args,
  currentNetwork.reefscanUrl);
  return verified;
}

export const CreatorComponent = ({
  signer,
}: CreatorComponent): JSX.Element => {
  const [resultMessage, setResultMessage] = useState<{complete: boolean, title: string, message: string} | null>(null);
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

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

  useEffect(() => {
    // update balance when tx completes
    // TODO
    if (resultMessage && resultMessage.complete) {
      // TODO remove delay when crawler is updated
      setTimeout(() => {
        reloadSignerTokens$.next();
      }, 2000);
    }
  }, [resultMessage]);

  const init = (): void => {
    setTokenName('');
    setSymbol('');
    setInitialSupply('');
    setResultMessage(null);
  };

  const createToken = async (): Promise<void> => {
    if (!signer) {
      console.log('signer not set ');
      return;
    }
    setResultMessage({ complete: false, title: 'Deploying token', message: 'Sending token contract to blockchain.' });
    const args = [tokenName, symbol.toUpperCase(), utils.parseEther(initialSupply).toString()];
    const deployAbi = metadataReef20Deploy.abi;
    const deployBytecode = `0x${metadataReef20Deploy.data.bytecode.object}`;
    const reef20Contract = new ContractFactory(deployAbi, deployBytecode, signer?.signer);
    let contract: Contract|undefined;
    let verified = false;
    try {
      contract = await reef20Contract.deploy(...args);
    } catch (err) {
      console.log('deploy err=', err);
    }
    if (!contract) {
      setResultMessage({ complete: true, title: 'Error creating token', message: 'Deploying contract failed.' });
      return;
    }
    try {
      setResultMessage({ complete: false, title: 'Verifying deployed token', message: 'Smart contract bytecode is being validated.' });
      verified = await verify(contract, args);
    } catch (err) {
      console.log('verify err=', err);
    }
    if (verified) {
      setResultMessage({ complete: true, title: 'Token created', message: `Congratulations, you have your new token ${tokenName} with address ${contract.address} in your assets. Innitial supply is ${initialSupply} ${symbol.toUpperCase()}. Next step is to create a pool so users can start trading.` });
    } else {
      setResultMessage({ complete: true, title: 'Error verifying token', message: `Verifying deployed contract ${contract.address} failed.` });
    }
  };

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
            <CenterColumn>
              <OpenModalButton id="createModalToggle" disabled={!!validationMsg}>
                {validationMsg || 'Create'}
              </OpenModalButton>
            </CenterColumn>
          </MT>
        </Card>
      </ComponentCenter>

      <ConfirmationModal id="createModalToggle" title="Confirm and Create" confirmBtnLabel="Create" confirmFun={createToken}>
        <Margin size="3">
          <ConfirmLabel title="Name" value={tokenName} />
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Symbol" value={symbol.toUpperCase()} />
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Initial Supply" value={initialSupply ? utils.parseEther(initialSupply).toString() : ''} />
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
              <div>{resultMessage.message}</div>
            </div>
          </MT>
          <MT size="2">
            <ModalFooter>
              <Button disabled={!resultMessage.complete} onClick={init}>Close</Button>
              {resultMessage.complete && (
              <Link to="/add-supply" className="btn btn-reef border-rad">
                Create pool
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
