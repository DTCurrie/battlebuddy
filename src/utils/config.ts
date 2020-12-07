import { remote } from 'electron';

import { getStorage, setStorage, StorageKeys } from './storage';

const DEFAULT_CONFIG = { rosterPath: `${remote.app.getPath('home')}/Battlescribe/rosters` };

export interface BattlebuddyConfig {
    [key: string]: unknown;
    rosterPath: string;
}

export const getConfig = async (): Promise<BattlebuddyConfig> => {
    const config = await getStorage<BattlebuddyConfig>(StorageKeys.Config);

    if (Object.keys(config).length === 0) {
        await setStorage(StorageKeys.Config, DEFAULT_CONFIG);
        return DEFAULT_CONFIG;
    }

    return config;
};

export const setConfig = async (options: Partial<BattlebuddyConfig>): Promise<void> => {
    const currentConfig = await getConfig();

    Object.keys(options).forEach((key) => {
        currentConfig[key] = options[key];
    });

    setStorage(StorageKeys.Config, currentConfig);
};
