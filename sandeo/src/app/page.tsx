// src/app/page.tsx

import React from 'react';
import Form from './components/Form.client';
import FormConnection from './components/FormConnexion.client'

export default function Page() {
  return (
    <div>
      <Form />
      <FormConnection/>
    </div>
  );
}
