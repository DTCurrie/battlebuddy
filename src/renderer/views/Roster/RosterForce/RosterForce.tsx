import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

import { useRosters } from '../../../behaviors/use-rosters/use-rosters';

import RosterHeader from '../../../components/Roster/RosterHeader';

import { ListForce, ListRoster } from '../../../../utils/shapes';
import ForceRule from '../../../components/Roster/Force/ForceRule';
import ForceSelection from '../../../components/Roster/Force/ForceSelection';

export type RosterForceProps = RouteComponentProps<{
  forceId: string;
  rosterId: string;
}>;

const RosterForce: FunctionComponent<RosterForceProps> = ({ forceId, rosterId }) => {
  const rosters = useRosters();
  const [roster, setRoster] = useState<ListRoster>();
  const [force, setForce] = useState<ListForce>();

  useEffect(() => {
    if (rosterId) {
      setRoster(rosters.get(rosterId) as ListRoster);
    }
  }, [rosterId, rosters]);

  useEffect(() => {
    if (roster && forceId) {
      if (roster.forceMap[forceId]) {
        setForce(roster.forceMap[forceId]);
      }
    }
  }, [forceId, roster, rosterId]);

  if (!roster || !force) {
    return null;
  }

  return (
    <div className="roster-force">
      <RosterHeader roster={roster} />
      <Container fluid="lg">
        <h2>
          {force.name} {force.catalogueName}{' '}
          <em>
            (rev
            {force.catalogueRevision})
          </em>
        </h2>

        <ListGroup flush className="force-details__rules">
          <ListGroupItem>
            <ListGroupItemHeading tag="h3">Rules</ListGroupItemHeading>
          </ListGroupItem>
          {force.rules.map((rule) => (
            <ForceRule key={rule.id} rule={rule} />
          ))}
        </ListGroup>

        {Object.keys(force.map).map((entryId) => {
          const categoryData = force.map[entryId];

          if (!categoryData?.length) {
            return null;
          }

          const currentCategory = force.categories.find((category) => category.entryId === entryId);

          if (
            !currentCategory ||
            currentCategory.name === 'Uncategorised' ||
            currentCategory.name === 'Configuration'
          ) {
            return null;
          }

          return (
            <ListGroup key={currentCategory.id} flush className="force-details__selections">
              <ListGroupItem>
                <ListGroupItemHeading tag="h3">{currentCategory.name}</ListGroupItemHeading>
              </ListGroupItem>
              {categoryData.map((selection) => (
                <ForceSelection key={selection.id} selection={selection} />
              ))}
            </ListGroup>
          );
        })}
      </Container>
    </div>
  );
};

export default RosterForce;
