import ElectronStore, { Schema } from 'electron-store';

import { RosterData } from '../../../utils/shapes';
import { useStorage } from '../use-storage/use-storage';

export interface RostersStorage {
  rosters: RosterData[];
}

export const RostersSchema: Schema<RostersStorage> = {
  rosters: {
    type: 'array',
    default: [],
  },
};

export const useRosters = (): [RostersStorage, ElectronStore<Schema<RostersStorage>>] => {
  const rosters = useStorage('rosters', RostersSchema);
  return rosters;
};
