// src/components/Login/Login.client.tsx
"use client";
import React, { useState } from "react";
import FormCreateAccount from "./FormCreateAccount.client";
import FormConnection from "./FormConnexion.client";

export default function LoginClient() {
  const [connection, setConnection] = useState(false);
  let changeform = () => {
    console.log("connexion : " + connection);
    setConnection(!connection);
  };

  return (
    <div className="flex w-full">
      <div className="w-1/2 logo-part flex justify-center align-middle m-auto  ">
        <div className="appName flex h-[5em]">
          <h1 className="text-6xl pt-5 titleWebsite h-5">Sandeo</h1>
          <img
            src="/logoSandeo.svg"
            alt="logo application"
            className="w-16 h-[5em]"
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col  h-fit m-auto ">
        <div className="buttonForm flex align-middle justify-center ">
          <button
            className="p-3 border-4 border-grey rounded-tl-lg rounded-bl-lg hover:bg-primary hover:text-white font-bold w-1/4"
            onClick={changeform}
          >
            Connexion
          </button>
          <button
            className="p-3 border-4 border-grey rounded-tr-lg rounded-br-lg hover:bg-primary hover:text-white font-bold w-1/4"
            onClick={changeform}
          >
            Inscription
          </button>
        </div>
        {connection ? <FormConnection /> : <FormCreateAccount />}
      </div>
    </div>
  );
}
