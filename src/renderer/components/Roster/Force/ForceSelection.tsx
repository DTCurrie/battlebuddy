import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';

import {
    ListGroupItem,
    ListGroup,
    ListGroupItemHeading,
    ListGroupItemText,
    Button,
    Collapse,
} from 'reactstrap';
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
    const [collapse, setCollapse] = useState(!!nested);

    if (nested && !profiles && !selections) {
        return null;
    }

    const { $: cost } = flattenShape<Costs, Cost>(costs)[0];
    const HeadingTag = nested ? 'h5' : 'h4';

    const toggle = () => setCollapse(!collapse);

    return (
        <ListGroupItem className="force-selection">
            <ListGroupItemHeading tag={HeadingTag}>
                <strong>{$.name} </strong>

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
                        <em>
                            {flattenShape<Categories, Category>(categories)
                                .map((c) => c.$.name)
                                .join(', ')}
                        </em>
                    </ListGroupItemText>
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
                    <ListGroup flush className="force-selection__selections">
                        {flattenShape<Selections, Selection>(selections).map((s) => (
                            <ForceSelection key={s.$.id} {...s} nested />
                        ))}
                    </ListGroup>
                )}
            </Collapse>
        </ListGroupItem>
    );
};

export default ForceSelection;
