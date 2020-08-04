import { resolve } from 'path';
import * as fs from 'fs';

import { Parser } from 'xml2js';

import { logInfo, logError } from './logger';
import { RosterData } from './shapes';

const { readdir, readFile } = fs.promises;

const rostersFolder = resolve('rosters');

export async function parseXml(): Promise<RosterData[]> {
    const data: RosterData[] = [];

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
                        const { $ } = roster;

                        logInfo(`Parsed roster ${$.name}`);

                        data.push(result);
                    } catch (error) {
                        logError(
                            `Error parsing roster file ${fileName}: \n\t ${
                                error.message ? error.message : error
                            }`
                        );
                    }
                } catch (error) {
                    logError(
                        `Error reading roster file ${fileName}: \n\t ${
                            error.message ? error.message : error
                        }`
                    );
                }
            }
        }
    } catch (error) {
        logError(`Error getting roster files: \n\t ${error.message ? error.message : error}`);
    }

    return Promise.all(data);
}
