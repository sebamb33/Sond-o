import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Form() {
  Cookies.remove("token");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const data = {
        mail: formData.get("email"),
        password: formData.get("password"),
      };

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

      if (response.ok) {
        const responseData = await response.json();
        Cookies.set("token", responseData.token);
        router.push("/homePage");
      } else {
        alert("Mot de passe incorect");
      }
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
