import React, {useEffect, useState} from "react";
import iQuestion from "@/app/interfaces/IQuestion";
import {MdDeleteOutline} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import EditChoice from "@/app/components/editChoice";
import toast, {Toaster} from "react-hot-toast";

interface ManageChoiceProps {
    formularyID: number;
    reload: boolean;
}

export default function ManageQuestions(props: ManageChoiceProps) {
    const [questions, setQuestions] = useState<iQuestion[]>([]);
    const [formularyID, setFormularyID] = useState(props.formularyID);
    const [updateQuestions, setUpdateQuestions] = useState(false);

    const handleDeleteQuestion = async (questionID: number) => {
        const data = {
            questionID: questionID,
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/question/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        if (response.ok) {
            toast.success("Question supprimée avec succès");
            const responseData = await response.json();
            setQuestions((prevQuestions) =>
                prevQuestions.filter((question) => question.id !== questionID)
            );

        }
    };

    const updateQuestion = async (e: React.FormEvent<HTMLFormElement>, questionID: number) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            questionID: questionID,
            questionText: formData.get("questionTextUpdate") as string,
            manyChoice: formData.get("manyChoice") === "on" ? true : false,
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/question/update`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        if (response.ok) {
            toast.success("Question modifiée avec succès");
            const responseData = await response.json();
            fetchChoices();
            setUpdateQuestions(false);
        }
    }
    const fetchChoices = async () => {
        if (formularyID) {
            const data = {
                formularyID: formularyID,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/question/getAll`,
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
                setQuestions(responseData.questions);
            }
        }
    };

    useEffect(() => {
        fetchChoices();
    }, [formularyID, props.reload]);
    if (questions.length > 0) {
        return (

            <div className=" w-4/5 mt-10  m-auto flex-col">
                <Toaster/>
                <h2 className="text-center text-5xl text-primary pb-20">Questions :</h2>
                <div
                    className="w-full h-4/5 overflow-auto max-h-[50rem]  p-3  rounded-2xl scrollbar-h-5 scrollbar scrollbar-thumb-secondary scrollbar-track-white scrollbar-thumb-rounded-full">
                    {questions.map((question, index) => {
                        return (
                            <div className="flex flex-col border border-primary rounded-xl mb-14" key={question.id}>
                                <div className="flex items-center bg-primary rounded-t-lg p-3 gap-5">
                                    <h3 className={`flex-grow text-white text-3xl text-center ${updateQuestions ? "w-1/3" : "full"}`}>{question.questionText}</h3>


                                    <form className={`flex items-center gap-5 w-2/3 ${updateQuestions ? '' : 'hidden'}`}
                                          onSubmit={
                                              (e) => {
                                                  updateQuestion(e, question.id);
                                              }
                                          }>
                                        <input type="text" name="questionTextUpdate" placeholder={question.questionText}
                                               defaultValue={question.questionText}
                                               className=" align-center input input-bordered input-secondary w-full max-w-xs"/>
                                        <label className="cursor-pointer label">
                                            <span className="label-text text-white pr-5">Plusieurs choix  :</span>
                                            <input type="checkbox" name="manyChoice" className="toggle toggle-primary"
                                                   defaultChecked={question.manyChoice}/>
                                        </label>
                                        <button className="btn btn-secondary">Modifier la question</button>
                                    </form>

                                    <MdDeleteOutline className={`text-white h-5 w-5 ${updateQuestions ? 'hidden' : ''}`}
                                                     onClick={(e) => handleDeleteQuestion(question.id)}/>
                                    <FaEdit className={`text-white h-5 w-5 ${updateQuestions ? 'hidden' : ''}`}
                                            onClick={(e) => {
                                                setUpdateQuestions(true)
                                            }}/>
                                </div>
                                <EditChoice key={`${question.id}-${index}`} questionId={question.id}/>
                            </div>
                        );
                    })}
                </div>

            </div>
        );
    } else {
        return <div><Toaster/><p className="w-full">Aucune question</p></div>;
    }
}
