import { useNavigate } from '@reach/router';
import React, { FunctionComponent, useContext, useState } from 'react';
import { Spinner } from 'reactstrap';

import { NotificationContext } from '../../providers/NotificationProvider/NotificationProvider';
import { RostersContext } from '../../providers/RostersProvider/RostersProvider';

import SpinnerButton, { SpinnerButtonProps } from '../SpinnerButton/SpinnerButton';

export type SyncButtonProps = Omit<SpinnerButtonProps, 'spin' | 'onClick'>;

const SyncButton: FunctionComponent<SyncButtonProps> = (props: SyncButtonProps) => {
  const { createNotification } = useContext(NotificationContext);
  const { sync } = useContext(RostersContext);
  const navigate = useNavigate();

  const [syncing, setSyncing] = useState(false);

  return (
    <SpinnerButton
      {...props}
      spin={syncing}
      spinner={props.spinner || <Spinner color="light" size="sm" />}
      onClick={() => {
        setSyncing(true);

        sync()
          .then(() => {
            createNotification('success', 'Successfully synced rosters', 'Synced!');
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
