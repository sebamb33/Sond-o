// components/templates/navbar.tsx
import React, { ReactNode } from "react";

type navbar = {
  children: ReactNode;
};

const navbar = ({ children }: navbar) => (
  <div>
    <div className="navbar"></div>
    <main>{children}</main>
  </div>
);

export default navbar;
