import React, {useEffect, useState} from "react";
import IFormulary from "@/app/interfaces/IFormulary";
import ManageChoice from "@/app/components/manageChoice";

interface ManageQuestionsProps {
    formularyID: number;
}

export default function ManageQuestions(props: ManageQuestionsProps) {

    const [formulary, setFormulary] = useState<IFormulary>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      const {formularyID} = props;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const data = {
          question: formData.get("question") as string,
          formularyID: formularyID,
          manyChoice: formData.get("manyChoice"),
      };
        console.log(data)
      //TODO make route for create question
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/question/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
    } catch (error) {}
  };
    const handleFormularySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const data = {
                title: formData.get("title") as string,
                isPrivate: formData.get("private") === "on" ? true : false,
                isNoted: formData.get("noted") === "on" ? true : false,
                formularyID: props.formularyID,
            };
            //TODO make route for create formulary
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/formulary/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                setFormulary(responseData.formulary as IFormulary);
                alert('Formulaire modifié');
            }
        } catch (error) {
            console.error("Error saving formulary", error)
        }
    };

    //Set variable for formulary
    useEffect(() => {
        const fetchFormulary = async () => {
            const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/formulary/getFormulary`);
            url.searchParams.append('formularyID', props.formularyID.toString());

            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const responseData = await response.json();

                setFormulary(responseData.formulary as IFormulary);


            }
        }
        fetchFormulary().catch((error) => {
            console.error("Error fetching formulary", error);
        });
    }, [props
        .formularyID]);

  return (
      <div className="makeQuestionFormulary flex w-full justify-center pt-5 gap-6">

          <div className="formularyParams w-1/4 bg-primary p-6 rounded-xl ">
              <h2 className="text-white text-2xl">Paramètres du formulaire :</h2>
              <form action="" onSubmit={handleFormularySubmit}>
                  <input type="text" name="title" placeholder="Nom du formulaire" defaultValue={formulary?.name}
                         className="input input-bordered w-full mb-5"/>
                  <label className="cursor-pointer label">
                      <span className="label-text text-white">Privé :</span>
                      <input type="checkbox" name="private" className="toggle toggle-secondary"
                             defaultChecked={formulary?.isPrivate}/>
                  </label>
                  <label className="cursor-pointer label">
                      <span className="label-text text-white">Noté  :</span>
                      <input type="checkbox" name="noted" className="toggle toggle-secondary"
                             defaultChecked={formulary?.isNoted}/>
                  </label>
                  <button className="btn btn-secondary">Modifier le formulaire</button>
              </form>
          </div>
          <form action="" onSubmit={handleSubmit} className="w-1/2 bg-secondary p-6 rounded-xl ">
              <h2 className="text-white text-2xl">Ajouter une question :</h2>
              <input
                  type="text"
                  name="question"
                  placeholder="Question"
                  className="input input-bordered w-full mb-5"
              />
              <label className="cursor-pointer label">
                  <label className="cursor-pointer label">
                      <span className="label-text text-white">Plusieurs choix  :</span>
                      <input type="checkbox" name="manyChoice" className="toggle toggle-primary"
                             defaultChecked/>
                  </label>
              </label>
              <button className="btn btn-primary">Ajouter</button>
          </form>
          <ManageChoice formularyID={props.formularyID}/>
      </div>
  );
}
