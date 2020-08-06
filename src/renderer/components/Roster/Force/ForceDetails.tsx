import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

import { ListForce } from '../../../../utils/shapes';

import ForceRule from './ForceRule';
import ForceSelection from './ForceSelection';

export interface ForceDetailsProps extends ComponentPropsWithoutRef<'div'> {
  force: ListForce;
}

const ForceDetails: FunctionComponent<ForceDetailsProps> = ({ force }) => (
  <div className="force-details">
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
  </div>
);

export default ForceDetails;
