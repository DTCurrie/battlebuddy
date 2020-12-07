import React, {
    ComponentPropsWithoutRef,
    FunctionComponent,
    createContext,
    useState,
    useEffect,
} from 'react';

import createTrigger from 'react-use-trigger';
import useTriggerEffect from 'react-use-trigger/useTriggerEffect';

import { getConfig } from '../../utils/config';
import { logError } from '../../utils/logger';
import { Roster, RosterData } from '../../utils/shapes';
import { getRosters, setRosters } from '../../utils/storage';
import { parseXml } from '../../utils/xml-parser';

export const RostersContext = createContext<Roster[]>([]);

export const rostersTrigger = createTrigger();

export const RostersProvider: FunctionComponent<ComponentPropsWithoutRef<'div'>> = ({
    children,
}: ComponentPropsWithoutRef<'div'>) => {
    const [appRosters, setAppRosters] = useState<Roster[]>([]);

    useTriggerEffect(() => {
        async function fetchRosters() {
            const fetchedRosters = await getRosters();
            setAppRosters(fetchedRosters);
        }

        fetchRosters().then();
    }, rostersTrigger);

    return <RostersContext.Provider value={appRosters}>{children}</RostersContext.Provider>;
};

export const syncRosters = async (): Promise<Roster[]> => {
    const config = await getConfig();

    if (config && config.rosterPath) {
        try {
            const data = await parseXml(config.rosterPath);
            const rosters = data.map(({ roster }: RosterData) => roster);

            await setRosters(rosters);

            rostersTrigger();

            console.log(rosters);

            return rosters;
        } catch (error) {
            logError(`Error gathering rosters: ${error}`);
        }
    } else {
        logError('Error gathering rosters: Invalid configuration for roster path');
    }

    return [];
};
