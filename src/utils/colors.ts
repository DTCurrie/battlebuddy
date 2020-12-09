import killTeamColors from '../renderer/styles/palettes/_kill-team.module.scss';
import warcryColors from '../renderer/styles/palettes/_warcry.module.scss';

import { GameSystem } from './game-system';

export const killTeam = killTeamColors;
export const getKillTeamColors = (): string[] =>
  Object.keys(killTeam).flatMap((color) => killTeam[color]);

export const warcry = warcryColors;
export const getWarcryColors = (): string[] =>
  Object.keys(warcry).flatMap((color) => warcry[color]);

export const gameSystemColors = {
  [GameSystem.KillTeam]: getKillTeamColors(),
  [GameSystem.Warcry]: getWarcryColors(),
};

export const getGameSystemColors = (gameSystem: GameSystem): string[] =>
  gameSystemColors[gameSystem];
