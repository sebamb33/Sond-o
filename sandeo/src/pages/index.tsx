// src/app/page.tsx
import React, { useState } from "react";
import "@/app/globals.css";
import LoginClient from "@/app/components/Login/Login.client";

export default function index() {
  return (
    <div className="flex h-screen bg-secondary">
      <LoginClient />
    </div>
  );
}
