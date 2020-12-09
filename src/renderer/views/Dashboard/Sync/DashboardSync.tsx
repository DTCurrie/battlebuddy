import { RouteComponentProps } from '@reach/router';
import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';

import { useConfig } from '../../../behaviors/use-config/use-config';

import SyncButton from '../../../components/SyncButton/SyncButton';

export interface DashboardSyncProps extends ComponentPropsWithoutRef<'div'>, RouteComponentProps {}

const DashboardSync: FunctionComponent<DashboardSyncProps> = () => {
  const [{ rosterPath }] = useConfig();

  return (
    <div className="bb-dashboard-sync bb-view">
      <h2 className="bb-dashboard-sync__heading">Sync</h2>
      <p className="bb-dashboard-sync__info">
        It looks like you haven&apos;t synced your rosters yet. We will currently attempt to sync
        your rosters from the following location:
      </p>
      <figure className="bb-dashboard-sync__roster-path">
        <code>{rosterPath}</code>
      </figure>
      <SyncButton className="bb-dashboard-sync__sync-button" />
    </div>
  );
};

export default DashboardSync;
