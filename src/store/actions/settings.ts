import { AvailableNetworks } from "@reef-defi/react-lib";
import { SELECT_CHAIN_ACTION } from "../actionCreator";

interface SelectChain {
  type: typeof SELECT_CHAIN_ACTION;
  network: AvailableNetworks;
}

export type SettingsActions =
  | SelectChain;

export const selectChain = (network: AvailableNetworks): SelectChain => ({
  network,
  type: SELECT_CHAIN_ACTION,
});