import { resolve } from 'path';
import * as fs from 'fs';

import { Parser } from 'xml2js';

import { logInfo, logError } from './logger';
import { RosterData } from './shapes';

const { readFile } = fs.promises;

export async function parseXml(filePath: string): Promise<RosterData | null> {
  try {
    if (filePath.split('.')[1] === `ros`) {
      try {
        const formattedFilePath = resolve(filePath).split(/ /).join(' ');

        logInfo(`Reading file ${formattedFilePath}`);

        const parser = new Parser({ async: true });
        const file = await readFile(formattedFilePath);

        try {
          const result = await parser.parseStringPromise(file);
          const { roster } = result;
          const { $ } = roster;

          logInfo(`Parsed roster ${$.name}`);

          return result;
        } catch (error) {
          logError(
            `Error parsing roster file ${formattedFilePath}: \n\t ${
              error.message ? error.message : error
            }`
          );
        }
      } catch (error) {
        logError(
          `Error reading roster file ${filePath}: \n\t ${error.message ? error.message : error}`
        );
      }
    }
  } catch (error) {
    logError(`Error getting roster files: \n\t ${error.message ? error.message : error}`);
  }

  return null;
}
