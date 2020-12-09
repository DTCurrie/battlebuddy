import {
  Link,
  LinkGetProps,
  RouteComponentProps,
  Router,
  useLocation,
  useNavigate,
} from '@reach/router';

import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';

import { useRosters } from '../../behaviors/use-rosters/use-rosters';
import { RostersContext } from '../../providers/RostersProvider/RostersProvider';

import DashboardRosterDetails from './Rosters/DashboardRosterDetails';
import DashboardRosters from './Rosters/DashboardRosters';
import { getRosterKey } from './Rosters/roster-key';
import DashboardSync from './Sync/DashboardSync';

import './Dashboard.scss';
import { useWindowSize } from '../../behaviors/use-window-size/use-window-size';

export interface DashboardProps extends ComponentPropsWithoutRef<'div'>, RouteComponentProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentRoster } = useContext(RostersContext);
  const [{ rosters }] = useRosters();

  const getNavbarHeight = () => document.querySelector<HTMLElement>('.bb-navbar')?.offsetHeight;

  const [top, setTop] = useState(getNavbarHeight());

  useEffect(() => setTop(getNavbarHeight()), []);
  useWindowSize(() => setTop(getNavbarHeight()));

  useEffect(() => {
    if (!rosters || !rosters.length) {
      navigate('/rosters/sync');
    }
  }, [rosters, navigate]);

  const isActive = ({ isCurrent }: LinkGetProps) =>
    isCurrent ? { className: 'breadcrumb-item active' } : {};

  return (
    <div className="bb-dashboard bb-view">
      <Breadcrumb className="bb-dashboard__nav" style={{ top }}>
        <BreadcrumbItem
          className="bb-dashboard__nav-item"
          tag={Link}
          getProps={isActive}
          to="/rosters">
          Rosters
        </BreadcrumbItem>

        {/* sync */}
        {location.pathname.indexOf('sync') >= 0 && (
          <BreadcrumbItem
            className="bb-dashboard__nav-item"
            getProps={isActive}
            tag={Link}
            to="/rosters/sync">
            Sync
          </BreadcrumbItem>
        )}
        {/* sync */}
        {currentRoster && (
          <BreadcrumbItem
            className="bb-dashboard__nav-item"
            getProps={isActive}
            to={`/rosters/${getRosterKey(currentRoster)}`}>
            {currentRoster.roster.name}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Container className="bb-dashboard__content">
        <Router className="bb-dashboard__router">
          <DashboardRosters path="rosters" default />
          <DashboardSync path="rosters/sync" />
          <DashboardRosterDetails path="rosters/:rosterKey" />
        </Router>
      </Container>
    </div>
  );
};

export default Dashboard;
