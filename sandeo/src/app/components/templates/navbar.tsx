import React, { ReactNode, useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { notionistsNeutral } from "@dicebear/collection";
import "@/app/globals.css";

type UserDataType = {
  firstname: string;
  lastname: string;
  mail: string;
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
  const avatar = createAvatar(notionistsNeutral, {
    seed: userData?.mail,
  });
  return (
    <div className="flex h-full">
      <div className="navbar w-60 bg-red rounded-lg">
        <div className="menu"></div>
        <div className="userData">
          <div className="userPicture">
            <div
              dangerouslySetInnerHTML={{ __html: avatar.toString() }}
              className="avatar"
            ></div>
          </div>
          <div className="userName">
            {userData ? (
              <p>
                Bienvenue, {userData.firstname} {userData.lastname}
              </p>
            ) : (
              <p>Bienvenue</p>
            )}
          </div>
        </div>
      </div>
      <main className="w-9/12">{children}</main>
    </div>
  );
};

export default Navbar;
