// src/app/[formularyid].tsx
import React from "react";
import "@/app/globals.css";
import LoginClient from "@/app/components/Login/Login.client";

export default function index() {
  return (
    <div className="flex h-screen ">
      <LoginClient />
    </div>
  );
}
