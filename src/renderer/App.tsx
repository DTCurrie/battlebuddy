import { createHistory, createMemorySource, Link, LocationProvider, Router } from '@reach/router';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Spinner } from 'reactstrap';

import { NotificationContainer } from 'react-notifications';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SyncButton from './components/SyncButton/SyncButton';

import { ConfigProvider } from './providers/ConfigProvider/ConfigProvider';
import { NotificationProvider } from './providers/NotificationProvider/NotificationProvider';
import { RostersProvider } from './providers/RostersProvider/RostersProvider';

import Dashboard from './views/Dashboard/Dashboard';

import 'react-notifications/lib/notifications.css';
import './App.scss';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const source = createMemorySource('/');
const history = createHistory(source);

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="bb-navbar" color="light" light expand="md" sticky="top">
        <NavbarBrand className="bb-navbar__logo" to="/" tag={Link}>
          Battlebuddy
        </NavbarBrand>
        <NavbarToggler className="bb-navbar__toggler" onClick={toggle} />
        <Collapse className="bb-navbar__collapse" isOpen={isOpen} navbar>
          <Nav className="bb-navbar__nav ml-auto" navbar>
            <NavItem className="bb-navbar__nav-item">
              <SyncButton
                className="bb-navbar__sync-button"
                color="link"
                spinner={<Spinner color="link" size="sm" />}
              />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <main className="bb-app">
        <div className="bb-app__notifications">
          <NotificationContainer />
        </div>
        <ErrorBoundary className="bb-app__error-boundary">
          <Router className="bb-app__router">
            <Dashboard default />
          </Router>
        </ErrorBoundary>
      </main>
    </>
  );
};

render(
  <AppContainer>
    <LocationProvider history={history}>
      <ConfigProvider>
        <RostersProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </RostersProvider>
      </ConfigProvider>
    </LocationProvider>
  </AppContainer>,
  rootElement
);
