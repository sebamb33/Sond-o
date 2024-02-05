// components/templates/navbar.tsx
import React, { ReactNode } from "react";

type navbar = {
  children: ReactNode;
};

const navbar = ({ children }: navbar) => (
  <div>
    <div className="navbar">
      <div className="menu">
        {/* TODO : Replace the classname by component  */}
        <div className="navigationItem">Mes sondages</div>
        <div className="navigationItem">Mes statistiques</div>
      </div>
      {/*  TODO: Replace user data by component */}
      <div className="userData">firstnam-lastname</div>
    </div>
    <main>{children}</main>
  </div>
);

export default navbar;
