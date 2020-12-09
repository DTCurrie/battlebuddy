import React, {
  ComponentPropsWithoutRef,
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react';

import { mapRosterData } from '../../../utils/data-mapper';
import { logError } from '../../../utils/logger';
import { noop } from '../../../utils/noop';
import { RosterData } from '../../../utils/shapes';
import { parseXml } from '../../../utils/xml-parser';

import { useConfig } from '../../behaviors/use-config/use-config';
import { RostersStorage, useRosters } from '../../behaviors/use-rosters/use-rosters';

export interface RostersProviderProps extends RostersStorage {
  clearCurrentRoster: () => void;
  setCurrentRoster: (roster: RosterData) => void;
  sync: () => Promise<RosterData[]>;
}

export const RostersContext = createContext<RostersProviderProps>({
  rosters: [],
  clearCurrentRoster: noop,
  setCurrentRoster: noop,
  sync: () => new Promise(noop),
});

export const RostersProvider: FunctionComponent<ComponentPropsWithoutRef<'div'>> = ({
  children,
}: ComponentPropsWithoutRef<'div'>) => {
  const [{ rosterPath }] = useConfig();
  const [{ rosters, currentRoster }, storage] = useRosters();

  const clearCurrentRoster = (): void => storage.delete('currentRoster');
  const setCurrentRoster = (roster: RosterData): void => storage.set('currentRoster', roster);

  const sync = async (): Promise<RosterData[]> => {
    try {
      const data = await parseXml(rosterPath);
      const mappedData = data.map((value) => mapRosterData(value));

      storage.set('rosters', mappedData);

      return mappedData;
    } catch (error) {
      logError(`Error gathering rosters: ${error}`);
      throw error;
    }
  };

  return (
    <RostersContext.Provider
      value={{ currentRoster, rosters, clearCurrentRoster, setCurrentRoster, sync }}>
      {children}
    </RostersContext.Provider>
  );
};
