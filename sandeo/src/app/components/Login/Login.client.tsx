// src/components/Login/Login.client.tsx
"use client";
import React, { useState } from "react";
import FormCreateAccount from "./FormCreateAccount.client";
import FormConnection from "./FormConnexion.client";
import webSiteLogo from "/logoSandeo.svg";

export default function LoginClient() {
  const [connection, setConnection] = useState(false);
  let changeform = () => {
    console.log("connexion : " + connection);
    setConnection(!connection);
  };

  return (
    <div className="formLogin  bg-white rounded-lg flex-col justify-center items-center align m-auto w-4/12 p-3">
      <div className="formHeader flex justify-around ">
        <h1 className="text-6xl pt-5 titleWebsite">Sandeo</h1>
        <img src={webSiteLogo} alt="logo application" className="w-16" />
      </div>
      <div className="buttonChangeForm flex justify-center mt-6">
        <button
          className="p-2 border-2 border-secondary rounded-tl-lg rounded-bl-lg"
          onClick={changeform}
        >
          Connexion
        </button>
        <button
          className="p-2 border-2 border-secondary rounded-tr-lg rounded-br-lg"
          onClick={changeform}
        >
          Inscription
        </button>
      </div>
      {connection ? <FormConnection /> : <FormCreateAccount />}
    </div>
  );
}
