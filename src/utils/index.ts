import { useAppSelector } from "../store"
import { Signer } from "@reef-defi/evm-provider";

export const getSigner = (): Signer|undefined => {
  const {selectedAccount, accounts} = useAppSelector((state) => state.signers);
  return selectedAccount !== -1 
    ? accounts[selectedAccount].signer
    : undefined;
}