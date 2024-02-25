import React, {useEffect, useState} from "react";
import {iChoice} from "@/app/interfaces/iChoice";

interface EditQuestionsProps {
    questionId: number;
}


export default function EditChoice(props: EditQuestionsProps) {

    const [questionId, setQuestionId] = useState(props.questionId);
    const [choices, setChoices] = useState<iChoice[]>();
    const handleCreateChoice = async (e: React.FormEvent<HTMLFormElement>, questionId: number) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            questionID: questionId,
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
                //refresh the choices
                setChoices([...choices, responseData.choices])
            }
        } catch (error) {
            console.error("Error creating choice", error);
        }
    };


    useEffect(() => {
        async function getChoice() {
            try {
                const data = {
                    questionId: questionId,
                };
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/choice/getAll`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Tout mes choix : ', responseData)
                    setChoices(responseData.choices);
                }
            } catch (error) {
                console.error("Error getting choices", error);
            }
        }

        getChoice();
    }, [props.questionId]);

    return (
        <div>
            {questionId}
            {choices?.length > 0 ? <div>
                    {choices?.map((choice) => {
                            return (
                                <div key={choice.id}>
                                    <input type="text" defaultValue={choice.choiceText}/>
                                    <input type="checkbox" defaultChecked={choice.goodResponse}/>
                                </div>
                            )
                        }
                    )}
                </div>
                : <div className="makeFirstChocie p-10">
                    <form action="" method="post" onSubmit={(e) => handleCreateChoice(e, props.questionId)}>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text text-primary text-2xl w-1/4 m-auto">Saisir un premier choix : </span>
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