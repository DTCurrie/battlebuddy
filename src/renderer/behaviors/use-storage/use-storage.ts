import ElectronStore, { Schema } from 'electron-store';
import { useState } from 'react';

export const useStorage = <T extends Schema<T>>(name: string, schema?: T): ElectronStore<T> => {
  const [store] = useState(new ElectronStore({ name, schema, watch: true }));
  return store;
};
