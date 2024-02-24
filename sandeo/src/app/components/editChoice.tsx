import React, {useState} from "react";
import {iChoice} from "@/app/interfaces/iChoice";

interface EditQuestionsProps {
    questionId: number;
}

export default function EditChoice(props: EditQuestionsProps) {

    const [questionId, setQuestionId] = useState(props.questionId);
    const [choices, setChoices] = useState<iChoice[]>();

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
                setChoices(responseData.question);
            }
        } catch (error) {
            console.error("Error getting choices", error);
        }
    }

    getChoice();
    return (
        <div>
            {choices?.length > 0 ? <div>
                    {choices?.map((choice) => {
                            return (
                                <div key={choice.id}>
                                    <input type="text" value={choice.choiceText}/>
                                    <input type="checkbox" checked={choice.goodResponse}/>
                                </div>
                            )
                        }
                    )}
                </div>
                : <div className="makeFirstChocie p-10">
                    <form action="" method="post">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text text-primary text-2xl w-1/4 m-auto">Saisir un premier choix : </span>
                            </div>
                            <div className="flex-col gap-5 w-1/4 m-auto">
                                <input type="text" placeholder="Votre premier choix"
                                       className="input input-bordered w-full max-w-xs input-primary"/>
                                <label className="label cursor-pointer">
                                    <span className="label-text text-primary">Privé :</span>
                                    <input type="checkbox" name="private" className=" toggle toggle-secondary"/>
                                </label>
                                <button className="btn btn-secondary w-full">Crée le premier choix</button>
                            </div>
                        </label>
                    </form>

                </div>}

        </div>
    )

}