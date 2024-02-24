import express from "express";
import {AppDataSource} from "../data-source";
import {Question} from "../entity/Question";


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

export default questionRouter;