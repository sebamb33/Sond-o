import React from "react";
import withAuth from "../app/hoc/withAuth.client";
import Navbar from "../app/components/templates/navbar";
import Card from "@/app/components/homepage/homePage_cards";
const HomePage = () => {
  return (
    <Navbar>
      <div className="homePageContent p-16">
            <Card />
      </div>
    </Navbar>
  );
};

export default withAuth(HomePage);
