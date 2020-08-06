import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { Jumbotron, Container, Button } from 'reactstrap';

const DashboardEmpty: FunctionComponent<RouteComponentProps> = () => (
  <div className="dashboard-empty">
    <Container>
      <h2>
        You haven&apos;t imported any rosters yet. Once you import a roster, you will be able to
        view the data sheet for it!
      </h2>
      <Button to="/rosters/import" tag={Link}>
        Import Roster
      </Button>
    </Container>
  </div>
);

export default DashboardEmpty;
