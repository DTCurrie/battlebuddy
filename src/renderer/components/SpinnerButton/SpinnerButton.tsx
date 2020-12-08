import React, { FunctionComponent, ReactElement } from 'react';
import { Button, ButtonProps, Spinner } from 'reactstrap';

export interface SpinnerButtonProps extends ButtonProps {
  spin?: boolean;
  spinner?: ReactElement;
}

const SpinnerButton: FunctionComponent<SpinnerButtonProps> = ({
  children,
  spin = false,
  spinner = <Spinner color="light" />,
  ...buttonProps
}: SpinnerButtonProps) => <Button {...buttonProps}>{spin ? spinner : children}</Button>;

export default SpinnerButton;
