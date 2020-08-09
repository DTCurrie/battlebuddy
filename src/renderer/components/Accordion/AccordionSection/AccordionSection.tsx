import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode,
  useState,
  ElementType,
} from 'react';
import { Card, CardHeader, Button, Collapse, CardBody } from 'reactstrap';
import { nanoid } from 'nanoid';

export interface AccordionSectionData {
  content: ReactNode;
  heading: ReactNode;
}

export interface AccordionSectionProps
  extends AccordionSectionData,
    ComponentPropsWithoutRef<'div'> {
  headingTag: ElementType;
}

const AccordionSection: FunctionComponent<AccordionSectionProps> = ({
  content,
  heading,
  headingTag: HeadingTag,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const collapseId = `accordion__section-collapse::${nanoid()}`;

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Card className="accordion__section">
      <CardHeader
        aria-label={`${heading}`}
        aria-controls={collapseId}
        className="accordion__section-heading"
        color="primary"
        block
        tag={Button}
        onClick={toggle}>
        <HeadingTag>{heading}</HeadingTag>
      </CardHeader>

      <Collapse id={collapseId} isOpen={collapsed}>
        <CardBody className="accordion__section-content">{content}</CardBody>
      </Collapse>
    </Card>
  );
};

export default AccordionSection;
