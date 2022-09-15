import { createContext } from 'react';

export interface Context {
  isSwitching: boolean;
  setSwitching: (state: boolean) => boolean;
}

export const setSwitching = (state: boolean, setter: (val: boolean) => void): boolean => {
  setter(state);
  return state;
};

export default createContext<Context>({
  isSwitching: false,
  setSwitching: () => false,
});
