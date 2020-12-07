import React, { StrictMode, useContext, useState } from 'react';
import { render } from 'react-dom';
import { createHistory, createMemorySource, Link, LocationProvider, Router } from '@reach/router';

import { AppContainer } from 'react-hot-loader';

import { Navbar, NavbarBrand, Collapse, Nav, NavbarToggler, NavItem, Button } from 'reactstrap';

import ErrorBoundary from './components/ErrorBoundary';

import { ConfigProvider } from './providers/ConfigProvider';
import { RostersContext, RostersProvider } from './providers/RostersProvider';

import Dashboard from './views/Dashboard/Dashboard';

import './App.scss';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const App = () => {
  const source = createMemorySource('/');
  const history = createHistory(source);

  const { sync } = useContext(RostersContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="bb-navbar" color="light" light expand="md">
        <NavbarBrand to="/" tag={Link}>
          Battlebuddy
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="info" onClick={() => sync().then()}>
                Sync
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <main className="bb-app">
        <LocationProvider history={history}>
          <ErrorBoundary>
            <Router className="bb-app__router">
              <Dashboard path="/" />
            </Router>
          </ErrorBoundary>
        </LocationProvider>
      </main>
    </>
  );
};

render(
  <StrictMode>
    <AppContainer>
      <ConfigProvider>
        <RostersProvider>
          <App />
        </RostersProvider>
      </ConfigProvider>
    </AppContainer>
  </StrictMode>,
  rootElement
);
