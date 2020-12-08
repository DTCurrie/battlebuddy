import { RouteComponentProps } from '@reach/router';
import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';

import { useConfig } from '../../../behaviors/use-config/use-config';

import SyncButton from '../../../components/SyncButton/SyncButton';

export interface DashboardSyncProps extends ComponentPropsWithoutRef<'div'>, RouteComponentProps {}

const DashboardSync: FunctionComponent<DashboardSyncProps> = () => {
  const [{ rosterPath }] = useConfig();

  return (
    <div className="bb-dashboard-sync">
      <h2>Sync</h2>
      <p>
        It looks like you haven&apos;t synced your rosters yet. We will currently attempt to sync
        your rosters from the following location:
      </p>
      <figure>
        <code>{rosterPath}</code>
      </figure>
      <SyncButton />
    </div>
  );
};

export default DashboardSync;
