import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';

import { Rule } from '../../../../utils/shapes';

export interface ForceRuleProps extends Rule, ComponentPropsWithoutRef<'li'> {}

const ForceRule: FunctionComponent<ForceRuleProps> = ({ $, description }) => {
    const { hidden, id, name } = $;

    if (hidden === 'true') {
        return null;
    }

    return (
        <li key={id} className="force__rule">
            <strong>{name}: </strong>
            <span>{description.flatMap((d) => `${d}`)}</span>
        </li>
    );
};

export default ForceRule;
