import express from "express";
import {AppDataSource} from "../data-source";
import jwt from "jsonwebtoken";
import {Question} from "../entity/Question";


const questionRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

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

export default questionRouter;