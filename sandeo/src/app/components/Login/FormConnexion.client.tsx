// src/components/Login/FormCreateAccount.client.tsx
"use client";
import React from "react";

export default function Form() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    //const response = await fetch("/user/conn");
    console.log(data);
    const response = await fetch("/user/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Response", response);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-row rounded-md p-20">
      <div className="h-36 flex-row">
        <label className="text-primary text-lg font-semibold" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-secondary w-full rounded-lg border-4 px-2 py-1"
        />
      </div>
      <div className="h-36 flex-row">
        <label className="text-primary text-lg font-semibold" htmlFor="email">
          Mot de passe:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-secondary w-full rounded-lg border-4 px-2 py-1"
        />
      </div>
      <button type="submit" className="bg-secondary h-14 w-36 rounded-lg">
        Se connecter
      </button>
    </form>
  );
}
