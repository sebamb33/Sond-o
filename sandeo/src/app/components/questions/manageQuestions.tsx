export default function manageQuestions() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const data = {
        question: formData.get("question"),
      };
      //TODO make route for create question
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
        <button className="btn btn-primary">Crée la questions</button>
      </form>
    </div>
  );
}
