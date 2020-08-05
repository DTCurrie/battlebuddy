import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { ListGroupItem } from 'reactstrap';

import { Rule } from '../../../../utils/shapes';

export interface ForceRuleProps extends Rule, ComponentPropsWithoutRef<'li'> {}

const ForceRule: FunctionComponent<ForceRuleProps> = ({ $, description }) => {
    const { hidden, id, name } = $;

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
