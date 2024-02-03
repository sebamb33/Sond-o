import React from "react";
import router from "next/router";
import Cookies from "js-cookie";

const withAuth = async (WrappedComponent: any) => {
  const WithAuthComponent = async (props: any) => {
    let token = Cookies.get("token");
    //Check the token
    const data = {
      token: token,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/verifyToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!token) {
      router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`;

  return WithAuthComponent;
};

// Cette fonction aide à obtenir le nom d'affichage du composant enveloppé
function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
