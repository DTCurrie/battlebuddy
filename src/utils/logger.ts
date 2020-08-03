const messageMap = {} as { [key: string]: boolean };

export const log = (
    message: string,
    type: 'log' | 'info' | 'error' = 'log',
    once?: boolean
): void => {
    if (process.env.NODE_ENV === 'production' || (once && messageMap[message])) {
        return;
    }

    messageMap[message] = true;
    // eslint-disable-next-line no-console
    console[type](message);
};

export const logInfo = (message: string, once?: boolean): void => log(message, 'info', once);
export const logError = (message: string, once?: boolean): void => log(message, 'error', once);
