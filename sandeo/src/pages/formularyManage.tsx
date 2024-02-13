import React from "react";
import withAuth from "../app/hoc/withAuth.client";
import Navbar from "../app/components/templates/navbar";
import FormularyManageFormClient from "@/app/components/formularyManage/formularyManageForm.client";
import FormularyManageStat from "@/app/components/formularyManage/formularyManageStat";

const formularyManage = () => {
  return (
    <div>
        <Navbar>
            <div className="formularyManage p-16 w-full">
                    <FormularyManageFormClient />
                    <FormularyManageStat />
            </div>
        </Navbar>
    </div>
  );
}
export default withAuth(formularyManage);