import { useEffect } from 'react';
import { hooks } from '@reef-defi/react-lib';
import { Provider } from '@reef-defi/evm-provider';
import { useAppDispatch } from '../store';
import { setSignerBalance } from '../store/actions/signers';

export default function useAccountBalanceRedux(address?: string, provider?: Provider): void {
  const dispatch = useAppDispatch();
  const accountBalance = hooks.useUpdateAccountBalance(address, provider);

  useEffect(() => {
    dispatch(setSignerBalance(accountBalance));
  }, [accountBalance]);
}
