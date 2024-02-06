// components/templates/navbar.tsx
import React, { ReactNode } from "react";

type navbar = {
  children: ReactNode;
};

const navbar = ({ children }: navbar) => (
  <div>
    <div className="navbar w-20">
      <div className="menu"></div>
      <div className="userData">firstnam-lastname</div>
    </div>
    <main>{children}</main>
  </div>
);

export default navbar;
