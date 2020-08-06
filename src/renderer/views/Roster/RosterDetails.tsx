import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import {
  Jumbotron,
  Container,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

import { useRosters } from '../../behaviors/use-rosters/use-rosters';
import { ListRoster } from '../../../utils/shapes';
import RosterHeader from '../../components/Roster/RosterHeader';

export type RosterDetailsProps = RouteComponentProps<{
  rosterId: string;
}>;

const RosterDetails: FunctionComponent<RosterDetailsProps> = ({ rosterId }: RosterDetailsProps) => {
  const rosters = useRosters();
  const [roster, setRoster] = useState<ListRoster>();

  useEffect(() => {
    if (rosterId) {
      setRoster(rosters.get(rosterId) as ListRoster);
    }
  }, [rosterId, rosters]);

  if (!roster) {
    return null;
  }

  return (
    <div className="roster-details">
      <RosterHeader roster={roster} />
      <Container fluid="lg">
        <ListGroup flush>
          {roster.forces.map(({ id, name, catalogueName, catalogueRevision }) => (
            <ListGroupItem key={id} tag={Link} to={`/rosters/${rosterId}/forces/${id}`}>
              <ListGroupItemHeading>{name}</ListGroupItemHeading>
              <ListGroupItemText className="text-muted" tag="small">
                {catalogueName}{' '}
                <em>
                  (rev
                  {catalogueRevision})
                </em>
              </ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default RosterDetails;
