import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';
import { Table, ListGroup, ListGroupItem, CustomInput, Button } from 'reactstrap';

import classNames from 'classnames';

import { ListProfile, ListCharacteristic } from '../../../../utils/shapes';

export interface ForceProfileProps extends ComponentPropsWithoutRef<'div'> {
  nested?: boolean;
  profile: ListProfile;
}

const ForceProfile: FunctionComponent<ForceProfileProps> = ({ nested, profile }) => {
  const [currentWound, setCurrentWound] = useState(0);

  const { characteristics, hidden, id, name } = profile;

  if (hidden === 'true') {
    return null;
  }

  const HeadingTag = nested ? 'h6' : 'h5';
  const isDescription = characteristics[0] && characteristics[0].name === 'Description';

  const hasAbilities =
    (characteristics[characteristics.length - 1] &&
      characteristics[characteristics.length - 1].name === 'Abilities') ||
    (characteristics[characteristics.length - 1] &&
      characteristics[characteristics.length - 1].name === 'Ability');

  const hasWounds = characteristics.find((c) => c.name === 'W');
  const wounds = characteristics.find((c) => c.name === 'W')?.value;

  let abilities: ListCharacteristic | null = null;

  if (hasAbilities) {
    abilities = characteristics.pop() || null;
  }

  const onChange = (index: number) => {
    const offset = index + 1;

    if (offset !== currentWound) {
      return setCurrentWound(offset);
    }

    return setCurrentWound(0);
  };

  return (
    <div className={classNames('force-profile', nested && 'force-profile--nested')}>
      {isDescription ? (
        <div className="force-profile__description">
          <HeadingTag className="force-profile__description-heading">{name}</HeadingTag>
          <p className="force-profile__description-text">{characteristics[0].value}</p>
        </div>
      ) : (
        <div className="force-profile__stats">
          <Table striped hover size="sm" className="w-100 d-flex flex-column">
            <thead className="force-profile__stats-head">
              <tr className="w-100 h-100 d-flex ">
                <th scope="col" className="w-100 d-flex">
                  {name}
                </th>
              </tr>
            </thead>
            <tbody className="force-profile__stats-body w-100 d-flex flex-column flex-md-row">
              {characteristics.map(({ name: characteristicName, value }) => (
                <tr
                  key={`${id}::${characteristicName}`}
                  className="w-100 h-100 d-flex flex-row flex-md-column justify-content-around">
                  <th scope="row" className="text-center">
                    {characteristicName}
                  </th>
                  <td className="text-center">{value}</td>
                </tr>
              ))}
            </tbody>
            {abilities && abilities.value !== '-' && (
              <tfoot>
                <tr className="force-profile__abilities w-100 h-100 d-flex flex-row flex-md-column justify-content-around">
                  <th>{abilities.name}</th>
                  <td className="text-muted">{abilities.value}</td>
                </tr>
              </tfoot>
            )}
          </Table>
          {hasWounds && (
            <div className="force-profile__wounds">
              <div className="force-profile__wounds-header d-flex flex-row align-items-center">
                <strong>Wounds </strong>
                <Button
                  size="sm"
                  className="force-profile__wounds-clear mr-auto"
                  onClick={() => setCurrentWound(0)}>
                  clear
                </Button>
              </div>
              <ListGroup horizontal="lg" className="force-profile__wounds-list">
                {Array.from({ length: parseInt(wounds || '0', 10) }).map((_, i) => {
                  const woundKey = `${id}::wound::${i.toString()}`;
                  return (
                    <ListGroupItem
                      key={woundKey}
                      className="d-flex flex-row align-items-center justify-content-center">
                      <CustomInput
                        id={woundKey}
                        className="force-profile__wounds-list-item"
                        checked={currentWound >= i + 1}
                        defaultValue={i}
                        label={<span className="sr-only">{`${i} Wound`}</span>}
                        type="checkbox"
                        onChange={() => onChange(i)}
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
