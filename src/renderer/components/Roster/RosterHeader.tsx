import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { Jumbotron } from 'reactstrap';

import { Roster, flattenShape, Costs, Cost, RosterAttributes } from '../../../utils/shapes';

import RosterCost from './RosterCost';

export interface RosterHeaderProps {
    $: RosterAttributes;
    costs: Costs[];
}

const RosterHeader: FunctionComponent<RosterHeaderProps> = ({ $, costs }: RosterHeaderProps) => {
    const { id, name, gameSystemName, gameSystemRevision, battleScribeVersion } = $;
    return (
        <Jumbotron tag="header" className="roster-header">
            <h1 className="roster-header__heading">{name}</h1>
            {flattenShape<Costs, Cost>(costs).map(({ $: $cost }) => (
                <RosterCost key={`${id}::${$cost.typeId}::${$cost.value}`} $={$cost} />
            ))}
            <p className="roster-header__text">
                <small>
                    {gameSystemName} <em>(rev{gameSystemRevision})</em>
                </small>
            </p>
            <p className="roster-header__text">
                <small>
                    Generated using Battlescribe <em>(v{battleScribeVersion})</em>
                </small>
            </p>
        </Jumbotron>
    );
};

export default RosterHeader;
