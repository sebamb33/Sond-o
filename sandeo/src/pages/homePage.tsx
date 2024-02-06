import React from "react";
import withAuth from "../app/hoc/withAuth.client";
import Navbar from "../app/components/templates/navbar";
const HomePage = () => {
  return (
    <Navbar>
      <div className="homePageContent">
        <h1>Je suis connecté</h1>
      </div>
    </Navbar>
  );
};

export default withAuth(HomePage);
