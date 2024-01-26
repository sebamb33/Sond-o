// src/app/page.tsx

import React from 'react';
import Form from './components/Form.client';
import FormConnection from './components/FormConnexion.client';
import "./globals.css";


export default function Page() {
  return (
      <div className="flex h-screen ">
          <div className="leftPart w-11/12 bg-secondary">

          </div>
          <div className="rightPart flex-col justify-center items-center align h-full w-6/12">
              <h1 className='text-4xl'>Sandeo</h1>
              <div className="hidden"><Form/></div>
              <FormConnection/>
          </div>

      </div>

  );
}
