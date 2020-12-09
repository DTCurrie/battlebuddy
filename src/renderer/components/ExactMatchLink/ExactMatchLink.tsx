import React, { FunctionComponent } from 'react';
import { Link, LinkProps, useLocation, useMatch } from 'react-router-dom';

export type ExactMatchLinkProps = LinkProps;

const ExactMatchLink: FunctionComponent<ExactMatchLinkProps> = ({
  to,
  ...attributes
}: ExactMatchLinkProps) => {
  const location = useLocation();
  const match = useMatch(to.toString());

  return (
    <Link
      className={match?.pathname === location.pathname ? 'active' : ''}
      to={to}
      {...attributes}
    />
  );
};

export default ExactMatchLink;
