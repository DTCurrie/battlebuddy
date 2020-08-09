import React, { ComponentPropsWithoutRef, FunctionComponent, ElementType } from 'react';

import { ListGroup, ListGroupItemText } from 'reactstrap';

import { ListSelection } from '../../../../utils/shapes';

import Accordion from '../../Accordion/Accordion';
import ForceProfile from './ForceProfile/ForceProfile';

export interface ForceSelectionProps extends ComponentPropsWithoutRef<'div'> {
  nested?: boolean;
  selection: ListSelection;
}

const ForceSelection: FunctionComponent<ForceSelectionProps> = ({ nested, selection }) => {
  const { categories, costs, name, profiles, selections } = selection;

  if (nested && !profiles && !selections) {
    return null;
  }

  const cost = costs[0];
  const headingTag: ElementType = nested ? 'h5' : 'h4';

  return (
    <Accordion
      className="force-selection"
      headingTag={headingTag}
      sections={[
        {
          heading: `${name} ${parseInt(cost.value, 10) > 0 ? `[${cost.value} ${cost.name}]` : ''}`,
          content: (
            <>
              {categories && (
                <p className="force-selection__categories">
                  <strong>Categories: </strong>
                  <em>{categories.map((c) => c.name).join(', ')}</em>
                </p>
              )}
              {profiles &&
                profiles.map((profile) => (
                  <ForceProfile key={profile.id} profile={profile} nested={nested} />
                ))}
              {selections &&
                selections.map((s) => <ForceSelection key={s.id} selection={s} nested />)}
            </>
          ),
        },
      ]}
    />
  );
};

export default ForceSelection;
