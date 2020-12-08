import { RouteComponentProps, useNavigate } from '@reach/router';
import React, { ComponentPropsWithoutRef, FunctionComponent, useEffect } from 'react';
import { Card } from 'reactstrap';

import { useRosters } from '../../../behaviors/use-rosters/use-rosters';

export interface DashboardRostersProps
  extends ComponentPropsWithoutRef<'div'>,
    RouteComponentProps {}

const DashboardRosters: FunctionComponent<DashboardRostersProps> = () => {
  const navigate = useNavigate();
  const [{ rosters }] = useRosters();

  useEffect(() => {
    if (!rosters || !rosters.length) {
      navigate('/sync');
    }
  }, [rosters, navigate]);

  return (
    <div className="bb-dashboard-rosters">
      <h2>Rosters</h2>
      {rosters.map(({ fileName, roster }) => (
        <Card key={`${roster.id}::${encodeURI(fileName)}`}>{roster.name}</Card>
      ))}
    </div>
  );
};

export default DashboardRosters;
