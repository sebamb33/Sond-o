import React, { useEffect, useState } from "react";
import withAuth from "@/app/hoc/withAuth.client";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const FormularyManage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const { formularyid } = router.query;

  const checkIfAuthorized = async () => {
    try {
      const token = Cookies.get("token");
      const data = {
        token: token,
        formulary: formularyid,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/formulary/checkIfAuthorized`,
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
        console.log(responseData);
        return responseData.authorized;
      } else {
        console.error("Problème lors de la vérification de l'autorisation");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'autorisation", error);
      return false;
    }
  };

  useEffect(() => {
    if (formularyid) {
      const fetchAuth = async () => {
        const authorized = await checkIfAuthorized();
        setIsAuthorized(authorized);
      };

      fetchAuth();
    }
  }, [formularyid]);

  if (isAuthorized) {
    return (
      <div>
        <h1>FormularyManage</h1>
        <p>{formularyid}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>FormularyManage</h1>
        <p>Vous êtes pas autorisé à accéder à ce formulaire</p>
      </div>
    );
  }
};

export default withAuth(FormularyManage);
