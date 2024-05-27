import React, {ReactNode, useEffect, useState} from "react";
import {createAvatar} from "@dicebear/core";
import {botttsNeutral} from "@dicebear/collection";
import "@/app/globals.css";
import router from "next/router";
import Cookies from "js-cookie";

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
  const avatar = createAvatar(botttsNeutral, {
    seed: userData?.mail,
  });
  const disconnect = () => {
    sessionStorage.removeItem("userData");
    Cookies.remove("token");
    router.push("/");
  };
  const avatarDataUrl = `data:image/svg+xml;base64,${btoa(avatar.toString())}`;

  return (
    <div className="body__app">
      <div className="navbar bg-base-100 ">
        <div className="flex-1">
          <a
            className="btn btn-ghost text-3xl text-primary"
            onClick={() => router.push("/homePage")}
          >
            Sondéo
          </a>
        </div>
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Sondages</a>
            </li>
            <li>
              <a>Statistiques</a>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={avatarDataUrl} />
              </div>
            </div>
            <ul
                tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between" onClick={event => {
                  router.push('/accountManage')
                }}>Mon profil ({userData?.mail})</a>
              </li>
              <li>
                <a>Parametres</a>
              </li>
              <li>
                <a onClick={disconnect}>Déconnecter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
