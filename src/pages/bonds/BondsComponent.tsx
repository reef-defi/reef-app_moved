import { Components, Network, ReefSigner, rpc, utils } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import BondData from './utils/bond-contract';
import { IBond } from './utils/bonds';
import { BigNumber, Contract, Signer } from 'ethers';
import { secondsToMilliseconds, format, compareAsc, intervalToDuration, formatDistance } from 'date-fns';
import { ethers } from 'ethers';
import "./bonds.css"

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

const {
  LoadingButtonIconWithText,
  LoadingWithText
} = Loading;
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
  const {
    starting,
    ending,
    opportunity
  } = await calcuateBondTimes(contract);
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
  console.log(erc20, 'contract');
  try {
    const tx = await erc20?.contract.approve(contract.address, stakeAmount);
    const receipt = await tx.wait();
    console.log('Approved', receipt);
    console.log(contract);
    const staked = await contract.stake(stakeAmount);
    const stakedR = await staked.wait();
    console.log(stakedR, 'Staked');
  } catch (e) {
    console.log('Something went wrong', e);
  }
}

async function exit(contract: Contract) {
  try {
    const tx = await contract.exit();
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (e) {
    console.log('Something went wrong', e);
  }
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
  console.log(totalSupply.toString(), 'total');
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
      const lockedAmount = (await contract.balanceOf(account?.evmAddress)).toString();
      setEarned(earned);
      setLockedAmount(lockedAmount);
      setBondTimes(bondTimes as IBondTimes);
      setDisabledText(isNotValid);
    })();
  }, []);

  return <>
    {bondTimes?.lockTime ?
      <ComponentCenter>
        <div className='bond-card'>
          <div className='bond-card__wrapper'>
            <img className='bond-card__token-image' src="/img/reef.png" alt="Reef"/>
            <div className='bond-card__title'>{bond.bondName}</div>
            <div className='bond-card__subtitle'>{bond.bondDescription}</div>
            <div className='bond-card__description'>Stake {bond.stake} to earn {bond.farm}</div>

            <div className='bond-card__stats'>
              <div className='bond-card__stat'>
                <div className='bond-card__stat-label'>Staked</div>
                <div className='bond-card__stat-value'>{lockedAmount}</div>
              </div>

              <div className='bond-card__stat'>
                <div className='bond-card__stat-label'>Earned</div>
                <div className='bond-card__stat-value'>{earned}</div>
              </div>
            </div>

            <div className='bond-card__info'>
              {!bondTimes?.opportunity.ended ?
                <>
                  <div className='bond-card__info-item'>
                    <div className='bond-card__info-label'>Time left</div>
                    <div className='bond-card__info-value'>{bondTimes?.opportunity.timeLeft}</div>
                  </div>
                </>
              : ""}

              <div className='bond-card__info-item'>
                <div className='bond-card__info-label'>Current daily rewards</div>
                <div className='bond-card__info-value'>...</div>
              </div>

              <div className='bond-card__info-item'>
                <div className='bond-card__info-label'>Estimated yearly rewards</div>
                <div className='bond-card__info-value'>...</div>
              </div>

              <div className='bond-card__info-item'>
                <div className='bond-card__info-label'>Lock duration</div>
                <div className='bond-card__info-value'>{bondTimes?.lockTime}</div>
              </div>

              <div className='bond-card__info-item'>
                <div className='bond-card__info-label'>{bondTimes?.starting.started ? 'Bond started on' : 'Bond starts on'}</div>
                <div className='bond-card__info-value'>{bondTimes?.starting?.startDate}</div>
              </div>

              <div className='bond-card__info-item'>
                <div className='bond-card__info-label'>Funds unlock on</div>
                <div className='bond-card__info-value'>{bondTimes?.ending.ended ? "Bond funds are unlocked!" : bondTimes?.ending.endDate}</div>
              </div>
            </div>

            
            {
              !bondTimes?.opportunity.ended ? <div className='bond-card__bottom'>
              <NumberInput
                className="form-control form-control-lg border-rad"
                value={bondAmount}
                min={1}
                onChange={setBondAmount}
                disableDecimals
                placeholder="Enter amount to invest"
              />
              <OpenModalButton
                disabled={!bondAmount || bondTimes?.opportunity.ended || bondTimes?.ending.ended}
                id={'bondConfirmation' + bond.id}>
                {'Continue'}
              </OpenModalButton>
              </div> : ""
            }
              
          </div>
        </div>

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
      </ComponentCenter> :

      <ComponentCenter>
        <LoadingWithText text='Loading bonds...'/>
      </ComponentCenter>
    }
  </>;
};
