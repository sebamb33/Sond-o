// src/components/Login/FormCreateAccount.client.tsx
"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function FormCreateAccount() {
  Cookies.remove("token");
  const router = useRouter();
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
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        Cookies.set("token", responseData.token);
        router.push("/homePage");
      } else {
        throw new Error("Problème lors de la création du compte");
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-row p-20 rounded-md">
      <div className="flex-row h-36">
        <label className="input input-bordered flex items-center gap-2 border-primary text-secondary">
          Nom :
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="w-1/2 px-2 py-1  rounded-lg "
          />
        </label>
      </div>
      <div className="flex-row h-36">
        <label className="input input-bordered flex items-center gap-2 border-primary text-secondary">
          Prénom :
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="w-1/2 px-2 py-1  rounded-lg "
          />
        </label>
      </div>
      <div className="flex-row h-36">
        <label className="input input-bordered flex items-center gap-2 border-primary text-secondary">
          Email :
          <input
            type="email"
            name="email"
            id="email"
            className="w-1/2 px-2 py-1  rounded-lg "
          />
        </label>
      </div>
      <div className="flex-row h-36">
        <label className="input input-bordered flex items-center gap-2 border-primary text-secondary">
          Mot de passe :
          <input
            type="password"
            name="password"
            id="password"
            className="px-2 py-1 w-1/2  rounded-lg"
          />
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-outline btn-primary hover:bg-primary w-1/2"
      >
        inscrire
      </button>
    </form>
  );
}
