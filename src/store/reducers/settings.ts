import { Network, utils } from '@reef-defi/react-lib';
import { RELOAD_APP } from '../actionCreator';
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
    default: return state;
  }
};
