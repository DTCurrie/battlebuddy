import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';

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
        <div className="force-profile w-100 d-flex">
            {isDescription ? (
                <div className="force-profile__description d-flex flex-column">
                    <HeadingTag>{name}</HeadingTag>
                    <p className="text-muted">{profileCharacteristics[0]._}</p>
                </div>
            ) : (
                <div className="force-profile__stats w-100 d-flex flex-column">
                    <table
                        className={`table table-striped table-hover table-sm d-flex flex-column py-${
                            nested ? '1' : '3'
                        }`}>
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
                    </table>
                    {hasWounds && (
                        <div className="force-profile__wounds mb-5">
                            <div className="d-flex flex-row align-items-center">
                                <strong>Wounds </strong>
                                <button
                                    onClick={() => setCurrentWound(0)}
                                    type="button"
                                    className="btn btn-danger btn-sm py-0 ml-2 mr-auto">
                                    clear
                                </button>
                            </div>
                            <ul className="list-inline mt-3">
                                {Array.from({ length: parseInt(wounds || '0', 10) }).map((_, i) => {
                                    const woundKey = `${$.id}::wound::${i.toString()}`;
                                    return (
                                        <li
                                            key={woundKey}
                                            className="custom-control custom-checkbox list-inline-item d-inline-block">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                checked={currentWound >= i + 1}
                                                onChange={() =>
                                                    currentWound >= i + 1
                                                        ? setCurrentWound(0)
                                                        : setCurrentWound(i + 1)
                                                }
                                                id={woundKey}
                                                defaultValue={i}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={woundKey}>
                                                <span className="sr-only">{`${i} Wound`}</span>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ForceProfile;
