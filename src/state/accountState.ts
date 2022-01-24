import {
  combineLatest,
  distinctUntilChanged,
  map,
  merge,
  mergeScan,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { ReefSigner } from '@reef-defi/react-lib';
import { Provider } from '@reef-defi/evm-provider';
import { BigNumber } from 'ethers';
import { filter } from 'rxjs/operators';
import { getUnwrappedData$, UpdateAction, UpdateDataCtx } from './updateCtxUtil';
import { replaceUpdatedSigners, updateSignersEvmBindings } from './accountStateUtil';
import { providerSubj } from './providerState';
import { selectedSignerUpdateCtxHttp$ } from './accountStateHttp';

export const accountsSubj = new ReplaySubject<ReefSigner[] | null>(1);
export const reloadSignersSubj = new Subject<UpdateDataCtx<ReefSigner[]>>();

export const signersInjected$ = accountsSubj.pipe(
  map((signrs) => (signrs?.length ? signrs : [])),
  shareReplay(1),
);

const signersWithUpdatedData$: Observable<ReefSigner[]> = reloadSignersSubj.pipe(
  filter((reloadCtx) => !!reloadCtx.updateActions.length),
  withLatestFrom(signersInjected$),
  mergeScan((state: { all: ReefSigner[], allUpdated: ReefSigner[], lastUpdated: ReefSigner[] }, [updateCtx, signersInjected]): any => {
    const allSignersLatestUpdates = replaceUpdatedSigners(signersInjected, state.allUpdated);
    return of(updateCtx.updateActions).pipe(
      switchMap((updateActions) => updateSignersEvmBindings(updateActions, allSignersLatestUpdates)
        .then((lastUpdated) => ({
          all: replaceUpdatedSigners(allSignersLatestUpdates, lastUpdated, true),
          allUpdated: replaceUpdatedSigners(state.allUpdated, lastUpdated, true),
          lastUpdated,
        }))),
    );
  }, {
    all: [], allUpdated: [], lastUpdated: [],
  }),
  filter((val: any) => !!val.lastUpdated.length),
  map((val: any): any => (val.all)),
  shareReplay(1),
);

const signersWithUpdatedBalances$ = combineLatest([providerSubj, merge(signersInjected$, signersWithUpdatedData$)]).pipe(
  mergeScan((state: {unsub:any, balancesByAddressSubj: ReplaySubject<any>}, [provider, signers]: [Provider, ReefSigner[]]) => {
    if (state.unsub) {
      state.unsub();
    }
    const distinctSignerAddresses = signers.map((s) => s.address)
      .reduce((distinctAddrList: string[], curr: string) => {
        if (distinctAddrList.indexOf(curr) < 0) {
          distinctAddrList.push(curr);
        }
        return distinctAddrList;
      }, []);
    // eslint-disable-next-line no-param-reassign
    return provider.api.query.system.account.multi(distinctSignerAddresses, (balances: any[]) => {
      const balancesByAddr = balances.map(({ data }, index) => ({ address: distinctSignerAddresses[index], balance: data.free.toString() }));
      state.balancesByAddressSubj.next({ balances: balancesByAddr, signers });
    }).then((unsub) => {
      // eslint-disable-next-line no-param-reassign
      state.unsub = unsub;
      return state;
    });
  }, { unsub: null, balancesByAddressSubj: (new ReplaySubject<any>(1)) }),
  distinctUntilChanged((prev: any, curr: any): any => prev.balancesByAddressSubj !== curr.balancesByAddressSubj),
  switchMap((v:{balancesByAddressSubj: Subject<{balances:any, signers: ReefSigner[]}>}) => v.balancesByAddressSubj),
  map((balancesAndSigners:{balances:any, signers: ReefSigner[]}) => (!balancesAndSigners.signers ? [] : balancesAndSigners.signers.map((sig) => {
    const bal = balancesAndSigners.balances.find((b:{address: string, balance: string}) => b.address === sig.address);
    if (bal && !BigNumber.from(bal.balance).eq(sig.balance)) {
      return { ...sig, balance: BigNumber.from(bal.balance) };
    }
    return sig;
  }))),
  shareReplay(1),
);

export const signers$: Observable<ReefSigner[]> = signersWithUpdatedBalances$;

export const selectAddressSubj = new ReplaySubject<string | undefined>(1);
selectAddressSubj.next(localStorage.getItem('selected_address_reef') || undefined);

export const selectedSigner$ = combineLatest([selectAddressSubj.pipe(distinctUntilChanged()), signers$]).pipe(
  map(([selectedAddress, signers]) => {
    let foundSigner = signers?.find((signer: ReefSigner) => signer.address === selectedAddress);
    if (!foundSigner) {
      foundSigner = signers ? signers[0] : undefined;
    }
    if (foundSigner) {
      localStorage.setItem('selected_address_reef', foundSigner.address || '');
    }
    return foundSigner ? { ...foundSigner } : undefined;
  }),
  shareReplay(1),
);
