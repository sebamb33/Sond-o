import React, { ReactNode, useEffect, useState } from "react";
import "@/app/globals.css";

type UserDataType = {
  firstname: string;
  lastname: string;
};

type NavbarProps = {
  children: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    if (userDataString) {
      setUserData(JSON.parse(userDataString) as UserDataType);
    }
  }, []);

  return (
    <div className="flex h-full">
      <div className="navbar w-60 bg-red rounded-lg">
        <div className="menu"></div>
        <div className="userData">
          <div className="userPicture"></div>
          <div className="userName">
            {userData ? (
              <p>
                Bienvenue, {userData.firstname} {userData.lastname}
              </p>
            ) : (
              <p>
                Bienvenue, valeur par défaut pour prénom valeur par défaut pour
                nom
              </p>
            )}
          </div>
        </div>
      </div>
      <main className="w-9/12">{children}</main>
    </div>
  );
};

export default Navbar;
