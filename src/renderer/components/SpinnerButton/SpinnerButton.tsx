import React, { FunctionComponent, ReactElement } from 'react';
import { Button, ButtonProps, Spinner } from 'reactstrap';

export interface SpinnerButtonProps extends ButtonProps {
  spin?: boolean;
  spinner?: ReactElement;
}

const SpinnerButton: FunctionComponent<SpinnerButtonProps> = ({
  children,
  spin = false,
  spinner = <Spinner className="bb-spinner-button__spinner" color="light" />,
  ...buttonProps
}: SpinnerButtonProps) => (
  <Button className="bb-spinner-button" {...buttonProps}>
    {spin ? spinner : children}
  </Button>
);

export default SpinnerButton;
