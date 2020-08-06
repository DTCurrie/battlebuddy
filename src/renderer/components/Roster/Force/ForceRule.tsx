import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { ListGroupItem } from 'reactstrap';

import { ListRule } from '../../../../utils/shapes';

export interface ForceRuleProps extends ComponentPropsWithoutRef<'li'> {
  rule: ListRule;
}

const ForceRule: FunctionComponent<ForceRuleProps> = ({ rule }) => {
  const { hidden, id, name, description } = rule;

  if (hidden === 'true') {
    return null;
  }

  return (
    <ListGroupItem key={id} className="force-rule">
      <strong>{name}: </strong>
      <span>{description.flatMap((d) => `${d}`)}</span>
    </ListGroupItem>
  );
};

export default ForceRule;
