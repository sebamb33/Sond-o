"use client";
import React, {useState} from 'react';
import Cookies from "js-cookie";
import router from "next/router";
import ErrorAlert from "../alert/errorAlert";

export default function FormularyManageFormClient() {
    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isNoted, setIsNoted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleAlertClose = () => {
        router.push('/homePage');
    };

    const handleSubmit = async(event :any) => {
        event.preventDefault();
        setIsLoading( true);
        const token = Cookies.get("token");

        try {
            const data = ({
                token,
                name,
                isPrivate,
                isNoted,
            });

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/formulary/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if(response.ok){
                const responseData = await response.json();
                console.log(responseData);
                router.push(`/formularyManage/${responseData.formulary.id}`);
                }else{
                throw new Error("Problème réponse serveur ");
            }
            setIsLoading(false);
        } catch (error) {
            <ErrorAlert message="Ceci est une alerte stylisée !" onClose={handleAlertClose} />
            console.error("Erreur lors de la Création form", error);

        }
    };
    if(!isLoading){
    return (
        <form className="formulary flex flex-col w-80 m-auto border border-secondary rounded-lg p-3 bg-primary" onSubmit={handleSubmit}>
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Nom du Sondage"
                    className="input input-ghost w-full h-24 text-gray-400 text-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="toggle_part grid grid-cols-2">
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text text-gray-400">Privé : </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text text-gray-400">Noté :  </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={isNoted}
                            onChange={(e) => setIsNoted(e.target.checked)}
                        />
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-secondary">Crée le Sondage</button>
        </form>
    );
} else{
    return (
        <span className="loading loading-spinner text-primary "></span>
    );
    }
}
