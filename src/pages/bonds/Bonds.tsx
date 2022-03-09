import React, {useEffect, useMemo, useState} from 'react';
import {
  appState, hooks, Network, ReefSigner,
} from '@reef-defi/react-lib';
import { BondsComponent } from './BondsComponent';
import { bonds, IBond } from '../bonds/utils/bonds';
import { Provider } from '@reef-defi/evm-provider';
import {formatBalance} from '@polkadot/util'
import BN from 'bn.js';
import type { DeriveEraRewards, DeriveOwnSlashes, DeriveStakerPoints } from '@polkadot/api-derive/types';
import { BN_THOUSAND, BN_ZERO, isBn, isFunction } from '@polkadot/util';

const BOND_VALIDATOR_ID = '5Hax9GZjpurht2RpDr5eNLKvEApECuNxUpmRbYs5iNh7LpHa';

interface ToBN {
  toBn: () => BN;
}

export function balanceToNumber (amount: BN | ToBN = BN_ZERO, divisor: BN): number {
  const value = isBn(amount)
      ? amount
      : isFunction(amount.toBn)
          ? amount.toBn()
          : BN_ZERO;

  return value.mul(BN_THOUSAND).div(divisor).toNumber() / 1000;
}

interface ValidatorEra { era: string; slash: number; reward: number };

function extractRewards (erasRewards: DeriveEraRewards[] = [], ownSlashes: DeriveOwnSlashes[] = [], allPoints: DeriveStakerPoints[] = [], divisor: BN): ValidatorEra[] {
  const eras: string[] = [];
  const eraSlashes: any = [];
  const eraRewards: any = [];
  const eraValues: ValidatorEra[] = [];
  const averageRewardsPerEra: any = [];
  let erasWithRewardCount = 0;
  let totalRewards = 0;

  erasRewards.forEach(({ era, eraReward }): void => {
    const points = allPoints.find((points) => points.era.eq(era));
    const slashed = ownSlashes.find((slash) => slash.era.eq(era));
    const reward = points?.eraPoints.gtn(0)
        ? balanceToNumber(points.points.mul(eraReward).div(points.eraPoints), divisor)
        : 0;
    const slash = slashed
        ? balanceToNumber(slashed.total, divisor)
        : 0;

    // totalRewards += reward;

    // if (reward > 0) {
    //   erasWithRewardCount++;
    // }

    // eras.push(era.toHuman());
    // eraRewards.push(reward);
    // averageRewardsPerEra.push((erasWithRewardCount ? Math.ceil(totalRewards * 100 / erasWithRewardCount) : 0) / 100);
    // eraSlashes.push(slash);
    if(reward>0||eraValues.length>0){
      eraValues.push({era:era.toHuman(), reward, slash})
    }
  });

  return eraValues;
}

const calcReturn = async (provider: Provider, validatorId: string): Promise< {rewards: ValidatorEra[]; total:number; average:number} >=> {
  const {api} = provider;
  const eraRewards = await api.derive.staking.erasRewards();

  const points = await api.derive.staking.stakerPoints(validatorId, false);
  const slashes = await api.derive.staking.ownSlashes(validatorId, false);
  let decimals = provider.api.registry.chainDecimals[0];

  const divisor = new BN('1'.padEnd(decimals + 1, '0'));
  // @ts-ignore
  const rewards = extractRewards(eraRewards, slashes, points, divisor);
  const total = rewards.reduce((state: number, era: ValidatorEra) => {
    return state + era.reward - era.slash;
  }, 0);
  const average = total/rewards.length;
  return {rewards, total, average}
}

export const Bonds = (): JSX.Element => {
  const selectedSigner: ReefSigner | undefined = hooks.useObservableState(appState.selectedSigner$);
  const network: Network | undefined = hooks.useObservableState(appState.selectedNetworkSubj);
  const [validatorRewards, setValidatorRewards] = useState<{total:number, average:number, days:number}>();

  const { currency, divisor } = useMemo(() => ({
    currency: formatBalance.getDefaults().unit,
    divisor: new BN('1'.padEnd(formatBalance.getDefaults().decimals + 1, '0'))
  }), []);

  useEffect(() => {
    if (!selectedSigner) {
      return;
    }
    const setVals = async ()=> {
      const {rewards, total, average} = await calcReturn(selectedSigner.signer.provider, BOND_VALIDATOR_ID);
      setValidatorRewards({total, average, days: rewards.length});
    };
    setVals();
  }, [selectedSigner]);

  return (
    <>
      {network && selectedSigner ? (
        bonds.map((bond: IBond) =>
          <BondsComponent
            key={bond.id}
            account={selectedSigner}
            bond={bond}
            validatorRewards = {validatorRewards}
          />)

      ) : <div/>}
    </>
  );
};
