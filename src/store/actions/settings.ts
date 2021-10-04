import { RELOAD_APP } from '../actionCreator';

interface ReloadAction {
  type: typeof RELOAD_APP;
}

export type SettingsActions =
  | ReloadAction

export const appReload = (): ReloadAction => ({
  type: RELOAD_APP,
});
