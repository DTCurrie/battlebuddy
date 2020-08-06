import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, navigate, Link } from '@reach/router';
import {
  Jumbotron,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Card,
  CardDeck,
  CardHeader,
  CardBody,
  Row,
  CardColumns,
  Button,
  CardFooter,
} from 'reactstrap';

import { useRosters } from '../../behaviors/use-rosters/use-rosters';
import DashboardEmpty from './DashboardEmpty/DashboardEmpty';
import { ListRoster } from '../../../utils/shapes';

const Dashboard: FunctionComponent<RouteComponentProps> = () => {
  const rosters = useRosters();
  const [rostersList, setRostersList] = useState<ListRoster[]>([]);

  useEffect(() => {
    const list: ListRoster[] = [];

    for (const [, roster] of rosters) {
      list.push(roster as ListRoster);
    }

    setRostersList(list);
  }, [rosters]);

  return (
    <div className="dashboard">
      <Jumbotron>
        <h1>Dashboard</h1>
      </Jumbotron>
      {rosters.size < 1 ? (
        <DashboardEmpty />
      ) : (
        <Container fluid="lg">
          <ListGroup className="text-center" horizontal>
            <ListGroupItem>
              <ListGroupItemHeading>Roster Count</ListGroupItemHeading>
              <ListGroupItemText>{rosters.size}</ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Force Count</ListGroupItemHeading>
              <ListGroupItemText>
                {rostersList.reduce<number>(
                  (previous, current) => previous + current.forces.length,
                  0
                )}
              </ListGroupItemText>
            </ListGroupItem>
          </ListGroup>
          <h2 className="pt-3">Rosters</h2>
          <CardColumns>
            {rostersList.map((roster) => (
              <Card key={roster.id}>
                <CardBody>
                  <div className="dashboard__roster-name">
                    <strong>{roster.name}</strong>
                  </div>
                  <div className="dashboard__roster-system">
                    <small className="text-muted">
                      {roster.gameSystemName} <em>rev({roster.gameSystemRevision})</em>
                    </small>
                  </div>
                  <div className="dashboard__roster-actions text-right">
                    <Link to={`/rosters/${roster.id}`}>view</Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </CardColumns>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
