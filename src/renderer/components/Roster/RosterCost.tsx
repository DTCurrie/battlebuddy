import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react';

import { CostAttributes } from '../../../utils/shapes';

export interface RosterCostProps extends ComponentPropsWithoutRef<'p'> {
  cost: CostAttributes;
}

const RosterCost: FunctionComponent<RosterCostProps> = ({ cost }: RosterCostProps) => (
  <p className="roster-cost">
    <strong>Cost:</strong> {`${cost.value}${cost.name}`}
  </p>
);

export default RosterCost;
