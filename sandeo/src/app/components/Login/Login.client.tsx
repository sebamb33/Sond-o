// src/components/Login/Login.client.tsx
"use client";
import React, { useState } from "react";
import FormCreateAccount from "./FormCreateAccount.client";
import FormConnection from "./FormConnexion.client";

export default function LoginClient() {
  const [connection, setConnection] = useState(false);
  const changeform = (connexion: boolean) => {
    setConnection(connexion);
  };

  return (
    <div className=" flex flex-col  w-full lg:flex lg:flex-row  xl:flex 2xl:flex  ">
      <div className="w-1/3 logo-part flex justify-center align-middle m-auto  ">
        <div className="appName flex h-[8em] justify-between">
          <h1 className="text-6xl font-bold pt-5  h-5 text-primary pr-5">
            Sandéo
          </h1>
          <img
            src="/logoSandeoPrimary.svg"
            alt="logo application"
            className="w-16 h-[5em]"
          />
        </div>
      </div>
      <div className="w-full  p-3   flex flex-col  h-fit m-auto card  shadow-gray-300 lg:shadow-2xl bg-base-100 sm:w-full  lg:w-1/2 xl:w-1/3 ">
        <div className="buttonForm flex align-middle justify-center pt-4 ">
          <button
            className={`p-3 border border-r-0 border-primary rounded-tl-lg rounded-bl-lg hover:bg-primary hover:text-white font-semibold w-1/4  text-gray-500 ${connection ? "bg-primary text-white" : ""}`}
            onClick={() => changeform(true)}
          >
            Connexion
          </button>
          <button
            className={`p-3 border  border-primary rounded-tr-lg rounded-br-lg hover:bg-primary hover:text-white font-semibold w-1/4 text-gray-500 ${connection ? "" : "bg-primary text-white"}`}
            onClick={() => changeform(false)}
          >
            Inscription
          </button>
        </div>
        {connection ? <FormConnection /> : <FormCreateAccount />}
      </div>
    </div>
  );
}
