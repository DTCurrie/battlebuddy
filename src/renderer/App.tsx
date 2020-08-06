import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import { Navbar, NavbarBrand, Container } from 'reactstrap';

import { parseXml } from '../utils/xml-parser';
import { RosterAttributes, Costs, Forces } from '../utils/shapes';

import ForceDetails from './components/Roster/Force/ForceDetails';
import RosterHeader from './components/Roster/RosterHeader';

import './App.scss';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const App = () => {
    const [roster, setRoster] = useState<RosterAttributes>();
    const [costs, setCosts] = useState<Costs[]>();
    const [forces, setForces] = useState<Forces[]>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await parseXml();
            setRoster(data[0]?.roster.$);
            setCosts(data[0]?.roster.costs || []);
            setForces(data[0]?.roster.forces || []);
        };

        fetchData().then();
    }, []);

    if (!roster || !costs || !forces) {
        return null;
    }

    return (
        <div className="app">
            <Navbar light>
                <NavbarBrand>Battlebuddy</NavbarBrand>
            </Navbar>
            <RosterHeader $={roster} costs={costs} />
            <Container tag="main">{forces && <ForceDetails forces={forces} />}</Container>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <AppContainer>
            <App />
        </AppContainer>
    </React.StrictMode>,
    rootElement
);
