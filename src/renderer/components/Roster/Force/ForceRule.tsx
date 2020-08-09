import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { ListGroupItem } from 'reactstrap';

import { ListRule } from '../../../../utils/shapes';

export interface ForceRuleProps extends ComponentPropsWithoutRef<'p'> {
  rule: ListRule;
}

const ForceRule: FunctionComponent<ForceRuleProps> = ({ rule }) => {
  const { hidden, id, name, description } = rule;

  if (hidden === 'true') {
    return null;
  }

  return (
    <p key={id} className="force-rule">
      <strong>{name}: </strong>
      <span>{description.flatMap((d) => `${d}`)}</span>
    </p>
  );
};

export default ForceRule;
