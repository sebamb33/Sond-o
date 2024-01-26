// src/app/page.tsx
import React, { useState } from 'react';
import Form from './components/Login/FormCreateAccount.client';
import FormConnection from './components/Login/FormConnexion.client';
import "./globals.css";
import LoginClient from "@/app/components/Login/Login.client";


export default function Page() {

  return (
      <div className="flex h-screen bg-secondary">
        <LoginClient/>
      </div>

  );
}
