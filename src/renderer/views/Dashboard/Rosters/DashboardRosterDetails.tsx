import { RouteComponentProps, useNavigate } from '@reach/router';
import { dequal } from 'dequal';
import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { RosterData } from '../../../../utils/shapes';

import { useRosters } from '../../../behaviors/use-rosters/use-rosters';
import { RostersContext } from '../../../providers/RostersProvider/RostersProvider';
import { getRosterKey } from './roster-key';

export interface DashboardRosterDetailsProps extends RouteComponentProps {
  rosterKey?: string;
}

const DashboardRosterDetails: FunctionComponent<DashboardRosterDetailsProps> = ({ rosterKey }) => {
  const navigate = useNavigate();
  const { currentRoster, setCurrentRoster } = useContext(RostersContext);
  const [{ rosters }] = useRosters();

  const getRoster = useCallback(
    () => rosters.find((r) => rosterKey && getRosterKey(r) === encodeURI(rosterKey)),
    [rosterKey, rosters]
  );

  const [roster, setRoster] = useState<RosterData>();

  useEffect(() => {
    if (currentRoster && !dequal(currentRoster, roster)) {
      setRoster(currentRoster);
      return;
    }

    const keyedRoster = getRoster();
    if (keyedRoster) {
      setCurrentRoster(keyedRoster);
      setRoster(keyedRoster);
      return;
    }

    navigate('/rosters');
  }, [currentRoster, getRoster, navigate, roster, setCurrentRoster]);

  return (
    <div className="bb-dashboard-roster-details bb-view">
      <h2>{roster?.roster.name}</h2>
    </div>
  );
};

export default DashboardRosterDetails;
