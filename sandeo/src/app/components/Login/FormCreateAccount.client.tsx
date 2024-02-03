// src/components/Login/FormCreateAccount.client.tsx
"use client";
import React from "react";
import bcrypt from "bcryptjs";

export default function FormCreateAccount() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const password = formData.get("password");

    const data = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Problème lors de la création du compte");
      }
      const responseData = await response.json();
      console.log("Réponse de l'API", responseData);
    } catch (error) {
      console.error("Erreur lors de la création du compte", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-row p-20 rounded-md">
      <div className="flex-row h-36">
        <label
          className="text-lg font-semibold text-primary"
          htmlFor="firstname"
        >
          Nom:
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="w-full px-2 py-1 border-4 rounded-lg border-secondary"
        />
      </div>
      <div className="flex-row h-36">
        <label
          className="text-lg font-semibold text-primary"
          htmlFor="lastname"
        >
          Prénom:
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="w-full px-2 py-1 border-4 rounded-lg border-secondary"
        />
      </div>
      <div className="flex-row h-36">
        <label className="text-lg font-semibold text-primary" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full px-2 py-1 border-4 rounded-lg border-secondary"
        />
      </div>
      <div className="flex-row h-36">
        <label
          className="text-lg font-semibold text-primary"
          htmlFor="password"
        >
          Mot de passe:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full px-2 py-1 border-4 rounded-lg border-secondary"
        />
      </div>

      <button type="submit" className="rounded-lg bg-secondary w-36 h-14">
        inscrire
      </button>
    </form>
  );
}
