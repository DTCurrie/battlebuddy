import React, { ComponentPropsWithoutRef, FunctionComponent, ElementType } from 'react';
import { nanoid } from 'nanoid';

import classNames from 'classnames';

import AccordionSection, { AccordionSectionData } from './AccordionSection/AccordionSection';

import './Accordion.scss';

export interface AccordionProps extends ComponentPropsWithoutRef<'div'> {
  fill?: boolean;
  headingTag: ElementType;
  sections: AccordionSectionData[];
}

const Accordion: FunctionComponent<AccordionProps> = ({ fill, headingTag, sections }) => {
  return (
    <div className={classNames('accordion', fill && 'accordian--fill')}>
      {sections.map(({ heading, content }) => (
        <AccordionSection
          key={`accordion__section::${nanoid()}`}
          heading={heading}
          headingTag={headingTag}
          content={content}
        />
      ))}
    </div>
  );
};

export default Accordion;
