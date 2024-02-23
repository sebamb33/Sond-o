import {useState} from "react";

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

}