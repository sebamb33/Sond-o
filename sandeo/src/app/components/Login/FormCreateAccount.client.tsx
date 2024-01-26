// src/components/Login/FormCreateAccount.client.tsx
'use client';
import React from 'react';

export default function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    // Ici, vous pouvez traiter ou envoyer les données du formulaire
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input type="text" name="firstname" />
      </label>

      <label>
        Prénom:
        <input type="text" name="lastname" />
      </label>

      <label>
        Email:
        <input type="email" name="email" />
      </label>

      <label>
        Mot de passe:
        <input type="password" name="password" />
      </label>

      <button type="submit">S'inscrire</button>
    </form>
  );
}
