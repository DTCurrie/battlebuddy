import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { useRosters } from '../../../behaviors/use-rosters/use-rosters';

import ForceRule from '../../../components/Roster/Force/ForceRule';
import ForceSelectionList from '../../../components/Roster/Force/ForceSelectionList';

import Accordion from '../../../components/Accordion/Accordion';

import RosterHeader from '../../../components/Roster/RosterHeader';

import { ListForce, ListRoster } from '../../../../utils/shapes';

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
        <Accordion
          headingTag="h3"
          sections={[
            {
              heading: (
                <>
                  {force.name} {force.catalogueName}{' '}
                  <em>
                    (rev
                    {force.catalogueRevision})
                  </em>
                </>
              ),
              content: force.rules.map((rule) => <ForceRule key={rule.id} rule={rule} />),
            },
          ]}
        />

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
            <ForceSelectionList
              key={currentCategory.id}
              name={currentCategory.name}
              selections={categoryData}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default RosterForce;
