import React from "react";
import withAuth from "../app/hoc/withAuth.client";

const HomePage = () => {
  return (
    template
    <div className="homePageContent">
      <h1>Je suis connecté</h1>
    </div>
  );
};

export default withAuth(HomePage);
