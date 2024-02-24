import {useState} from "react";
import {iChoice} from "@/app/interfaces/iChoice";

interface EditQuestionsProps {
    questionId: number;
}

export default function EditChoice(props: EditQuestionsProps) {

    const [questionId, setQuestionId] = useState(props.questionId);
    const [choice, setChoice] = useState<iChoice[]>();

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
                setChoice(responseData.question);
            }
        } catch (error) {
            console.error("Error getting choices", error);
        }
    }

    getChoice();
    return (
        <div>
            {choice?.length > 0 ? <h1>Choices</h1> : <h1>No choices</h1>}
            {choice?.map((choice) => {
                    return (
                        <div key={choice.id}>
                            <input type="text" value={choice.choiceText}/>
                            <input type="checkbox" checked={choice.goodResponse}/>
                        </div>
                    )
                }
            )}
        </div>
    )

}