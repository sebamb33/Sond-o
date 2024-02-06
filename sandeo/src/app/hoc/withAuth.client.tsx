import React, { useEffect, useState } from "react";
import router from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthComponent: React.FC<any> = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const verifyToken = async () => {
        let token = Cookies.get("token");
        if (!token) {
          router.push("/");
        } else {
          try {
            const data = { token: token };
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
            if (response) {
              setIsLoading(false);
              //set to local storage
              const userData = await response.json();
              if (userData.user) {
                sessionStorage.setItem(
                  "userData",
                  JSON.stringify(userData.user)
                );
              }
            }
            if (!response.ok) throw new Error("Token verification failed");

            setIsLoading(false); // Token is valid
          } catch (error) {
            console.error("Token verification error:", error);
            router.push("/login");
          }
        }
      };

      verifyToken();
    }, []);

    if (isLoading) {
      return <div>Chargement...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`;

  return WithAuthComponent;
};

//for name of compunent enveloped
function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
