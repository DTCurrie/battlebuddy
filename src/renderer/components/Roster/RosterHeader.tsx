import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { Roster, flattenShape, Costs, Cost, RosterAttributes } from '../../../utils/shapes';
import RosterCost from './RosterCost';

export interface RosterHeaderProps {
    $: RosterAttributes;
    costs: Costs[];
}

const RosterHeader: FunctionComponent<RosterHeaderProps> = ({ $, costs }: RosterHeaderProps) => {
    const { id, name, gameSystemName, gameSystemRevision, battleScribeVersion } = $;
    return (
        <header className="roster__header jumbotron bg-primary text-white">
            <h1>{name}</h1>
            {flattenShape<Costs, Cost>(costs).map(({ $: $cost }) => (
                <RosterCost key={`${id}::${$cost.typeId}::${$cost.value}`} $={$cost} />
            ))}
            <p className="mb-0">
                <small>
                    {gameSystemName} <em>(rev{gameSystemRevision})</em>
                </small>
            </p>
            <p className="mb-0">
                <small>
                    Generated using Battlescribe <em>(v{battleScribeVersion})</em>
                </small>
            </p>
        </header>
    );
};

export default RosterHeader;
