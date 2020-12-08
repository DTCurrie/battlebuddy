import React, { ComponentPropsWithoutRef, createContext, FunctionComponent } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export const createNotification = (
  type: 'info' | 'success' | 'warning' | 'error',
  message: string,
  title?: string,
  timeOut?: number,
  callback?: () => void,
  priority?: boolean
): void => {
  NotificationManager[type](
    message,
    title || type.toLocaleUpperCase(),
    timeOut,
    callback,
    priority
  );
};

export const NotificationContext = createContext({
  createNotification,
  manager: NotificationManager,
});

export const NotificationProvider: FunctionComponent<ComponentPropsWithoutRef<'div'>> = ({
  children,
}: ComponentPropsWithoutRef<'div'>) => (
  <NotificationContext.Provider value={{ createNotification, manager: NotificationManager }}>
    <NotificationContainer />
    {children}
  </NotificationContext.Provider>
);
