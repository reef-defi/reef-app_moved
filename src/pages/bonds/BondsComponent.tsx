import {
  Components, Network, ReefSigner, rpc, utils,
} from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import {
  BigNumber, Contract, Signer, ethers,
} from 'ethers';
import {
  secondsToMilliseconds, format, compareAsc, intervalToDuration, formatDistance,
} from 'date-fns';
import './bonds.css';
import BN from 'bn.js';
import {
  BN_THOUSAND, BN_ZERO, isBn, isFunction,
} from '@polkadot/util';
import { DeriveEraRewards, DeriveOwnSlashes, DeriveStakerPoints } from '@polkadot/api-derive/types';
import { Provider } from '@reef-defi/evm-provider';
import { IBond } from './utils/bonds';
import BondData from './utils/bond-contract';

export const Skeleton = (): JSX.Element => (
  <div className="bond-skeleton">
    <div className="bond-skeleton__wrapper">
      <div className="bond-skeleton__image" />
      <div className="bond-skeleton__title" />
      <div className="bond-skeleton__subtitle" />
      <div className="bond-skeleton__stats">
        <div className="bond-skeleton__stat" />
        <div className="bond-skeleton__stat" />
      </div>
      <div className="bond-skeleton__info">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="bond-skeleton__cta" />
    </div>
  </div>
);

export const getReefBondContract = (bond: IBond, signer: Signer): Contract => new Contract(bond.bondContractAddress, BondData.abi, signer);

const {
  Display,
  Card: CardModule,
  Modal,
  Loading,
  Input: InputModule,
  Label,
  Button: ButtonModule,
  Text,
} = Components;

const {
  ColorText,
} = Text;

const {
  ComponentCenter,
  MT,
  Margin,
} = Display;
const {
  OpenModalButton,
  default: ConfirmationModal,
} = Modal;

const {
  NumberInput,
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

interface ITxStatus {
  state: 'ERROR' | 'DONE';
  text: string;
}

async function exit(contract: Contract, status: (status: { message: string }) => void): Promise<void> {
  try {
    status({ message: 'Claiming funds' });
    const tx = await contract.exit();
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (e) {
    status({ message: '' });
    console.log('Something went wrong', e);
  }
}

function formatSecondsToDate(seconds: number): string {
  const milis = secondsToMilliseconds(seconds);
  return format(new Date(milis), 'dd-MM-yyyy HH:mm');
}

function formatTimeLeftObj(obj: Duration): string {
  const str = Object.keys(obj)
    .map((key: string) => {
      if (key !== 'seconds' && obj[key as keyof Duration]! > 0) {
        return `${obj[key as keyof Duration]} ${key}`;
      }
      return '';
    })
    .filter((val) => !!val)
    .join(', ');
  return `${str}`;
}

async function calcuateBondTimes(contract: Contract): Promise<IBondTimes> {
  const starts = (await contract?.startTime()).toNumber();
  const ends = (await contract?.releaseTime()).toNumber();
  let opportunity = ends;
  try {
    opportunity = (await contract?.windowOfOpportunity())?.toNumber();
  } catch (e) {
  }
  const lockTime = formatDistance(new Date(secondsToMilliseconds(ends)), new Date(secondsToMilliseconds(starts)));
  const availableLockTime = opportunity === ends ? formatDistance(new Date(secondsToMilliseconds(ends)), new Date()) : lockTime;
  const totalSupply = await contract?.totalSupply();
  const timeLeft = formatTimeLeftObj(intervalToDuration({
    start: new Date(),
    end: new Date(secondsToMilliseconds(ends)),
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
    },
  };
}

async function checkIfBondStakingOpen(contract: Contract, bondTimes?: IBondTimes): Promise<string> {
  const {
    starting,
    ending,
    opportunity,
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

async function bondFunds(erc20Address: string, contract: Contract, signer: ReefSigner, amount: string, status: (status: { message: string }) => void): Promise<void> {
  const isNotValid = await checkIfBondStakingOpen(contract);
  if (isNotValid) return;
  status({ message: 'Approving contract' });
  const bondAmount = utils.transformAmount(18, amount);
  // const bondAmount = BigNumber.from(amount);
  const erc20 = await rpc.getREEF20Contract(erc20Address, signer.signer);
  const tx = await erc20?.contract.approve(contract.address, bondAmount);
  const receipt = await tx.wait();
  status({ message: 'Staking' });
  const bonded = await contract.stake(bondAmount);
  const bondedR = await bonded.wait();
}

const formatAmountNearZero = (amount: string, symbol = ''): string => {
  let prefix = '';
  const decimalPlaces = 2;
  const weiAmt = ethers.utils.formatEther(amount);
  let fixedVal = (+weiAmt).toFixed(decimalPlaces);
  const amountBN = ethers.utils.parseEther(weiAmt);
  const isPositive = amountBN.gt('0');
  if (isPositive
    && amountBN.lt(ethers.utils.parseEther('0.01'))
  ) {
    prefix = '~';
  }
  if (amountBN.gte(ethers.utils.parseEther('1'))) {
    fixedVal = (+weiAmt).toFixed(0);
  }
  return symbol ? `${prefix}${fixedVal} ${symbol}` : `${prefix}${fixedVal}`;
};

interface ToBN {
  toBn: () => BN;
}

export function balanceToNumber(amount: BN | ToBN = BN_ZERO, divisor: BN): number {
  let value = BN_ZERO;

  if (isBn(amount)) {
    value = amount;
  } else if (isFunction(amount)) {
    value = amount.toBn();
  }

  return value.mul(BN_THOUSAND).div(divisor).toNumber() / 1000;
}

interface ValidatorEra { era: string; slash: number; reward: number }

function extractRewards(erasRewards: DeriveEraRewards[] = [], ownSlashes: DeriveOwnSlashes[] = [], allPoints: DeriveStakerPoints[] = [], divisor: BN): ValidatorEra[] {
  const eraValues: ValidatorEra[] = [];

  erasRewards.forEach(({ era, eraReward }): void => {
    const points = allPoints.find((point) => point.era.eq(era));
    const slashed = ownSlashes.find((slash) => slash.era.eq(era));
    const reward = points?.eraPoints.gtn(0)
      ? balanceToNumber(points.points.mul(eraReward).div(points.eraPoints), divisor)
      : 0;
    const slash = slashed
      ? balanceToNumber(slashed.total, divisor)
      : 0;

    if (reward > 0 || eraValues.length > 0) {
      eraValues.push({ era: era.toHuman(), reward, slash });
    }
  });

  return eraValues;
}

const calcReturn = async (provider: Provider, validatorId: string): Promise< {rewards: ValidatorEra[]; total:number; average:number} > => {
  const { api } = provider;
  const eraRewards = await api.derive.staking.erasRewards();

  const points = await api.derive.staking.stakerPoints(validatorId, false);
  const slashes = await api.derive.staking.ownSlashes(validatorId, false);
  const decimals = provider.api.registry.chainDecimals[0];
  const divisor = new BN('1'.padEnd(decimals + 1, '0'));

  const rewards = extractRewards(eraRewards, slashes, points, divisor);
  const total = rewards.reduce((state: number, era: ValidatorEra) => state + era.reward - era.slash, 0);
  const average = total / rewards.length;
  return { rewards, total, average };
};

export const BondsComponent = ({
  account,
  bond,
}: { account?: ReefSigner; bond: IBond;}): JSX.Element => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [bondAmount, setBondAmount] = useState('');
  const [bondAmountMax, setBondAmountMax] = useState(0);
  const [bondTimes, setBondTimes] = useState<IBondTimes>();
  const [stakingClosedText, setStakingClosedText] = useState('');
  const [earned, setEarned] = useState('');
  const [lockedAmount, setLockedAmount] = useState('');
  const [loadingText, setLoadingText] = useState('');
  const [loadingValues, setLoadingValues] = useState(false);
  const [txStatus, setTxStatus] = useState<ITxStatus | undefined>(undefined);
  const [validationText, setValidationText] = useState('');
  const [bondRewards, setBondRewards] = useState<{total:number, average:number, days:number}>();

  /* useEffect(() => {
    if (bondRewards) {
      const totalLocked = parseFloat(bondTotalLocked);
      const earnedRel = totalLocked / bondRewards.total;
      const averageEarned = earnedRel * (bondRewards.average);
      const daysInYear = 365;
      const yearlyEstimate = averageEarned * daysInYear;
      let apy = ((yearlyEstimate / parseFloat(lockedAmount)) * 100);
      apy = !Number.isNaN(apy) ? parseFloat(apy.toFixed(2)) : 0;
      setStakedRewards({
        totalEarned: totalLocked, averageEarned, yearlyEstimate, apy,
      });
    }
  }, [bondRewards, bondTotalLocked]); */

  useEffect(() => {
    const setVals = async (): Promise<void> => {
      if (!account || !bond.bondValidatorAddress) {
        return;
      }
      const { rewards, total, average } = await calcReturn(account.signer.provider, bond.bondValidatorAddress);
      setBondRewards({ total, average, days: rewards.length });
    };
    setVals();
  }, [account, bond.bondValidatorAddress]);

  const updateLockedAmt = async (c: Contract, accountEvmAddress?: string): Promise<void> => {
    if (!accountEvmAddress) {
      return;
    }
    const lAmount = await c.balanceOf(accountEvmAddress);
    setLockedAmount(formatAmountNearZero(lAmount.toString()));
    const lockedElem = document.querySelector('.bond-card__stat-value');
    if (lockedElem) {
      lockedElem.classList.add('bond-card__stat-value--animate');
      setTimeout(() => {
        lockedElem.classList.remove('bond-card__stat-value--animate');
      }, 1000);
    }
  };

  const updateButtonText = (): void => {
    if (bondTimes?.opportunity.ended) {
      setValidationText('Staking closed');
      return;
    }
    if (bondTimes?.ending.ended) {
      setValidationText('Bond expired');
      return;
    }
    if (!bondAmount) {
      setValidationText('Enter amount to stake');
    } else if (+bondAmount > bondAmountMax) {
      if (bondAmountMax > 0) {
        setValidationText(`Amount exceeds max ${bondAmountMax} available`);
      } else {
        setValidationText('Minimum bonding balance is 100');
      }
    } else {
      setValidationText('');
    }
  };

  useEffect(() => {
    updateButtonText();
  }, []);

  useEffect(() => {
    const balanceFixedAmt: number = +ethers.utils.formatEther(account?.balance || '0');
    const keepMinBalance = 201;
    const balanceMax: number = balanceFixedAmt >= keepMinBalance? (+(balanceFixedAmt - keepMinBalance)):0;
    setBondAmountMax(+balanceMax.toFixed(0));
  }, [account?.balance]);

  async function updateEarnedAmt(newContract: Contract, accountEvmAddress: string): Promise<void> {
    const e = await newContract.earned(accountEvmAddress);
    // console.log("eeeeee=",e.toString());
    setEarned(formatAmountNearZero(e.toString()));
  }

  async function updateBondStakingClosedText(newContract: Contract, newBondTimes?: IBondTimes): Promise<void> {
    const isNotValid = await checkIfBondStakingOpen(newContract, newBondTimes);
    setStakingClosedText(isNotValid);
  }

  useEffect(() => {
    updateButtonText();
  }, [bondAmount]);

  useEffect(() => {
    if (!account) { return; }

    const updatedContract = getReefBondContract(bond!, account.signer);
    setContract(updatedContract);

    const setVars = async (): Promise<void> => {
      setLoadingValues(true);
      const newBondTimes = await calcuateBondTimes(updatedContract);
      await updateBondStakingClosedText(updatedContract, newBondTimes);
      const accountEvmAddress = account.evmAddress;
      await updateEarnedAmt(updatedContract, accountEvmAddress);
      await updateLockedAmt(updatedContract, accountEvmAddress);
      setBondTimes(newBondTimes);
      setLoadingValues(false);
    };

    setVars();
  }, [account?.address]);

  return (
    <>
      {!bondTimes?.lockTime || loadingValues

        ? (
          <ComponentCenter>
            <Skeleton />
          </ComponentCenter>
        )

        : (
          <ComponentCenter>
            <div className="bond-card">
              <div className="bond-card__wrapper">
                <img className="bond-card__token-image" src="/img/reef.png" alt="Reef" />
                <div className="bond-card__title">{bond.bondName}</div>
                <div className="bond-card__subtitle">{bond.bondDescription}</div>
                <div className="bond-card__description">
                  Stake
                  {bond.stake}
                  {' '}
                  to earn
                  {bond.farm}
                  {' '}
                  validator rewards
                </div>

                <div className="bond-card__stats">
                  <div className="bond-card__stat">
                    <div className="bond-card__stat-label">Staked</div>
                    <div className="bond-card__stat-value">{lockedAmount}</div>
                  </div>

                  <div className="bond-card__stat">
                    <div className="bond-card__stat-label">Earned</div>
                    <div className="bond-card__stat-value">{earned}</div>
                  </div>
                </div>

                <div className="bond-card__info">
                  <>
                    <div className="bond-card__info-item">
                      <div className="bond-card__info-label">Bond contract</div>
                      <div className="bond-card__info-value"><a href={`https://reefscan.com/contract/${bond.bondContractAddress}`} target="_blank" rel="noreferrer">{utils.toAddressShortDisplay(bond.bondContractAddress)}</a></div>
                    </div>
                  </>
                  {!bondTimes?.opportunity.ended && !stakingClosedText
                    ? (
                      <>
                        <div className="bond-card__info-item">
                          <div className="bond-card__info-label">Staking closes in</div>
                          <div className="bond-card__info-value">{bondTimes?.opportunity.timeLeft}</div>
                        </div>
                      </>
                    )
                    : ''}

                  {/* { (
                  <div className="bond-card__info-item">
                    <div className="bond-card__info-label">Expected Bond APY</div>
                    <div className="bond-card__info-value">
                      {}
                    </div>
                  </div>
                  )} */}

                  {/* {
                !bondTimes.ending.ended
                && (
                <div className="bond-card__info-item">
                  <div className="bond-card__info-label">Lock duration</div>
                  <div className="bond-card__info-value">{bondTimes?.availableLockTime}</div>
                </div>
                )
              } */}

                  <div className="bond-card__info-item">
                    <div
                      className="bond-card__info-label"
                    >
                      {bondTimes?.starting.started ? 'Bond started on' : 'Bond starts on'}
                    </div>
                    <div className="bond-card__info-value">{bondTimes?.starting?.startDate}</div>
                  </div>

                  <div className="bond-card__info-item">
                    <div className="bond-card__info-label">Funds unlock on</div>
                    <div
                      className="bond-card__info-value"
                    >
                      {bondTimes?.ending.ended ? 'Bond funds are unlocked!' : bondTimes?.ending.endDate}
                    </div>
                  </div>
                </div>

                {
              account && !stakingClosedText && !loadingText ? (
                <div className="bond-card__bottom">
                  <NumberInput
                    className="form-control form-control-lg border-rad"
                    value={bondAmount}
                    min={0}
                    onChange={setBondAmount}
                    disableDecimals
                    placeholder="Enter amount to bond"
                  />
                  <div className="max-btn-w">
                    <span
                      className="text-primary text-decoration-none"
                      role="button"
                      onClick={() => setBondAmount(bondAmountMax.toString(10))}
                    >
                      <small>(Max)</small>
                    </span>
                  </div>
                  <OpenModalButton
                    disabled={!!validationText || bondTimes?.opportunity.ended || bondTimes?.ending.ended}
                    id={`bondConfirmation${bond.id}`}
                  >
                    {validationText || 'Continue'}
                  </OpenModalButton>
                </div>
              ) : (
                <>
                  {loadingText
                && <Components.Loading.LoadingWithText text={loadingText} />}
                </>
              )
}
                <div>{stakingClosedText}</div>
                {txStatus && txStatus.state
            && (
            <strong className={`mt-3 ${txStatus.state === 'ERROR' ? 'text-danger' : 'text-success'}`}>
              {txStatus.text}
            </strong>
            )}
                <div className="mt-2">
                  {
                !loadingText && bondTimes.ending.ended
                && (
                <Button
                  disabled={!(+lockedAmount > 0)}
                  onClick={() => exit(contract!, ({ message }) => setLoadingText(message))}
                >
                  Claim rewards
                </Button>
                )
              }
                </div>
              </div>
            </div>

            <ConfirmationModal
              id={`bondConfirmation${bond.id}`}
              title="Confirm Staking"
              confirmBtnLabel="Stake"
              confirmFun={async () => {
                setLoadingText('Processing...');
                try {
                  await bondFunds(bond.farmTokenAddress, contract!, account!, bondAmount, ({ message }) => setLoadingText(message));
                  setTxStatus({
                    state: 'DONE',
                    text: 'Transaction Successful!',
                  });
                } catch (e) {
                  setTxStatus({
                    state: 'ERROR',
                    text: 'Transaction Failed.',
                  });
                }
                await updateLockedAmt(contract!, account?.evmAddress);
                setBondAmount('');
                setLoadingText('');
                setTimeout(() => {
                  setTxStatus(undefined);
                }, 5000);
              }}
            >
              <Margin size="3">
                <ConfirmLabel title="Bond Name" value={bond.bondName} />
              </Margin>
              <Margin size="3">
                <ConfirmLabel title="Stake Amount" value={bondAmount} />
              </Margin>
              <Margin size="3">
                <ConfirmLabel title="Contract" value={utils.toAddressShortDisplay(bond.bondContractAddress)} />
              </Margin>
              <Margin size="3">
                <ConfirmLabel title="Staking duration" value={`Until ${bondTimes?.ending.endDate}`} />
              </Margin>
            </ConfirmationModal>
          </ComponentCenter>
        )}
    </>
  );
};
