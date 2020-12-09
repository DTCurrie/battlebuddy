import { RosterData } from '../../../../utils/shapes';

export const getRosterKey = ({ roster, fileName }: RosterData): string =>
  `${roster.id}::${encodeURI(fileName)}`;
