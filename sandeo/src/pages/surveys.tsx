import withAuth from "@/app/hoc/withAuth.client";
import Navbar from "@/app/components/templates/navbar";
import React from "react";

const Surveys = () => {
    return (
        <Navbar>
            <div>
                <h1 className="text-center p-10 text-4xl text-primary">Gestion du compte </h1>
            </div>
        </Navbar>
    );
}
export default withAuth(Surveys);