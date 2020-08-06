import React, { FunctionComponent } from 'react';
import { Jumbotron } from 'reactstrap';

import { ListRoster } from '../../../utils/shapes';

import RosterCost from './RosterCost';

export interface RosterHeaderProps {
  roster: ListRoster;
}

const RosterHeader: FunctionComponent<RosterHeaderProps> = ({ roster }: RosterHeaderProps) => {
  const { id, name, gameSystemName, gameSystemRevision, battleScribeVersion, costs } = roster;

  return (
    <Jumbotron tag="header" className="roster-header">
      <h1 className="roster-header__heading">{name}</h1>
      {costs.map((cost) => (
        <RosterCost key={`${id}::${cost.typeId}::${cost.value}`} cost={cost} />
      ))}
      <p className="roster-header__text">
        <small>
          {gameSystemName} <em>(rev{gameSystemRevision})</em>
        </small>
      </p>
      <p className="roster-header__text">
        <small>
          Generated using BattleScribe <em>(v{battleScribeVersion})</em>
        </small>
      </p>
    </Jumbotron>
  );
};

export default RosterHeader;
