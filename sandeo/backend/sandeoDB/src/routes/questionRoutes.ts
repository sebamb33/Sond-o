import express from "express";
import {AppDataSource} from "../data-source";
import {Question} from "../entity/Question";
import {Choice} from "../entity/Choice";


const questionRouter = express.Router();


questionRouter.post("/create", async (req, res) => {
    console.log(req.body);
    const {question, formularyID, manyChoice} = req.body as {
        question: string,
        formularyID: number
        manyChoice: string
    }
    if (formularyID) {
        let newQuestion = new Question();
        newQuestion.formularyId = formularyID as number;
        newQuestion.questionText = question;
        newQuestion.status = manyChoice;
        //Get the number of questions in the formulary for order
        AppDataSource.getRepository(Question)
            .count({
                where: {
                    formularyId: formularyID
                }
            })
            .then((count) => {
                newQuestion.order = count + 1;
            })
        AppDataSource.getRepository(Question)
            .save(newQuestion)
            .then((savedQuestion) => {
                console.log("Question saved", savedQuestion);
                res.status(200).json({question: savedQuestion});
            })
            .catch((error) => {
                console.error("Error saving question", error);
                res.status(500).json({error: "An error occurred while saving the question."});
            });
    }

});
questionRouter.delete("/delete", async (req, res) => {
    const {questionID} = req.body as { questionID: number };
    if (questionID) {
        AppDataSource.getRepository(Choice).find({where: {questionId: questionID}})
            .then((choices) => {
                if (choices.length > 0) {
                    AppDataSource.getRepository(Choice)
                        .remove(choices)
                        .then(() => {
                            console.log("Choices deleted");
                        })
                        .catch((error) => {
                            console.error("Error deleting choices", error);
                            res.status(500).json({error: "An error occurred while deleting the choices."});
                        });
                }
            })
            .catch((error) => {
                console.error("Error getting choices", error);
                res.status(500).json({error: "An error occurred while getting the choices."});
            });
        AppDataSource.getRepository(Question)
            .findOne({
                where: {
                    id: questionID
                }
            })
            .then((question) => {
                if (question) {
                    AppDataSource.getRepository(Question)
                        .remove(question)
                        .then(() => {
                            res.status(200).json({message: "Question deleted"});
                        })
                        .catch((error) => {
                            console.error("Error deleting question", error);
                            res.status(500).json({error: "An error occurred while deleting the question."});
                        });
                } else {
                    res.status(404).json({error: "Question not found"});
                }
            })
            .catch((error) => {
                console.error("Error getting question", error);
                res.status(500).json({error: "An error occurred while getting the question."});
            });
    }
});
questionRouter.post("/getAll", async (req, res) => {
    const {formularyID} = req.body as { formularyID: number };
    if (formularyID) {
        AppDataSource.getRepository(Question)
            .find({
                where: {
                    formularyId: formularyID
                }
            })
            .then((questions) => {
                res.status(200).json({questions: questions});
            })
            .catch((error) => {
                console.error("Error getting questions", error);
                res.status(500).json({error: "An error occurred while getting the questions."});
            });
    }
});

questionRouter.put("/update", async (req, res) => {
    const {questionID, questionText, manyChoice} = req.body as {
        questionID: number,
        questionText: string,
        manyChoice: boolean
    };
    if (questionID) {
        AppDataSource.getRepository(Question)
            .findOne({
                where: {
                    id: questionID
                }
            })
            .then((question) => {
                if (question) {
                    question.questionText = questionText;
                    question.hasManyChoice = manyChoice;
                    AppDataSource.getRepository(Question)
                        .save(question)
                        .then((savedQuestion) => {
                            res.status(200).json({question: savedQuestion});
                        })
                        .catch((error) => {
                            console.error("Error saving question", error);
                            res.status(500).json({error: "An error occurred while saving the question."});
                        });
                } else {
                    res.status(404).json({error: "Question not found"});
                }
            })
            .catch((error) => {
                console.error("Error getting question", error);
                res.status(500).json({error: "An error occurred while getting the question."});
            });
    }
});

export default questionRouter;