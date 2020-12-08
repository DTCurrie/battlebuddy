/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */

declare module 'react-notifications' {
  import { ReactNode } from 'react';
  import { EventEmitter } from 'events';

  enum NotificationType {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
  }

  enum EventType {
    CHANGE = 'change',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
  }

  interface NotificationProps {
    type: NotificationType;
    title?: ReactNode;
    message: ReactNode;
    timeOut?: number;
    onClick: () => any;
    onRequestHide: () => any;
  }

  interface NotificationsProps {
    notifications: Notification[];
    onRequestHide?: (notification: Notification) => any;
    enterTimeout?: number;
    leaveTimeout?: number;
  }

  interface NotificationContainerProps {
    enterTimeout?: number;
    leaveTimeout?: number;
  }

  interface INotificationManagerCreate {
    type: EventType;
    title?: NotificationProps['title'];
    message?: NotificationProps['message'];
    timeout?: number;
    onClick?: () => any;
    priority?: boolean;
  }

  class Notification extends React.Component<NotificationProps, unknown> {}

  class Notifications extends React.Component<NotificationsProps, unknown> {}

  class NotificationContainer extends React.Component<NotificationContainerProps, unknown> {}

  class NotificationManager extends EventEmitter {
    static create(INotificationManagerCreate: INotificationManagerCreate): void;

    static info(
      message?: INotificationManagerCreate['message'],
      title?: INotificationManagerCreate['title'],
      timeOut?: INotificationManagerCreate['timeout'],
      onClick?: INotificationManagerCreate['onClick'],
      priority?: INotificationManagerCreate['priority']
    ): void;

    static success(
      message?: INotificationManagerCreate['message'],
      title?: INotificationManagerCreate['title'],
      timeOut?: INotificationManagerCreate['timeout'],
      onClick?: INotificationManagerCreate['onClick'],
      priority?: INotificationManagerCreate['priority']
    ): void;

    static warning(
      message?: INotificationManagerCreate['message'],
      title?: INotificationManagerCreate['title'],
      timeOut?: INotificationManagerCreate['timeout'],
      onClick?: INotificationManagerCreate['onClick'],
      priority?: INotificationManagerCreate['priority']
    ): void;

    static error(
      message?: INotificationManagerCreate['message'],
      title?: INotificationManagerCreate['title'],
      timeOut?: INotificationManagerCreate['timeout'],
      onClick?: INotificationManagerCreate['onClick'],
      priority?: INotificationManagerCreate['priority']
    ): void;

    static remove(notification: Notification): void;
  }
}
