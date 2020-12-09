import { remote } from 'electron';
import ElectronStore, { Schema } from 'electron-store';

import { useStorage } from '../use-storage/use-storage';

import { BattlebuddyConfig } from '../../../utils/shapes';

export const BattlebuddyConfigSchema: Schema<BattlebuddyConfig> = {
  rosterPath: {
    type: 'string',
    default: `${remote.app.getPath('home')}/Battlescribe/rosters`,
  },
};

export const useConfig = (): [BattlebuddyConfig, ElectronStore<Schema<BattlebuddyConfig>>] => {
  const config = useStorage('bb-config', BattlebuddyConfigSchema);
  return config;
};
