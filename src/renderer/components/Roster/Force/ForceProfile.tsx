import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';
import { Table, ListGroup, ListGroupItem, CustomInput, Button } from 'reactstrap';

import { Profile, flattenShape, Characteristics, Characteristic } from '../../../../utils/shapes';

export interface ForceProfileProps extends Profile, ComponentPropsWithoutRef<'div'> {
    nested?: boolean;
}

const ForceProfile: FunctionComponent<ForceProfileProps> = ({ $, characteristics, nested }) => {
    const [currentWound, setCurrentWound] = useState(0);

    const { hidden, id, name } = $;

    if (hidden === 'true') {
        return null;
    }

    const HeadingTag = nested ? 'h6' : 'h5';
    const profileCharacteristics = flattenShape<Characteristics, Characteristic>(characteristics);
    const isDescription = profileCharacteristics[0].$.name === 'Description';

    const hasAbilities =
        profileCharacteristics[profileCharacteristics.length - 1].$.name === 'Abilities' ||
        profileCharacteristics[profileCharacteristics.length - 1].$.name === 'Ability';

    const hasWounds = profileCharacteristics.find((c) => c.$.name === 'W');
    const wounds = profileCharacteristics.find((c) => c.$.name === 'W')?._;

    let abilities: Characteristic | null = null;

    if (hasAbilities) {
        abilities = profileCharacteristics.pop() || null;
    }

    return (
        <div className="force-profile">
            {isDescription ? (
                <div className="force-profile__description">
                    <HeadingTag className="force-profile__description-heading">{name}</HeadingTag>
                    <p className="force-profile__description-text">{profileCharacteristics[0]._}</p>
                </div>
            ) : (
                <div className="force-profile__stats">
                    <Table striped hover size="sm" className="w-100 d-flex flex-column">
                        <thead className={nested ? 'thead-light' : 'thead-dark'}>
                            <tr className="w-100 h-100 d-flex ">
                                <th
                                    scope="col"
                                    className={`w-100 d-flex ${
                                        nested ? '' : 'bg-success border-success'
                                    }`}>
                                    {name}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="w-100 d-flex flex-column flex-md-row">
                            {profileCharacteristics.map(
                                ({ $: $characteristic, _: characteristicValue }) => (
                                    <tr
                                        key={`${id}::${$characteristic.name}`}
                                        className="w-100 h-100 d-flex flex-row flex-md-column justify-content-around">
                                        <th scope="row" className="text-center">
                                            {$characteristic.name}
                                        </th>
                                        <td className="text-center">{characteristicValue}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                        {abilities && abilities._ !== '-' && (
                            <tfoot>
                                <tr className="force-profile__abilities w-100 h-100 d-flex flex-row flex-md-column justify-content-around">
                                    <th>{abilities.$.name}</th>
                                    <td className="text-muted">{abilities._}</td>
                                </tr>
                            </tfoot>
                        )}
                    </Table>
                    {hasWounds && (
                        <div className="force-profile__wounds">
                            <div className="force-profile__wounds-header d-flex flex-row align-items-center">
                                <strong>Wounds </strong>
                                <Button
                                    color="danger"
                                    size="sm"
                                    className="force-profile__wounds-clear mr-auto"
                                    onClick={() => setCurrentWound(0)}>
                                    clear
                                </Button>
                            </div>
                            <ListGroup flush horizontal className="force-profile__wounds-list">
                                {Array.from({ length: parseInt(wounds || '0', 10) }).map((_, i) => {
                                    const woundKey = `${$.id}::wound::${i.toString()}`;
                                    return (
                                        <ListGroupItem key={woundKey}>
                                            <CustomInput
                                                id={woundKey}
                                                className="force-profile__wounds-list-item"
                                                checked={currentWound >= i + 1}
                                                defaultValue={i}
                                                label={
                                                    <span className="sr-only">{`${i} Wound`}</span>
                                                }
                                                type="checkbox"
                                                onChange={() =>
                                                    currentWound >= i + 1
                                                        ? setCurrentWound(0)
                                                        : setCurrentWound(i + 1)
                                                }
                                            />
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ForceProfile;
