import React from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import { Router, Link } from '@reach/router';
import { Navbar, NavbarBrand } from 'reactstrap';

import Dashboard from './views/Dashboard/Dashboard';

import RosterDetails from './views/Roster/RosterDetails';
import RosterForce from './views/Roster/RosterForce/RosterForce';
import RosterImport from './views/Roster/RosterImport/RosterImport';

import './App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const App = () => (
  <div className="app">
    <Navbar light>
      <NavbarBrand to="/" tag={Link}>
        Battlebuddy
      </NavbarBrand>
    </Navbar>
    <main className="app__content">
      <ErrorBoundary>
        <Router className="app__router">
          <Dashboard path="/" />

          <RosterImport path="/rosters/import" />
          <RosterDetails path="/rosters/:rosterId" />
          <RosterForce path="/rosters/:rosterId/forces/:forceId" />
        </Router>
      </ErrorBoundary>
    </main>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <AppContainer>
      <App />
    </AppContainer>
  </React.StrictMode>,
  rootElement
);
