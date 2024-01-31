// src/components/Login/FormCreateAccount.client.tsx
"use client";
import React from "react";
import bcrypt from "bcrypt";

export default function FormCreateAccount() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const password = formData.get("password");

    const hashPassword = async (password: any) => {
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    };

    let hashedPassword = "";
    if (password && typeof password === "string") {
      hashedPassword = await hashPassword(password);
    }

    const data = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: hashedPassword,
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
    <form onSubmit={handleSubmit} className="flex-row rounded-md p-20">
      <div className="flex-row h-36">
        <label
          className="text-lg text-primary font-semibold"
          htmlFor="firstname"
        >
          Nom:
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="border-4 border-secondary px-2 py-1 rounded-lg w-full"
        />
      </div>
      <div className="flex-row h-36">
        <label
          className="text-lg text-primary font-semibold"
          htmlFor="lastname"
        >
          Prénom:
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="border-4 border-secondary px-2 py-1 rounded-lg w-full"
        />
      </div>
      <div className="flex-row h-36">
        <label className="text-lg text-primary font-semibold" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-4 border-secondary px-2 py-1 rounded-lg w-full"
        />
      </div>
      <div className="flex-row h-36">
        <label
          className="text-lg text-primary font-semibold"
          htmlFor="password"
        >
          Mot de passe:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-4 border-secondary px-2 py-1 rounded-lg w-full"
        />
      </div>

      <button type="submit" className="bg-secondary rounded-lg w-36 h-14">
        inscrire
      </button>
    </form>
  );
}
