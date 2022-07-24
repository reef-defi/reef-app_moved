interface CallbackFn {(val:any): void;}
let lastCachedId: { ident: any, value: any } | undefined;
let lastCachedValCallbacks: CallbackFn[] = [];
export const getLastCachedValue = <T>(cacheIdent: any, exeOnNoCachedIdentValue: { (): Promise<T> }, callbackCachedValue: {(result: T): void}): void => {
  if (lastCachedId && lastCachedId.ident === cacheIdent) {
    callbackCachedValue(lastCachedId.value);
    return;
  }
  lastCachedValCallbacks.push(callbackCachedValue);
  if (lastCachedValCallbacks.length > 1) {
    return;
  }
  lastCachedId = undefined;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  exeOnNoCachedIdentValue().then((value: T) => {
    lastCachedId = { ident: cacheIdent, value };
    lastCachedValCallbacks.forEach((c: CallbackFn) => c(lastCachedId?.value));
    lastCachedValCallbacks = [];
  });
};
