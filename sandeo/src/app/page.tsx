import React, { useState, ChangeEvent, FormEvent } from 'react';

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  code: string;
};

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    code: ''
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Traiter les données du formulaire
    console.log(formData);
    // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur ou les traiter selon vos besoins
  };

  return (
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
          />
        </label>

        <label>
          Prénom:
          <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
          />
        </label>

        <label>
          Code:
          <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
          />
        </label>

        <button type="submit">Créer un compte</button>
      </form>
  );
}
