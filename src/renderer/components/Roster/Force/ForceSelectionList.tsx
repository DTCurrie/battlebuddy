import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react';

import { ListSelection } from '../../../../utils/shapes';

import Accordion from '../../Accordion/Accordion';
import ForceSelection from './ForceSelection';

export interface ForceSelectionListProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  selections: ListSelection[];
}

const ForceSelectionList: FunctionComponent<ForceSelectionListProps> = ({ name, selections }) => {
  return (
    <Accordion
      className="force-selections-list"
      headingTag="h3"
      sections={[
        {
          heading: name,
          content: selections.map((selection) => (
            <ForceSelection key={selection.id} selection={selection} />
          )),
        },
      ]}
    />
  );
};

export default ForceSelectionList;
