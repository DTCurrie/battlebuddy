import React, { FunctionComponent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import { NotificationContext } from '../../providers/NotificationProvider/NotificationProvider';
import { RostersContext } from '../../providers/RostersProvider/RostersProvider';

import SpinnerButton, { SpinnerButtonProps } from '../SpinnerButton/SpinnerButton';

export type SyncButtonProps = Omit<SpinnerButtonProps, 'spin' | 'onClick'>;

const SyncButton: FunctionComponent<SyncButtonProps> = (props: SyncButtonProps) => {
  const { createNotification } = useContext(NotificationContext);
  const { sync, clearCurrentRoster } = useContext(RostersContext);
  const navigate = useNavigate();

  const [syncing, setSyncing] = useState(false);

  return (
    <SpinnerButton
      {...props}
      className="bb-sync-button"
      spin={syncing}
      spinner={
        props.spinner || <Spinner className="bb-sync-button__spinner" color="light" size="sm" />
      }
      onClick={() => {
        setSyncing(true);

        sync()
          .then(() => {
            createNotification('success', 'Successfully synced rosters', 'Synced!');
            clearCurrentRoster();
            navigate('/');
          })
          .catch((error) =>
            createNotification(
              'error',
              error.message ||
                'Something went wrong while trying to sync your rosters, please try again.'
            )
          )
          .finally(() => setSyncing(false));
      }}>
      Sync
    </SpinnerButton>
  );
};

export default SyncButton;
