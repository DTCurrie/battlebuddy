import React, { ComponentPropsWithoutRef, createContext, FunctionComponent } from 'react';

import { mapRosterData } from '../../utils/data-mapper';
import { logError } from '../../utils/logger';
import { noop } from '../../utils/noop';
import { RosterData } from '../../utils/shapes';
import { parseXml } from '../../utils/xml-parser';

import { useConfig } from '../behaviors/use-config/use-config';
import { RostersStorage, useRosters } from '../behaviors/use-rosters/use-rosters';

export interface RostersProviderProps extends RostersStorage {
  sync: () => Promise<RosterData[]>;
}

export const RostersContext = createContext<RostersProviderProps>({
  rosters: [],
  sync: () => new Promise(noop),
});

export const RostersProvider: FunctionComponent<ComponentPropsWithoutRef<'div'>> = ({
  children,
}: ComponentPropsWithoutRef<'div'>) => {
  const [{ rosterPath }] = useConfig();
  const [{ rosters }, storage] = useRosters();

  const sync = async (): Promise<RosterData[]> => {
    try {
      const data = await parseXml(rosterPath);
      const mappedData = data.map((value) => mapRosterData(value));

      storage.set('rosters', mappedData);

      return mappedData;
    } catch (error) {
      logError(`Error gathering rosters: ${error}`);
    }

    return [];
  };

  return <RostersContext.Provider value={{ rosters, sync }}>{children}</RostersContext.Provider>;
};
