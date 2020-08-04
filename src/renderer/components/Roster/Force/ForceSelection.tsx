import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';

import {
    Selection,
    CostAttributes,
    flattenShape,
    Categories,
    Category,
    Profiles,
    Profile,
    Costs,
    Cost,
    Selections,
} from '../../../../utils/shapes';

import ForceProfile from './ForceProfile';

export interface ForceSelectionProps extends Selection, ComponentPropsWithoutRef<'li'> {
    nested?: boolean;
}

const ForceSelection: FunctionComponent<ForceSelectionProps> = ({
    $,
    categories,
    costs,
    nested,
    profiles,
    selections,
}) => {
    if (nested && !profiles && !selections) {
        return null;
    }

    const { $: cost } = flattenShape<Costs, Cost>(costs)[0];
    const HeadingTag = nested ? 'h5' : 'h4';

    return (
        <li className={`force-selection list-unstyled py-${nested ? '1' : '3'}`}>
            <HeadingTag>
                <strong>{$.name} </strong>

                {parseInt(cost.value, 10) > 0 && (
                    <span className="force-selection__cost">
                        [{cost.value}
                        {cost.name}]
                    </span>
                )}
            </HeadingTag>
            {categories && (
                <div className="force-selection__categories">
                    <strong>Categories: </strong>
                    <em>
                        {flattenShape<Categories, Category>(categories)
                            .map((c) => c.$.name)
                            .join(', ')}
                    </em>
                </div>
            )}
            {profiles &&
                flattenShape<Profiles, Profile>(
                    profiles
                ).map(({ $: $profile, characteristics }) => (
                    <ForceProfile
                        key={$profile.id}
                        $={$profile}
                        characteristics={characteristics}
                        nested={nested}
                    />
                ))}
            {selections && (
                <ul className="force-selection__selections list-unstyled">
                    {flattenShape<Selections, Selection>(selections).map((s) => (
                        <ForceSelection key={s.$.id} {...s} nested />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default ForceSelection;
