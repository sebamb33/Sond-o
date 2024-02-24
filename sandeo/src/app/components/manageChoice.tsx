import {useEffect, useState} from "react";
import iChoice from "@/app/interfaces/IChoice";
import iQuestion from "@/app/interfaces/IQuestion";
import {MdDeleteOutline} from "react-icons/md";
import {FaEdit} from "react-icons/fa";


interface ManageChoiceProps {
    formularyID: number;
}

export default function ManageChoice(props: ManageChoiceProps) {
    const [choices, setChoices] = useState<iChoice[]>([]);
    const [questions, setQuestions] = useState<iQuestion[]>([]);
    const [formularyID, setFormularyID] = useState(props.formularyID);

    useEffect(() => {
        const fetchChoices = async () => {
            if (formularyID) {
                const data = {
                    formularyID: formularyID,
                };
                //const responseQuestion = await fetch(
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
                    setChoices(responseData.choices);
                    setQuestions(responseData.questions);
                }
            }
        };

        fetchChoices();
    }, [formularyID]);
    console.log(questions)
    if (questions.length > 0) {
        return (
            <div className=" w-4/5 mt-10  m-auto flex-col">
                <h2 className="text-center text-5xl text-primary pb-20">Questions :</h2>
                <div
                    className="w-full h-4/5 overflow-auto max-h-[50rem]  p-3  scrollbar-h-5 scrollbar scrollbar-thumb-secondary scrollbar-track-white scrollbar-thumb-rounded-full">
                    {questions.map((question) => {
                        return (
                            <div className="flex flex-col border border-primary rounded-xl mb-14" key={question.id}>
                                <div className="flex items-center bg-primary rounded-t-lg p-3 gap-5">
                                    <h3 className="flex-grow text-white text-3xl text-center">{question.questionText}</h3>
                                    <MdDeleteOutline className="text-white h-5 w-5"/>
                                    <FaEdit className="text-white h-5 w-5"/>
                                </div>
                                <p>Ici y'aura les choix</p>
                                {/* Autres éléments */}
                            </div>
                        );
                    })}
                </div>

            </div>
        );
    } else {
        return <div><p className="w-full">Aucune question</p></div>;
    }
}
