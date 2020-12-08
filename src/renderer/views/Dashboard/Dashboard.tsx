import { Link, LinkGetProps, RouteComponentProps, Router, useLocation } from '@reach/router';
import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { Breadcrumb, BreadcrumbItem, Container, Jumbotron } from 'reactstrap';

import DashboardRosters from './Rosters/DashboardRosters';
import DashboardSync from './Sync/DashboardSync';

export interface DashboardProps extends ComponentPropsWithoutRef<'div'>, RouteComponentProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const location = useLocation();

  const isActive = ({ isCurrent }: LinkGetProps) =>
    isCurrent ? { className: 'breadcrumb-item active' } : {};

  return (
    <div className="bb-dashboard">
      <Jumbotron>
        <h1>Dashboard</h1>
        <Breadcrumb>
          <BreadcrumbItem tag={Link} getProps={isActive} to="/">
            Rosters
          </BreadcrumbItem>

          {/* sync */}
          {location.pathname.indexOf('sync') >= 0 && (
            <BreadcrumbItem tag={Link} getProps={isActive} to="/sync">
              Sync
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Jumbotron>
      <Container>
        <Router className="bb-dashboard__router">
          <DashboardRosters default />
          <DashboardSync path="sync" />
        </Router>
      </Container>
    </div>
  );
};

export default Dashboard;
