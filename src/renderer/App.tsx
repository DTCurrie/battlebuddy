import React, { useContext, useState } from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import {
    Navbar,
    NavbarBrand,
    Container,
    Collapse,
    Nav,
    NavbarToggler,
    NavItem,
    Button,
} from 'reactstrap';

import NoRostersSplash from './components/NoRostersSplash';
import { syncRosters, RostersContext, RostersProvider } from './providers/RostersProvider';

import { Roster } from '../utils/shapes';

import './App.scss';
import { ConfigProvider } from './providers/ConfigProvider';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const App = () => {
    const rosters: Roster[] = useContext(RostersContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="light" light expand="md">
                <NavbarBrand>Battlebuddy</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button color="info" onClick={() => syncRosters().then()}>
                                Sync
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Container tag="main">
                {rosters.length ? (
                    rosters.map((roster: Roster) => (
                        <div key={roster.$.id} className="roster-card">
                            {roster.$.name}
                        </div>
                    ))
                ) : (
                    <NoRostersSplash />
                )}
            </Container>
        </>
    );
};

render(
    <AppContainer>
        <ConfigProvider>
            <RostersProvider>
                <App />
            </RostersProvider>
        </ConfigProvider>
    </AppContainer>,
    rootElement
);
