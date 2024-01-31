import React from "react";
import bcrypt from "bcryptjs";

export default function Form() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const saltRounds = 10;
    const hashPassword = async (password: string): Promise<string> => {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      } catch (error) {
        throw error;
      }
    };

    let hashedPassword: string = "";
    const password = formData.get("password");
    if (password && typeof password === "string") {
      hashedPassword = await hashPassword(password);
    }
    const data = {
      mail: formData.get("email"),
      password: hashedPassword,
    };

    try {
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/connect`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Problème lors de la connexion");
      }
      const responseData = await response.json();
      console.log("Réponse de l'API", responseData);
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
    }
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
