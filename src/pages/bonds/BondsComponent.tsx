import { Components, Network, ReefSigner, rpc, utils } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import BondData from './utils/bond-contract';
import { IBond } from './utils/bonds';
import { BigNumber, Contract, Signer } from 'ethers';
import { secondsToMilliseconds, format, compareAsc, intervalToDuration, formatDistance } from 'date-fns';
import { ethers } from 'ethers';
import "./bonds.css"

export const getReefBondContract = (bond: IBond, signer: Signer): Contract => new Contract(bond.bondContractAddress, BondData.abi, signer);

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
  availableLockTime: string;
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

async function checkIfBondStakingOpen(contract: Contract, bondTimes?: IBondTimes): Promise<string> {
  const {
    starting,
    ending,
    opportunity
  } = bondTimes || await calcuateBondTimes(contract);
  if (!starting.started) {
    return 'Bonding has not started yet';
  }
  if (ending.ended) {
    return 'This bond has expired';
  }
  if (opportunity.ended) {
    return 'Opportunity window expired.';
  }

  return '';
}

async function bondFunds(erc20Address: string, contract: Contract, signer: ReefSigner, amount: string, status: (status:{message: string})=>void) {
  const isNotValid = await checkIfBondStakingOpen(contract);
  if (isNotValid) return;
  const bondAmount = utils.transformAmount(18, amount);
  // const bondAmount = BigNumber.from(amount);
  console.log(bondAmount, 'amount');
  const erc20 = await rpc.getREEF20Contract(erc20Address, signer.signer);
  try {
    status({message: 'Approving contract'});
    const tx = await erc20?.contract.approve(contract.address, bondAmount);
    const receipt = await tx.wait();
    status({message: 'Staking'});
    const bonded = await contract.stake(bondAmount);
    const bondedR = await bonded.wait();
  } catch (e) {
    console.log('Something went wrong', e);
    status({message: ''});
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
      if (key !== 'seconds' && obj[key as keyof Duration] > 0) {
        return `${obj[key as keyof Duration]} ${key}`;
      }
      return '';
    })
    .filter(val => !!val)
    .join(', ');
  return `${str}`;
}

async function calcuateBondTimes(contract: Contract | undefined): Promise<IBondTimes> {
  // const starts = (new Date('2022-2-22')).getTime() / 1000;
  // const ends = (new Date('2022-3-25 8:33')).getTime() / 1000;
  const starts = (await contract?.startTime())?.toNumber();
  const ends = (await contract?.releaseTime())?.toNumber();
  let opportunity = ends;
  try {
     opportunity = (await contract?.windowOfOpportunity())?.toNumber();
  }catch (e){
  }
  const lockTime = formatDistance(new Date(secondsToMilliseconds(ends)), new Date(secondsToMilliseconds(starts)));
  const availableLockTime = opportunity===ends ? formatDistance(new Date(secondsToMilliseconds(ends)), new Date()) : lockTime;
  const totalSupply = await contract?.totalSupply();
  const timeLeft = formatTimeLeftObj(intervalToDuration({
    start: new Date(),
    end: new Date(secondsToMilliseconds(ends))
  }));

  return {
    lockTime,
    availableLockTime,
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
  bond
}: { account?: ReefSigner, bond: IBond }) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [stakeAmount, setBondAmount] = useState('');
  const [bondTimes, setBondTimes] = useState<IBondTimes>();
  const [stakingClosedText, setStakingClosedText] = useState('');
  const [earned, setEarned] = useState('');
  const [lockedAmount, setLockedAmount] = useState('');
  const [loadingText, setLoadingText] = useState('');
  const [loadingValues, setLoadingValues] = useState(false);

  async function updateLockedAmt(contract: Contract) {
    const lockedAmount = (await contract.balanceOf(account?.evmAddress)).toString();
    setLockedAmount(lockedAmount);
  }

  async function updateEarnedAmt(contract: Contract) {
    const earned = (await contract.earned(account?.evmAddress)).toString();
    setEarned(earned);
  }

  async function updateBondStakingClosedText(contract: Contract, bondTimes?: IBondTimes) {
    const isNotValid = await checkIfBondStakingOpen(contract, bondTimes);
    setStakingClosedText(isNotValid);
  }

  useEffect(() => {
    const contract = getReefBondContract(bond!, account!.signer);
    setContract(contract);
    (async function setVars() {
      setLoadingValues(true);
      const bondTimes = await calcuateBondTimes(contract);
      await updateBondStakingClosedText(contract, bondTimes);
      await updateEarnedAmt(contract);
      await updateLockedAmt(contract);
      setBondTimes(bondTimes as IBondTimes);
      setLoadingValues(false);
    })();
  }, [account?.address]);

  return <>
    {!bondTimes?.lockTime || loadingValues ?

        <ComponentCenter>
          <LoadingWithText text='Loading bond'/>
        </ComponentCenter> :

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
              {!bondTimes?.opportunity.ended && !stakingClosedText ?
                <>
                  <div className='bond-card__info-item'>
                    <div className='bond-card__info-label'>Staking closes in</div>
                    <div className='bond-card__info-value'>{bondTimes?.opportunity.timeLeft}</div>
                  </div>
                </>
              : ""}

              {/*<div className='bond-card__info-item'>
                <div className='bond-card__info-label'>Current daily rewards</div>
                <div className='bond-card__info-value'>...</div>
              </div>

              <div className='bond-card__info-item'>
                <div className='bond-card__info-label'>Estimated yearly rewards</div>
                <div className='bond-card__info-value'>...</div>
              </div>*/}

              <div className='bond-card__info-item'>
                <div className='bond-card__info-label'>Lock duration</div>
                <div className='bond-card__info-value'>{bondTimes?.availableLockTime}</div>
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
              !stakingClosedText && !loadingText ? <div className='bond-card__bottom'>
              <NumberInput
                className="form-control form-control-lg border-rad"
                value={stakeAmount}
                min={1}
                onChange={setBondAmount}
                disableDecimals
                placeholder="Enter amount to bond"
              />
                  {
                    bondTimes?.ending.ended && lockedAmount && earned ?
                      <Button onClick={() => exit(contract)}>
                        Claim rewards
                      </Button> :
                      <OpenModalButton
                        disabled={!stakeAmount || bondTimes?.opportunity.ended || bondTimes?.ending.ended}
                        id={'bondConfirmation' + bond.id}>
                        {'Continue'}
                      </OpenModalButton>
                  }
              </div> :
                  <>{loadingText &&
                    <Components.Loading.LoadingWithText text={loadingText}/>
                  }</>
            }
            <div>{stakingClosedText}</div>
          </div>
        </div>

        <ConfirmationModal
          id={'bondConfirmation' + bond.id}
          title="Confirm Staking"
          confirmBtnLabel="Stake"
          confirmFun={async () => {
            await bondFunds(bond.farmTokenAddress, contract!, account!, stakeAmount, ({message})=>setLoadingText(message));
            await updateLockedAmt(contract!);
            setLoadingText('');
          }}
        >
          <Margin size="3">
            <ConfirmLabel title="Bond Name" value={bond.bondName}/>
          </Margin>
          <Margin size="3">
            <ConfirmLabel title="Stake Amount" value={stakeAmount}/>
          </Margin>
          <Margin size="3">
            <ConfirmLabel title="Contract" value={utils.toAddressShortDisplay(bond.bondContractAddress)}/>
          </Margin>
          <Margin size="3">
            <ConfirmLabel title="Staking duration" value={'Until ' + bondTimes?.ending.endDate}/>
          </Margin>
        </ConfirmationModal>
      </ComponentCenter>
    }
  </>;
};
