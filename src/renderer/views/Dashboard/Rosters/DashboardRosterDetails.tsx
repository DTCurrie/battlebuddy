import { dequal } from 'dequal';
import React, { FunctionComponent, useCallback, useContext, useEffect } from 'react';
import { RouteProps } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { useRosters } from '../../../behaviors/use-rosters/use-rosters';

import { RostersContext } from '../../../providers/RostersProvider/RostersProvider';

import { getRosterKey } from './roster-key';

export interface DashboardRosterDetailsParams {
  rosterKey?: string;
}

const DashboardRosterDetails: FunctionComponent<RouteProps> = () => {
  const navigate = useNavigate();
  const { rosterKey }: DashboardRosterDetailsParams = useParams();

  const [{ rosters }] = useRosters();
  const { currentRoster, setCurrentRoster } = useContext(RostersContext);

  const getRoster = useCallback(
    () => rosters.find((r) => rosterKey && getRosterKey(r) === encodeURI(rosterKey)),
    [rosterKey, rosters]
  );

  useEffect(() => {
    if (!rosterKey) {
      return;
    }

    const keyedRoster = getRoster();

    if (currentRoster && !dequal(currentRoster, keyedRoster)) {
      setCurrentRoster(currentRoster);
      return;
    }

    if (!currentRoster && !!keyedRoster) {
      setCurrentRoster(keyedRoster);
      return;
    }

    if (!currentRoster && !keyedRoster) {
      // navigate('/rosters');
    }
  }, [currentRoster, getRoster, navigate, rosterKey, setCurrentRoster]);

  if (!currentRoster) {
    return null;
  }

  const { roster } = currentRoster;
  const { name, forces } = roster;

  return (
    <div className="bb-dashboard-roster-details bb-view">
      <h2>{name}</h2>
      <code>{JSON.stringify(forces.map((force) => force.map))}</code>
    </div>
  );
};

export default DashboardRosterDetails;
