import {useEffect, useState} from "react";

interface ManageQuestionsProps {
    formularyID: number;
}

export default function ManageQuestions(props: ManageQuestionsProps) {


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
                description: formData.get("description") as string,
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
        } catch (error) {
        }
    };

    //Set variable for formulary
    const [formularyName, setFormularyName] = useState<string>("");

    useEffect(() => {
        const fetchFormulary = async () => {
            const data = {
                formularyID: props.form
            }
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/formulary/getFormulary`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            console.log(response);
            if (response.ok) {
                console.log('la réponse', response);
                const responseData = await response.json();
                console.log(responseData.body);


            }
        }
    }, []);

  return (
      <div className="makeQuestionFormulary flex w-full justify-center pt-5 gap-6">
          <div className="formularyParams w-1/3 bg-primary p-6 rounded-xl ">
              <h2 className="text-white text-2xl">Paramètres du formulaire :</h2>
              <form action="" onSubmit={handleFormularySubmit}>
                  <input type="text" name="title" placeholder="ici" className="input input-bordered w-full mb-5"/>
              </form>
          </div>
          <form action="" onSubmit={handleSubmit} className="w-1/2 bg-secondary p-6 rounded-xl ">
            <input
                type="text"
                name="question"
                placeholder="Question"
                className="input input-bordered w-full mb-5"
            />
            <label className="cursor-pointer label">
                <span className="label-text text-white">Plusieurs choix</span>
                <input type="checkbox" defaultChecked name="manyChoice" className="checkbox checkbox-primary "/>
            </label>
            <button className="btn btn-primary">Ajouter la questions</button>
        </form>
    </div>
  );
}
