import React from "react";
import { Link } from "react-router-dom";

interface RouterLinkProps {
  children: React.ReactElement | string;
  endpoint: string;
}

export const RouterLink: React.FC<RouterLinkProps> = ({
  children,
  endpoint,
}) => (
  <Link
    className="text-base text-primary-blue font-nav font-black rounded-lg p-3 text-sm hover:text-gray-500 hover:bg-gray-50"
    to={endpoint}
  >
    {children}
  </Link>
);
