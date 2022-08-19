import { createContext } from 'react';

export interface Context {
  isHidden: boolean;
  toggle: () => boolean;
}

export const toggleHidden = (state: boolean, setter: (val: boolean) => void): boolean => {
  const value = !state;
  setter(value);
  localStorage.setItem('hideBalance', String(value));
  return value;
};

export const getStoredPref = (): boolean => localStorage.getItem('hideBalance') === 'true';

export default createContext<Context>({
  isHidden: false,
  toggle: () => false,
});
