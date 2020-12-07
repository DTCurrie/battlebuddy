import React, { ComponentPropsWithoutRef, FunctionComponent, useContext } from 'react';
import { ConfigContext } from '../providers/ConfigProvider';

const NoRostersSplash: FunctionComponent<ComponentPropsWithoutRef<'div'>> = () => {
    const config = useContext(ConfigContext);

    return (
        <div className="bb-no-rosters-splash">
            <h1>IMPORT ROSTERS</h1>
            <p>{JSON.stringify(config)}</p>
            <p>Battlebuddy is unable to find your Battlescribe rosters.</p>
        </div>
    );
};

export default NoRostersSplash;
