import React, { ComponentPropsWithoutRef, createContext, FunctionComponent } from 'react';

import { BattlebuddyConfig } from '../../utils/shapes';

import { useConfig } from '../behaviors/use-config/use-config';

export const ConfigContext = createContext<BattlebuddyConfig | undefined>(undefined);

export const ConfigProvider: FunctionComponent<ComponentPropsWithoutRef<'div'>> = ({
  children,
}: ComponentPropsWithoutRef<'div'>) => {
  const [config] = useConfig();
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
