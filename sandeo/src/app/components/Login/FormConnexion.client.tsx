// src/components/Login/FormCreateAccount.client.tsx
'use client';
import React from 'react';

export default function Form() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Ici, vous pouvez traiter ou envoyer les données du formulaire
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex-row rounded-md p-20">
            <div className="flex-row h-36">
                <label className="text-lg text-primary font-semibold" htmlFor="email">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="border-4 border-secondary px-2 py-1 rounded-lg w-full"
                />
            </div>
            <div className="flex-row h-36">
                <label className="text-lg text-primary font-semibold" htmlFor="email">
                    Mot de passe:
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-4 border-secondary px-2 py-1 rounded-lg w-full"
                />
            </div>
            <button type="submit" className="bg-secondary rounded-lg w-36 h-14">Se connecter</button>
        </form>
    );
}
