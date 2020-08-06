import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';

import {
  ListGroupItem,
  ListGroup,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Collapse,
} from 'reactstrap';

import { ListSelection } from '../../../../utils/shapes';

import ForceProfile from './ForceProfile';

export interface ForceSelectionProps extends ComponentPropsWithoutRef<'li'> {
  nested?: boolean;
  selection: ListSelection;
}

const ForceSelection: FunctionComponent<ForceSelectionProps> = ({ nested, selection }) => {
  const { categories, costs, name, profiles, selections } = selection;
  const [collapse, setCollapse] = useState(!!nested);

  if (nested && !profiles && !selections) {
    return null;
  }

  const cost = costs[0];
  const HeadingTag = nested ? 'h5' : 'h4';

  const toggle = () => setCollapse(!collapse);

  return (
    <ListGroupItem className="force-selection">
      <ListGroupItemHeading tag={HeadingTag}>
        <strong>{name} </strong>

        {parseInt(cost.value, 10) > 0 && (
          <span className="force-selection__cost">
            [{cost.value}
            {cost.name}]
          </span>
        )}

        <Button size="sm" onClick={toggle}>
          Collapse
        </Button>
      </ListGroupItemHeading>
      <Collapse isOpen={collapse}>
        {categories && (
          <ListGroupItemText className="force-selection__categories">
            <strong>Categories: </strong>
            <em>{categories.map((c) => c.name).join(', ')}</em>
          </ListGroupItemText>
        )}
        {profiles &&
          profiles.map((profile) => (
            <ForceProfile key={profile.id} profile={profile} nested={nested} />
          ))}
        {selections && (
          <ListGroup flush className="force-selection__selections">
            {selections.map((s) => (
              <ForceSelection key={s.id} selection={s} nested />
            ))}
          </ListGroup>
        )}
      </Collapse>
    </ListGroupItem>
  );
};

export default ForceSelection;
