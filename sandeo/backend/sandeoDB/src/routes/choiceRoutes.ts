import express from "express";
import {AppDataSource} from "../data-source";
import {Question} from "../entity/Question";
import {Choice} from "../entity/Choice";

const choiceRouter = express.Router();
choiceRouter.post("/create", async (req, res) => {
    try {
        const {choice, questionID} = req.body as {
            choice: string;
            questionID: number;
        };
        AppDataSource.getRepository(choice)
            .save({choice: choice, questionID: questionID})
            .then((savedChoice) => {
                console.log("Choice saved", savedChoice);
                res.status(200).json({choice: savedChoice});
            })
            .catch((error) => {
                console.error("Error saving choice", error);
                res
                    .status(500)
                    .json({error: "An error occurred while saving the choice."});
            });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while saving the choice.",
        });
    }
});

choiceRouter.post("/getAll", async (req, res) => {
    try {
        const {formularyID} = req.body as {
            formularyID: number;
        };
        const questions = await AppDataSource.getRepository(Question).find({
            where: {formularyId: formularyID},
            order: {order: "ASC"}
        });

        //Pick all choices for each question
        let choices: Choice[] = [];
        for (let question of questions) {
            choices = await AppDataSource.getRepository(Choice).find({where: {questionId: question.id}});
        }
        console.log('Les choix : ', choices);
        res.status(200).json({questions: questions, choices: choices});
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching the choices.",
        });
    }
});
choiceRouter.delete("/delete", async (req, res) => {
    try {
        const {choiceID} = req.body as {
            choiceID: number;
        };
        const choice = await AppDataSource.getRepository(Choice).findOne({where: {id: choiceID}});
        if (choice) {
            await AppDataSource.getRepository(Choice).remove(choice);
            res.status(200).json({message: "Choice deleted"});
        } else {
            res.status(404).json({error: "Choice not found"});
        }
    } catch (error) {
    }
});

choiceRouter.put("/update", async (req, res) => {
    try {
        const {choiceID, choiceText, goodResponse} = req.body as {
            choiceID: number;
            choiceText: string;
            goodResponse: boolean;
        };
        const choiceDB = await AppDataSource.getRepository(Choice).findOne({where: {id: choiceID}});
        if (choiceDB) {
            choiceDB.choiceText = choiceText;
            choiceDB.goodResponse = goodResponse;
            await AppDataSource.getRepository(Choice).save(choiceDB);
            res.status(200).json({choice: choiceDB});
        } else {
            res.status(404).json({error: "Choice not found"});
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while updating the choice.",
        });
    }
});
export default choiceRouter;