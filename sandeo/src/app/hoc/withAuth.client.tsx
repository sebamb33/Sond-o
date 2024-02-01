import React from "react";
import router from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: any) => {
  const WithAuthComponent = (props: any) => {
    let token = Cookies.get("token");

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
