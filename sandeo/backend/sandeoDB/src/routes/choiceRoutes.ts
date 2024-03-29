import express from "express";
import {AppDataSource} from "../data-source";
import {Choice} from "../entity/Choice";

const choiceRouter = express.Router();
choiceRouter.post("/create", async (req, res) => {
    try {
        const {choice, questionID, goodResponse} = req.body as {
            choice: string;
            goodResponse: boolean;
            questionID: number;
        };
        console.log('Les choix : ', req.body);
        const choiceRepository = AppDataSource.getRepository(Choice);

        const newChoice = new Choice();
        newChoice.choiceText = choice;
        newChoice.questionId = questionID;
        newChoice.goodResponse = goodResponse;

        const savedChoice = await choiceRepository.save(newChoice);
        console.log('choix sauvegardé : ', savedChoice);
        res.status(200).json({choice: savedChoice});
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while saving the choice.",
        });
    }
});

choiceRouter.post("/getAll", async (req, res) => {
    try {
        const {questionID} = req.body as {
            questionID: number;
        };
        console.log('id des questions ', questionID);
        const choices = await AppDataSource.getRepository(Choice).find({
            where: {questionId: questionID},
        });

        console.log('Les choix : ', choices);
        res.status(200).json({choices: choices});
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