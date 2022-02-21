import { Components, Network, ReefSigner, rpc, utils } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import BondData from './utils/bond-contract';
import { IBond } from './utils/bonds';
import { BigNumber, Contract, Signer } from 'ethers';
import { secondsToMilliseconds, format, compareAsc, intervalToDuration, formatDistance } from 'date-fns';
import { ethers } from 'ethers';

export const getReefBondContract = (bond: IBond, signer: Signer): Contract => new Contract(bond.bondContractAddress, BondData.abi, signer);
const REEF_ADDR = '0x0000000000000000000000000000000001000000';

const {
  Display,
  Card: CardModule,
  TokenAmountFieldMax,
  Modal,
  Loading,
  Input: InputModule,
  TokenAmountView,
  Label,
  Button: ButtonModule,
  Text,
} = Components;

const {
  ColorText
} = Text;

const {
  ComponentCenter,
  MT,
  CenterColumn,
  Margin,
  CenterRow,
} = Display;

const {
  CardHeader,
  CardHeaderBlank,
  CardTitle,
  Card,
} = CardModule;

const {
  OpenModalButton,
  default: ConfirmationModal,
  ModalFooter,
  ModalBody,
} = Modal;

const { LoadingButtonIconWithText } = Loading;
const {
  Input,
  NumberInput,
  InputAmount
} = InputModule;
const { ConfirmLabel } = Label;
const { Button } = ButtonModule;

interface IBondTimes {
  lockTime: string;
  starting: {
    started: boolean;
    startDate: string;
  },
  ending: {
    ended: boolean;
    endDate: string;
  },
  opportunity: {
    ended: boolean;
    opportunityDate: string;
    timeLeft: string;
  },
}

async function checkIfBondValid(contract: Contract): Promise<string> {
  const { starting, ending, opportunity } = await calcuateBondTimes(contract);
  if (!starting.started) {
    return 'Bonding has not started yet';
  }
  if (opportunity.ended) {
    return 'Opportunity window expired.';
  }
  if (ending.ended) {
    return 'This bond has expired';
  }

  return '';
}

async function stake(erc20Address: string, contract: Contract, signer: ReefSigner, amount: string) {
  const isNotValid = await checkIfBondValid(contract);
  if (isNotValid) return;
  const stakeAmount = BigNumber.from(amount);
  console.log('Stake', stakeAmount);
  const erc20 = await rpc.getREEF20Contract(erc20Address, signer.signer);
  console.log(erc20, 'contract')
  const tx = await erc20?.contract.approve(contract.address, stakeAmount);
  const receipt = await tx.wait();
  console.log('Approved', receipt);
  console.log(contract)
  const staked = await contract.stake(stakeAmount);
  const stakedR = await staked.wait();
  console.log(stakedR, 'Staked');
}

async function exit(contract: Contract) {
  const tx = await contract.exit();
  const receipt = await tx.wait();
  console.log(receipt);
}

function formatSecondsToDate(seconds: number) {
  const milis = secondsToMilliseconds(seconds);
  return format(new Date(milis), 'dd-MM-yyyy HH:mm');
}

function formatTimeLeftObj(obj: Duration) {
  let str = Object.keys(obj)
    .map((key: string) => {
      //@ts-ignore
      if (obj[key as keyof Duration] > 0) {
        return `${obj[key as keyof Duration]} ${key}`;
      }
      return '';
    })
    .filter(val => !!val)
    .join(', ');
  return `${str} left`;
}

async function calcuateBondTimes(contract: Contract | undefined): Promise<IBondTimes> {
  console.log(contract, 'is it set?');
  const starts = (await contract?.startTime())?.toNumber();
  const ends = (await contract?.releaseTime())?.toNumber();
  const opportunity = (await contract?.windowOfOpportunity())?.toNumber();
  const lockTime = formatDistance(new Date(secondsToMilliseconds(ends)), new Date(secondsToMilliseconds(starts)));
  const totalSupply = await contract?.totalSupply();
  console.log(totalSupply.toString(), 'total')
  const timeLeft = formatTimeLeftObj(intervalToDuration({
    start: new Date(),
    end: new Date(secondsToMilliseconds(ends))
  }));
  console.log(lockTime);
  return {
    lockTime,
    starting: {
      started: compareAsc(new Date(), new Date(secondsToMilliseconds(starts))) === 1,
      startDate: formatSecondsToDate(starts),
    },
    ending: {
      ended: compareAsc(new Date(), new Date(secondsToMilliseconds(ends))) === 1,
      endDate: formatSecondsToDate(ends),
    },
    opportunity: {
      ended: compareAsc(new Date(), new Date(secondsToMilliseconds(opportunity))) === 1,
      opportunityDate: formatSecondsToDate(opportunity),
      timeLeft,
    }
  };
}

export const BondsComponent = ({
  account,
  network,
  bond
}: { account?: ReefSigner, network?: Network, bond: IBond }) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [bondAmount, setBondAmount] = useState('');
  const [bondTimes, setBondTimes] = useState<IBondTimes>();
  const [disabledText, setDisabledText] = useState('');
  const [earned, setEarned] = useState('');
  const [lockedAmount, setLockedAmount] = useState('');
  useEffect(() => {
    const contract = getReefBondContract(bond!, account!.signer);
    setContract(contract);
    (async function setVars() {
      const bondTimes = await calcuateBondTimes(contract);
      const isNotValid = await checkIfBondValid(contract);
      const earned = (await contract.earned(account?.evmAddress)).toString();
      const lockedAmount = (await contract.balanceOf(account?.evmAddress)).toString()
      setEarned(earned);
      setLockedAmount(lockedAmount);
      setBondTimes(bondTimes as IBondTimes);
      setDisabledText(isNotValid);
    })();
  }, []);

  return <>
    <ComponentCenter>
      <Card>
        <CardHeader>
          <CardHeaderBlank/>
          <CardTitle title={bond.bondName}/>
          <CardHeaderBlank/>
        </CardHeader>
        <div className='text-center mb-2'>{bond.bondDescription}</div>
        <div className='text-center'>Stake {bond.stake} to earn {bond.farm}</div>
        <MT size="2">
          <NumberInput
            className="form-control form-control-lg border-rad"
            value={bondAmount}
            min={1}
            onChange={setBondAmount}
            disableDecimals
            placeholder="Enter Amount"
          />
        </MT>
        <MT size="2">
          <div className='text-center text-bold'>{ +lockedAmount > 0 ?
            <div>Amount locked: {lockedAmount}</div> :
            <div>No assets locked in this bond</div>
          }</div>
          <div className='text-center text-bold'>Earned: {earned}</div>
          <div className='text-center text-bold'>Lock duration: {bondTimes?.lockTime}</div>
          <div
            className="text-center text-bold">{bondTimes?.starting.started ? 'Bond started on' : 'Bond starts on'}: {bondTimes?.starting?.startDate}</div>
          <div
            className="text-center text-bold">{bondTimes?.opportunity.ended ?
              <ColorText color='danger'>Investment opportunity ended on {bondTimes?.opportunity.opportunityDate}</ColorText> :
              <div>
                <div>Investment ends on {bondTimes?.opportunity.opportunityDate}</div>
                <div>You have {bondTimes?.opportunity.timeLeft} to invest</div>
              </div>
            }
          </div>
          <div
            className="text-center text-bold">
            {bondTimes?.ending.ended ?
              <div>Bond funds are unlocked!</div> :
              <div>
                <div>Funds unlock on: {bondTimes?.ending.endDate}</div>
              </div>
            }
          </div>
        </MT>
        <MT size="2">
          <div className="text-center text-bold">Apy: {bond.apy}%</div>
        </MT>
        <MT size="2">
          <CenterColumn>
            <div className='text-center mb-1'>
              { disabledText && <ColorText color='danger'>
                {disabledText}
              </ColorText> }
            </div>
            <OpenModalButton
              disabled={!bondAmount || bondTimes?.opportunity.ended || bondTimes?.ending.ended}
              id={'bondConfirmation' + bond.id}>
              {'Continue'}
            </OpenModalButton>
          </CenterColumn>
        </MT>
      </Card>
      <ConfirmationModal
        id={'bondConfirmation' + bond.id}
        title="Confirm Bonding"
        confirmBtnLabel="Bond"
        confirmFun={() => {
          stake(bond.farmTokenAddress, contract!, account!, bondAmount);
        }}
      >
        <Margin size="3">
          <ConfirmLabel title="Bond Name" value={bond.bondName}/>
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Bond Amount" value={bondAmount}/>
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Contract" value={bond.bondContractAddress}/>
        </Margin>
        <Margin size="3">
          <ConfirmLabel title="Bonding duration" value={'Until ' + bondTimes?.ending.endDate}/>
        </Margin>
      </ConfirmationModal>
    </ComponentCenter>
  </>;
};
