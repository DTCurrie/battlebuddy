import { RouteComponentProps } from '@reach/router';
import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { Card } from 'reactstrap';

import { useRosters } from '../../behaviors/use-rosters/use-rosters';

export interface DashboardProps extends ComponentPropsWithoutRef<'div'>, RouteComponentProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const [{ rosters }] = useRosters();
  return (
    <div className="bb-dashboard">
      <h1>Dashboard</h1>
      {rosters.map((roster) => (
        <Card key={roster.id}>{roster.name}</Card>
      ))}
    </div>
  );
};

export default Dashboard;
