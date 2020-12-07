import React, {
    ComponentPropsWithoutRef,
    FunctionComponent,
    createContext,
    useState,
    useEffect,
} from 'react';
import { BattlebuddyConfig, getConfig } from '../../utils/config';

export const ConfigContext = createContext<BattlebuddyConfig | undefined>(undefined);

export const ConfigProvider: FunctionComponent<ComponentPropsWithoutRef<'div'>> = ({
    children,
}: ComponentPropsWithoutRef<'div'>) => {
    const [config, setConfig] = useState<BattlebuddyConfig | undefined>(undefined);

    useEffect(() => {
        async function fetchConfig() {
            const fetchedConfig = await getConfig();
            setConfig(fetchedConfig);
        }

        fetchConfig().then();
    }, []);

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
