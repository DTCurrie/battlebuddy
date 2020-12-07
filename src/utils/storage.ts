import { get, set } from 'electron-json-storage';
import _ from 'lodash';

import { logError } from './logger';
import { Roster } from './shapes';

export enum StorageKeys {
    Config = 'config',
    Rosters = 'rosters',
}

type StorageRecord = Record<string, unknown>;

export async function getStorage<T extends StorageRecord | Array<StorageRecord>>(
    key: StorageKeys
): Promise<T> {
    return new Promise((resolve, reject) => {
        try {
            get(key, (error, data) => {
                if (error) {
                    throw error;
                }

                resolve((data as unknown) as T);
            });
        } catch (error) {
            logError(`Error getting ${key} from storage: ${error}`);
            reject(error);
        }
    });
}

export async function setStorage<T extends StorageRecord | Array<StorageRecord>>(
    key: StorageKeys,
    data: T
): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            set(key, data, (error) => {
                if (error) {
                    throw error;
                }

                resolve();
            });
        } catch (error) {
            logError(`Error setting ${key} to storage: ${error}`);
            reject(error);
        }
    });
}

export const getRosters = async (): Promise<Roster[]> => getStorage<Roster[]>(StorageKeys.Rosters);

export const setRosters = async (rosters: Roster[]): Promise<void> =>
    setStorage<Roster[]>(StorageKeys.Rosters, rosters);
