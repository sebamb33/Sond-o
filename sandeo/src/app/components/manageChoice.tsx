import {useEffect, useState} from "react";
import iChoice from "@/app/interfaces/IChoice";
import iQuestion from "@/app/interfaces/IQuestion";

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
            <div>
                <h2>Questions</h2>
                <div>

                    {questions.map((question) => {
                        return (
                            <div key={question.id}>
                                <h3>{question.questionText}</h3>
                                <div>
                                    {choices.map((choice) => {
                                        if (choice.questionID === question.id) {
                                            return (
                                                <div key={choice.id}>
                                                    <p>{choice.choiceText}</p>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
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
