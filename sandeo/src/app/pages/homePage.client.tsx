import React from "react";
import withAuth from "../hoc/withAuth.client";
const homePage = () => {
  <div className="homePageContent">
    <h1>Je suis connecté</h1>
  </div>;
};

export default withAuth(homePage);
