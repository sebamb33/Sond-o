import {useState} from "react";
import iChoice from "@/app/interfaces/IChoice";

interface ManageChoiceProps {
    formularyID: number;
}

export default function ManageChoice(props: ManageChoiceProps) {
    const [choices, setChoices] = useState([]);
    const [formularyID, setFormularyID] = useState(props.formularyID);
    if (formularyID) {
        //fetch all quetions and choice  of the formulary
        const fetchChoices = async () => {
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
            }
        };
        fetchChoices();
    }
    console.log(choices);
    if (choices.length > 0) {
        return (
            <div className="AllQuestionsAndChoice">
                <form>
                    <div>
                        <label>Choix</label>
                        <input type="text" name="choice"/>
                    </div>
                    <div>
                        <label>Bonne réponse</label>
                        <input type="checkbox" name="goodResponse"/>
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
                <ul>
                    {choices.map((choice: iChoice) => {
                        return (
                            <li key={choice.id}>
                                {choice.choiceText}
                                <button>Modifier</button>
                                <button>Supprimer</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return (<div><p className="w-full ">Aucune question{choices}</p></div>)
    }

}