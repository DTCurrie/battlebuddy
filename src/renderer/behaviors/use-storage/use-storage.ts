import ElectronStore, { Schema } from 'electron-store';
import { useEffect, useState } from 'react';
import { dequal } from 'dequal';

export const useStorage = <T>(
  name: string,
  schema?: Schema<T>,
  defaults?: Readonly<T>
): [T, ElectronStore<Schema<T>>] => {
  const [storage] = useState(new ElectronStore({ name, schema, watch: true, defaults }));

  const [value, setValue] = useState<T>(
    Object.keys(storage.store).reduce((accumulator, current) => {
      accumulator[current] = storage.get(current as keyof T);
      return accumulator;
    }, {} as Record<string, unknown>) as T
  );

  const unsubscribe = storage.onDidAnyChange((newValue, oldValue) => {
    if (!!newValue && !!oldValue && !dequal(newValue, oldValue)) {
      setValue(newValue);
    }
  });

  useEffect(() => () => {
    unsubscribe();
  });

  return [value, storage];
};
