import express from "express";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { error } from "console";
import { Formulary } from "../entity/Formulary";
const formularyRouter = express.Router();
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
formularyRouter.post('/create', async (req, res) => {
  try {

      const { token, name, isPrivate, isNoted } = req.body as {
          token: string;
          name: string;
          isPrivate: boolean;
          isNoted: boolean;
      };
      interface DecodedType {
          userID?: number;
      }

      let decoded: DecodedType;
      decoded = await verifyToken(token);

      if ('userID' in decoded) {
          const decodedID = { id: decoded.userID }; // Pas besoin d'utiliser ? ou ! ici
      }
    if(decoded.hasOwnProperty('userID')){
        const decodedID = {id: decoded?.userID};
        let newFormulary = new Formulary();
        newFormulary.userId= decodedID.id;
        newFormulary.name = name;
        newFormulary.isPrivate = isPrivate;
        newFormulary.isNoted = isNoted;

        AppDataSource.getRepository(Formulary).save(newFormulary)
            .then((savedFormulary) => {
                console.log('Formulary saved', savedFormulary);
                res.status(200).json({formulary: savedFormulary});
            })
            .catch((error) => {
                console.error('Error saving formulary', error);
                res.status(500).json({error: "An error occurred while saving the formulary."});
            });
    }
  }
  catch (error) {
    res.status(500).json({
      error: "Error when formulary create",
    });
  }
});
export default formularyRouter;

