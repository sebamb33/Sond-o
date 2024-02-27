import React, {useEffect, useRef, useState} from "react";
import {iChoice} from "@/app/interfaces/iChoice";
import {FaSave} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import toast, {Toaster} from 'react-hot-toast';


interface EditQuestionsProps {
    questionId: number;
}


export default function EditChoice({questionId}: EditQuestionsProps) {
    const [choices, setChoices] = useState<iChoice[]>([]);
    const choiceTextRef = useRef<HTMLInputElement>(null);
    const goodResponseRef = useRef<HTMLInputElement>(null);
    const handleCreateChoice = async (e: React.FormEvent<HTMLFormElement>, questionID: number) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            questionID: questionID,
            goodResponse: formData.get("goodResponse") === "on",
            choice: formData.get("choiceText") as string,
        };
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/choice/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                const responseData: iChoice = await response.json();
                console.log(responseData);
                setChoices((prevChoices) => [...prevChoices, responseData]);
                getChoice();
                toast.success('Nouveaux choix crée avec succès');
            }
        } catch (error) {
            console.error("Error creating choice", error);
        }
    };

    //SaveChoice
    const handleSaveChoice = async (e: React.MouseEvent<HTMLFormElement>,choiceID: number) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('je modifie le choix', choiceID);
        try{
            const data = {
                choiceID: choiceID,
                goodResponse: goodResponseRef.current?.checked as boolean,
                choiceText: choiceTextRef.current?.value as string,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/choice/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                const responseData: iChoice = await response.json();
                console.log(responseData);
                getChoice();
                toast.success('Choix modifié avec succès');
            }
        }catch (error) {
            console.error("Error creating choice", error);
        }
    }
    const handleDeleteChoice = async (e: React.MouseEvent<HTMLFormElement>, choiceID: number) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('je supprime le choix', choiceID);
        try{
            const data = {
                choiceID: choiceID,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/choice/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                const responseData: iChoice = await response.json();
                console.log(responseData);
                getChoice();
                toast.success('Choix supprimé avec succès');
            }
    }catch (error) {
        console.error("Error creating choice", error);}
    };
    const createChoice = async (questionId: number) => {
        const data = {
            questionID: questionId,
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/choice/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                toast("oco")
                getChoice()
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    const getChoice = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/choice/getAll`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({questionID: questionId}),
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                setChoices(responseData.choices);

            }
        } catch (error) {
            console.error("Error getting choices", error);
        }
    };
    useEffect(() => {
        getChoice();
    }, [questionId]);
    return (
        <div>
            <Toaster/>
            <h1 className="text-3xl pl-3 pt-3 text-primary">Choix :</h1>
            {choices?.length > 0 ? <div>
                    {choices?.map((choice) => {
                        return (
                                <div key={choice.id}
                                     className="flex align-middle justify-between border border-primary rounded-lg p-10 m-10">
                                    <form className="choiceInputData flex w-1/2 align-middle">
                                        <input type="text" placeholder="Mettre le choix ici" name="choiceText" ref={choiceTextRef} defaultValue={choice.choiceText}
                                               className="input input-bordered input-primary w-2/3 max-w-xs text-xl text-secondary"/>
                                        <div className=" h-full">
                                            <label className="label cursor-pointer">
                                                <span
                                                    className="label-text text-primary text-xl pl-4">Bonne réponse : </span>
                                                <input type="checkbox"  name="goodResponse" defaultChecked={choice.goodResponse} ref={goodResponseRef}
                                                       className="checkbox checkbox-primary ml-4"/>
                                            </label>
                                        </div>
                                    </form>
                                    <div className="buttonChoiceAction flex gap-5">
                                        <FaSave className="text-primary h-8 w-8 cursor-pointer" onClick={(event) => handleSaveChoice(event,choice.id)} />
                                        <MdDelete className="text-primary h-8 w-8 cursor-pointer"onClick={(e)=> handleDeleteChoice(e,choice.id)}/>
                                    </div>

                                </div>
                            )
                        }
                    )}
                    <button className="btn btn-secondary m-10" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        createChoice(questionId);
                    }}>Ajouter un choix
                    </button>
                </div>
                : <div className="makeFirstChocie p-10">
                    <form action="" method="post" onSubmit={(e) => handleCreateChoice(e, questionId)}>

                        <label className="form-control">
                            <div className="label">
                            <span
                                className="label-text text-primary text-2xl w-1/4 m-auto">Saisir un premier choix : </span>
                            </div>
                            <div className="flex-col gap-5 w-1/4 m-auto">
                                <input type="text" placeholder="Votre premier choix"
                                       className="input input-bordered w-full max-w-xs input-primary" name="choiceText"
                                       id="choiceText"/>
                                <label className="label cursor-pointer">
                                    <span className="label-text text-primary">Noté:</span>
                                    <input type="checkbox" name="goodResponse" className=" toggle toggle-secondary"/>
                                </label>
                                <button className="btn btn-secondary w-full">Crée le premier choix</button>
                            </div>
                        </label>
                    </form>

                </div>}

        </div>
    )

}