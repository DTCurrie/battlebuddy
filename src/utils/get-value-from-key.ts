import { generateHash } from './generate-hash';

export const getValueByKey = <T extends unknown>(key: string, values: T[]): T =>
  values[generateHash(key) % values.length];
