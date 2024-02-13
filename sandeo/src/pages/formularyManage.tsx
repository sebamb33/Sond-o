import React from "react";
import withAuth from "../app/hoc/withAuth.client";
import Navbar from "../app/components/templates/navbar";
import FormularyManageForm from "@/app/components/formularyManage/formularyManageForm";
import FormularyManageStat from "@/app/components/formularyManage/formularyManageStat";

const formularyManage = () => {
  return (
    <div>
        <Navbar>
            <div className="formularyManage p-16 w-full">
                    <FormularyManageForm />
                    <FormularyManageStat />
            </div>
        </Navbar>
    </div>
  );
}
export default withAuth(formularyManage);