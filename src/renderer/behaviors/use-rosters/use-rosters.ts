import ElectronStore, { Schema } from 'electron-store';

import { useStorage } from '../use-storage/use-storage';

import { ListRoster } from '../../../utils/shapes';

export interface RostersSchema {
  [id: string]: ListRoster;
}

export const useRosters = (): ElectronStore<Schema<RostersSchema>> => {
  const rosters = useStorage('rosters', {} as Schema<RostersSchema>);
  return rosters;
};
