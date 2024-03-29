import withAuth from "@/app/hoc/withAuth.client";
import Navbar from "@/app/components/templates/navbar";
import React from "react";
import ListSurveys from "@/app/components/surveys/listSurveys";

const Surveys = () => {
    return (
        <Navbar>
            <div>
                <h1 className="text-center p-10 text-4xl text-primary">Mes sondages </h1>
                <ListSurveys/>
            </div>
        </Navbar>
    );
}
export default withAuth(Surveys);