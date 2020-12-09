import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RouteProps } from 'react-router';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';

import { useRosters } from '../../behaviors/use-rosters/use-rosters';
import { useWindowSize } from '../../behaviors/use-window-size/use-window-size';

import ExactMatchLink from '../../components/ExactMatchLink/ExactMatchLink';

import { RostersContext } from '../../providers/RostersProvider/RostersProvider';

import './Dashboard.scss';

import DashboardRosterDetails from './Rosters/DashboardRosterDetails';
import DashboardRosters from './Rosters/DashboardRosters';
import { getRosterKey } from './Rosters/roster-key';
import DashboardSync from './Sync/DashboardSync';

const getNavbar = () => document.querySelector<HTMLElement>('.bb-navbar');
const FALLBACK_NAVBAR_HEIGHT = 56;

const Dashboard: FunctionComponent<RouteProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentRoster } = useContext(RostersContext);
  const [{ rosters }] = useRosters();

  const navbarHeight = useRef(getNavbar()?.offsetHeight);
  const getNavbarHeight = useCallback(() => {
    if (!navbarHeight || !navbarHeight.current) {
      navbarHeight.current = getNavbar()?.offsetHeight || FALLBACK_NAVBAR_HEIGHT;
    }

    return navbarHeight.current;
  }, []);

  const [top, setTop] = useState(navbarHeight.current);

  useEffect(() => setTop(getNavbarHeight()), [getNavbarHeight]);
  useWindowSize(() => setTop(getNavbarHeight()), [getNavbarHeight]);

  useEffect(() => {
    if (!rosters || !rosters.length) {
      navigate('/rosters/sync');
    }
  }, [rosters, navigate]);

  return (
    <div className="bb-dashboard bb-view">
      <Breadcrumb className="bb-dashboard__nav" style={{ top }}>
        <BreadcrumbItem className="bb-dashboard__nav-item" tag={ExactMatchLink} to="/">
          Rosters
        </BreadcrumbItem>

        {/* sync */}
        {location.pathname.indexOf('sync') >= 0 && (
          <BreadcrumbItem
            className="bb-dashboard__nav-item"
            tag={ExactMatchLink}
            to="/rosters/sync">
            Sync
          </BreadcrumbItem>
        )}
        {/* sync */}
        {!!currentRoster && (
          <BreadcrumbItem
            className="bb-dashboard__nav-item"
            tag={ExactMatchLink}
            to={`/rosters/${getRosterKey(currentRoster)}`}>
            {currentRoster.roster.name}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Container className="bb-dashboard__content">
        <Routes>
          <DashboardRosters path="/" />
          <DashboardSync path="rosters/sync" />
          <DashboardRosterDetails path="rosters/:rosterKey" />
        </Routes>
      </Container>
    </div>
  );
};

export default Dashboard;
