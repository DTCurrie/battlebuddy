import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

import { logInfo } from '../../../../utils/logger';
import {
    Forces,
    flattenShape,
    Force,
    Categories,
    Category,
    Selections,
    Selection,
    Rules,
    Rule,
} from '../../../../utils/shapes';

import ForceRule from './ForceRule';
import ForceSelection from './ForceSelection';

export interface ForceDetailsProps extends ComponentPropsWithoutRef<'li'> {
    forces: Forces[];
}

interface ForceMap {
    [id: string]: {
        [category: string]: Selection[];
    };
}

const ForceDetails: FunctionComponent<ForceDetailsProps> = ({ forces }) => {
    if (!forces) {
        return null;
    }

    const forceCategoryEntryIds: string[] = [];
    const forceMap: ForceMap = flattenShape<Forces, Force>(forces).reduce<ForceMap>(
        (previous, current) => {
            const { $: $force, categories, selections } = current;
            const mapData = previous;

            logInfo('Mapping force data', false, { $force, categories, selections });

            if (!mapData[$force.id]) {
                mapData[$force.id] = {};
            }

            flattenShape<Categories, Category>(categories, (category) => {
                const { entryId } = category.$;

                forceCategoryEntryIds.push(entryId);
                mapData[$force.id][entryId] = [];

                return category;
            });

            flattenShape<Selections, Selection>(selections, (selection) => {
                selection.categories?.forEach(({ category }) =>
                    category.forEach(({ $ }) => {
                        if (forceCategoryEntryIds.includes($.entryId)) {
                            mapData[$force.id][$.entryId].push(selection);
                        }
                    })
                );

                return selection;
            });

            return mapData;
        },
        {} as ForceMap
    );

    return (
        <section className="force-details">
            {flattenShape<Forces, Force>(forces).map(({ $: $force, categories, rules }: Force) => {
                const mapData = forceMap[$force.id];

                return (
                    <div key={$force.id} className="force-details__force">
                        <h2>
                            {$force.name} {$force.catalogueName}{' '}
                            <em>
                                (rev
                                {$force.catalogueRevision})
                            </em>
                        </h2>

                        <ListGroup flush className="force-details__rules">
                            <ListGroupItem>
                                <ListGroupItemHeading tag="h3">Rules</ListGroupItemHeading>
                            </ListGroupItem>
                            {flattenShape<Rules, Rule>(rules).map((rule) => (
                                <ForceRule key={rule.$.id} {...rule} />
                            ))}
                        </ListGroup>

                        {forceCategoryEntryIds.map((entryId) => {
                            const categoryData = mapData[entryId];

                            if (!categoryData?.length) {
                                return null;
                            }

                            const flattenedCategories = flattenShape<Categories, Category>(
                                categories
                            );

                            const currentCategory = flattenedCategories.find(
                                (category) => category.$.entryId === entryId
                            );

                            if (
                                !currentCategory ||
                                currentCategory.$.name === 'Uncategorised' ||
                                currentCategory.$.name === 'Configuration'
                            ) {
                                return null;
                            }

                            const { $ } = currentCategory;

                            return (
                                <ListGroup key={$.id} flush className="force-details__selections">
                                    <ListGroupItem>
                                        <ListGroupItemHeading>
                                            <ListGroupItemHeading tag="h3">
                                                {$.name}
                                            </ListGroupItemHeading>
                                        </ListGroupItemHeading>
                                    </ListGroupItem>
                                    {categoryData.map((selection) => (
                                        <ForceSelection key={selection.$.id} {...selection} />
                                    ))}
                                </ListGroup>
                            );
                        })}
                    </div>
                );
            })}
        </section>
    );
};

export default ForceDetails;
