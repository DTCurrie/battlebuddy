const messageMap = {} as { [key: string]: boolean };

export const log = (
  message: string,
  type: 'log' | 'info' | 'error' | 'dir' = 'log',
  once?: boolean,
  obj?: unknown
): void => {
  if (process.env.NODE_ENV === 'production' || (once && messageMap[message])) {
    return;
  }

  messageMap[message] = true;

  if (obj) {
    // eslint-disable-next-line no-console
    console[type](message, obj);
    return;
  }

  // eslint-disable-next-line no-console
  console[type](message);
};

export const logInfo = (message: string, once?: boolean, obj?: unknown): void =>
  log(message, 'info', once, obj);

export const logError = (message: string, once?: boolean, obj?: unknown): void =>
  log(message, 'error', once, obj);
