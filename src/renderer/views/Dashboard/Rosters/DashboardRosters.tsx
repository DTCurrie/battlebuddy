import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { CardColumns } from 'reactstrap';
import { noop } from '../../../../utils/noop';
import { RosterData } from '../../../../utils/shapes';

import { useRosters } from '../../../behaviors/use-rosters/use-rosters';
import RosterCard from '../../../components/RosterCard/RosterCard';
import { RostersContext } from '../../../providers/RostersProvider/RostersProvider';
import { getRosterKey } from './roster-key';

export type DashboardRostersProps = RouteComponentProps;

export interface DashboardRostersMap {
  [id: string]: RosterData[];
}

const mapRosters = (rosters: RosterData[]): DashboardRostersMap =>
  rosters.reduce((accumulator, current) => {
    if (!accumulator[current.roster.gameSystemName]) {
      accumulator[current.roster.gameSystemName] = [];
    }

    accumulator[current.roster.gameSystemName].push(current);
    return accumulator;
  }, {} as DashboardRostersMap);

const DashboardRosters: FunctionComponent<DashboardRostersProps> = () => {
  const { clearCurrentRoster } = useContext(RostersContext);
  const [{ rosters }] = useRosters();
  const [mappedRosters] = useState<DashboardRostersMap>(mapRosters(rosters));

  useEffect(() => {
    clearCurrentRoster();
    return () => noop();
  }, [clearCurrentRoster]);

  return (
    <div className="bb-dashboard-rosters bb-view">
      <h2 className="bb-dashboard-rosters__heading">Rosters</h2>
      {Object.keys(mappedRosters)
        .sort()
        .map((gameSystem) => (
          <>
            <h3 className="bb-dashboard-rosters__game-system" key={gameSystem}>
              {gameSystem}
            </h3>
            <CardColumns className="bb-dashboard-rosters__cards">
              {mappedRosters[gameSystem].map((rosterData) => {
                const key = getRosterKey(rosterData);

                return (
                  <RosterCard
                    className="bb-dashboard-rosters__card"
                    key={key}
                    rosterKey={key}
                    rosterData={rosterData}
                  />
                );
              })}
            </CardColumns>
          </>
        ))}
    </div>
  );
};

export default DashboardRosters;
