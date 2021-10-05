import { useEffect } from 'react';
import { hooks } from '@reef-defi/react-lib';
import { Provider } from '@reef-defi/evm-provider';
import { accountsSetAccountBalance } from '../store/actions/accounts';
import { useAppDispatch } from '../store/hooks';

export default function useAccountBalanceRedux(address?: string, provider?: Provider): void {
  const dispatch = useAppDispatch();
  const accountBalance = hooks.useUpdateAccountBalance(address, provider);

  useEffect(() => {
    dispatch(accountsSetAccountBalance(accountBalance));
  }, [accountBalance]);
}
