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
      };
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

  return (
    <div className="makeQuestionFormulary">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Question"
          className="input input-bordered w-full max-w-xs"
        />
          <button className="btn btn-primary">Ajouter la questions</button>
      </form>
    </div>
  );
}
