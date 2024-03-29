import {useState} from "react";
import IFormulary from "@/app/interfaces/IFormulary";
import Cookies from "js-cookie";

export default function ListSurveys() {

    const [surveys, setSurveys] = useState<[IFormulary]>();

    const getAllFormulary = async () => {
        console.log("Getting token", Cookies.get("token"));
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/formulary/getAll`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token: Cookies.get("token")}),
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                setSurveys(responseData);
            }
        } catch (error) {
            console.error("Error when getting formularies", error);
        }
    };
    getAllFormulary();
    return (
        <div>

        </div>
    );
}