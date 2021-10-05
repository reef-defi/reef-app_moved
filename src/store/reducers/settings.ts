import { availableNetworks, Network } from "@reef-defi/react-lib";
import { SELECT_CHAIN_ACTION } from "../actionCreator";
import { SettingsActions } from "../actions/settings";

const defaultSettings: Network = {...availableNetworks.mainnet};

export const settingsReducer = (state=defaultSettings, action: SettingsActions) => {
  switch (action.type) {
    case SELECT_CHAIN_ACTION: return {...state, ...availableNetworks[action.network]};
    default: return state;
  }
}