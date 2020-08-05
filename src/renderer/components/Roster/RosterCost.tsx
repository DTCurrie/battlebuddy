import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react';

import { Cost } from '../../../utils/shapes';

export interface RosterCostProps extends Cost, ComponentPropsWithoutRef<'p'> {}

const RosterCost: FunctionComponent<RosterCostProps> = ({ $ }: RosterCostProps) => (
    <p className="roster-cost">
        <strong>Cost:</strong> {`${$.value}${$.name}`}
    </p>
);

export default RosterCost;
