import { resolve } from 'path';
import * as fs from 'fs';

import { Parser } from 'xml2js';
import * as extract from 'extract-zip';

import { remote } from 'electron';

import { logInfo, logError } from './logger';
import { BattlescribeRosterData } from './shapes';

const { readdir, readFile } = fs.promises;
const tempPath = remote.app.getPath('temp');
export async function parseXml(rosterPath: string): Promise<BattlescribeRosterData[]> {
  const rostersFolder = resolve(__dirname, rosterPath);
  const data: BattlescribeRosterData[] = [];

  try {
    const fileNames = await readdir(rostersFolder);

    for await (const fileName of fileNames) {
      if (fileName.split('.')[1] === `ros`) {
        try {
          const filePath = resolve(rostersFolder, fileName).split(/ /).join(' ');

          logInfo(`Reading file ${filePath}`);

          const parser = new Parser({ async: true });
          const file = await readFile(filePath);

          try {
            const result = await parser.parseStringPromise(file);
            const { roster } = result;

            logInfo(`Parsed roster from  ${fileName}`, false, { fileName, roster });

            data.push({ fileName, roster });
          } catch (error) {
            logError(
              `Error parsing roster file ${fileName}: \n\t ${error.message ? error.message : error}`
            );
            throw error;
          }
        } catch (error) {
          logError(
            `Error reading roster file ${fileName}: \n\t ${error.message ? error.message : error}`
          );
          throw error;
        }
      }

      if (fileName.split('.')[1] === `rosz`) {
        try {
          const filePath = resolve(rostersFolder, fileName).split(/ /).join(' ');

          logInfo(`Reading file ${filePath}`);

          const parser = new Parser({ async: true });

          try {
            let entryName = '';

            await extract(filePath, {
              dir: tempPath,
              onEntry: (entry) => {
                entryName = entry.fileName;
              },
            });

            const file = await readFile(resolve(tempPath, entryName));

            try {
              const result = await parser.parseStringPromise(file);
              const { roster } = result;

              logInfo(`Parsed roster from  ${fileName}`, false, { fileName, roster });

              data.push({ fileName, roster });
            } catch (error) {
              logError(
                `Error parsing roster file ${fileName}: \n\t ${
                  error.message ? error.message : error
                }`
              );
              throw error;
            }
          } catch (error) {
            logError(
              `Error extracting roster from compressed file ${fileName}: \n\t ${
                error.message ? error.message : error
              }`
            );
            throw error;
          }
        } catch (error) {
          logError(
            `Error reading roster file ${fileName}: \n\t ${error.message ? error.message : error}`
          );
          throw error;
        }
      }
    }
  } catch (error) {
    logError(`Error getting roster files: \n\t ${error.message ? error.message : error}`);
    throw new Error(`Unable to locate roster folder, please update your roster path.`);
  }

  return Promise.all(data);
}
