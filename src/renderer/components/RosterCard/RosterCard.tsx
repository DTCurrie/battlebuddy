import { useNavigate } from '@reach/router';
import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';

import { getGameSystemColors } from '../../../utils/colors';
import { GameSystem } from '../../../utils/game-system';
import { getValueByKey } from '../../../utils/get-value-from-key';
import { RosterData } from '../../../utils/shapes';

import { RostersContext } from '../../providers/RostersProvider/RostersProvider';

export type RosterCardTitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface RosterCardProps extends ComponentPropsWithoutRef<'button'> {
  rosterData: RosterData;
  rosterKey: string;
  titleTag?: RosterCardTitleTag;
  subtitleTag?: RosterCardTitleTag;
}

const RosterCard: FunctionComponent<RosterCardProps> = ({
  rosterKey,
  rosterData,
}: RosterCardProps) => {
  const navigate = useNavigate();
  const { setCurrentRoster } = useContext(RostersContext);
  const { roster, fileName } = rosterData;
  const { costs, gameSystemName, name } = roster;

  const [backgroundColor, setBackgroundColor] = useState(
    getValueByKey(rosterKey, getGameSystemColors(roster.gameSystemName as GameSystem) || [])
  );

  useEffect(() => {
    setBackgroundColor(
      getValueByKey(rosterKey, getGameSystemColors(gameSystemName as GameSystem) || [])
    );
  }, [gameSystemName, rosterKey, setBackgroundColor]);

  return (
    <Card
      className="bb-roster-card"
      inverse
      style={{ backgroundColor }}
      onClick={() => {
        setCurrentRoster(rosterData);
        navigate(`/rosters/${rosterKey}`);
      }}>
      <CardBody className="bb-roster-card__body">
        <CardTitle className="bb-roster-card__title" tag="h5">
          {name}
        </CardTitle>
        <CardSubtitle className="bb-roster-card__subtitle" tag="h6">
          <small>{fileName}</small>
        </CardSubtitle>
        <CardText className="bb-roster-card__cost">
          {costs[0].value.split('.')[0]}
          {costs[0].name}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default RosterCard;
