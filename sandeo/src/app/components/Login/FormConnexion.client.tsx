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
        },
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
        <label className="input input-bordered flex items-center gap-2 border-primary text-secondary">
          Email
          <input
            type="email"
            name="email"
            id="email"
            className=" w-full rounded-lg  px-2 py-1 "
          />
        </label>
      </div>
      <div className="h-36 flex-row">
        <label className="input input-bordered flex items-center gap-2 border-primary text-secondary">
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            className="w-1/2 rounded-lg  px-2 py-1 "
          />
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-outline btn-primary hover:bg-primary w-1/2"
      >
        Se connecter
      </button>
    </form>
  );
}
