// components/templates/navbar.tsx
import React, { ReactNode } from "react";
import "@/app/globals.css";
type navbar = {
  children: ReactNode;
};

const navbar = ({ children }: navbar) => (
  <div className="flex h-full	">
    <div className="navbar w-60	bg-red rounded-lg">
      <div className="menu"></div>
      <div className="userData">firstnam-lastname</div>
    </div>
    <main className="w-9/12	">{children}</main>
  </div>
);

export default navbar;
