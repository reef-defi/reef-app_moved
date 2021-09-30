import { utils, Network } from '@reef-defi/react-lib';
import { RELOAD_APP, SET_CHAIN_URL } from '../actionCreator';
import { SettingsActions } from '../actions/settings';

export interface SettingsReducer extends Network {
  reload: boolean;
}

const defaultSettings: SettingsReducer = {
  ...utils.availableReefNetworks.mainnet,
  reload: false,
};

export const settingsReducer = (state = defaultSettings, action: SettingsActions): SettingsReducer => {
  switch (action.type) {
    case RELOAD_APP: return { ...state, reload: !state.reload };
    case SET_CHAIN_URL: return { ...state, ...utils.availableReefNetworks[action.name] };
    default: return state;
  }
};
