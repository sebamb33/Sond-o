// src/app/page.tsx

import React from 'react';
import Form from './components/Form.client';
import FormConnection from './components/FormConnexion.client';
import "./globals.css";


export default function Page() {
  return (
      <div className="flex h-screen bg-secondary">
          <div className="formLogin  bg-white rounded-lg flex-col justify-center items-center align m-auto w-4/12 p-3">

              <div className="formHeader flex justify-around ">
                  <h1 className='text-6xl pt-5 titleWebsite'>Sandeo</h1>
                  <img src='/logoSandeo.svg' alt='logo application' className='w-16'/>
              </div>
              <div className="buttonChangeForm flex justify-center mt-6">
                  <button className='p-1 border-2 border-secondary rounded-tl-lg rounded-bl-lg'>Connexion</button>
                  <button className='p-1 border-2 border-secondary rounded-tr-lg rounded-br-lg'>Inscription</button>
              </div>
              <div className="hidden"><Form/></div>
              <FormConnection/>
          </div>

      </div>

  );
}
