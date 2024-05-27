import express from "express";
import {AppDataSource} from "../data-source";
import {Formulary} from "../entity/Formulary";
import jwt, {Secret} from "jsonwebtoken";

const formularyRouter = express.Router();
const jwtSecret: Secret = process.env.JWT_SECRET || "default_secret";

function verifyToken(token: string): Promise<any> {
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

formularyRouter.post("/create", async (req, res) => {
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

    if ("userID" in decoded) {
      const decodedID = { id: decoded.userID };
    }
    if (decoded.hasOwnProperty("userID")) {
      const decodedID = { id: decoded?.userID };
      let newFormulary = new Formulary();
        newFormulary.userId = decodedID.id || 0;
      newFormulary.name = name;
      newFormulary.isPrivate = isPrivate;
      newFormulary.isNoted = isNoted;

      AppDataSource.getRepository(Formulary)
        .save(newFormulary)
        .then((savedFormulary) => {
          console.log("Formulary saved", savedFormulary);
          res.status(200).json({ formulary: savedFormulary });
        })
        .catch((error) => {
          console.error("Error saving formulary", error);
          res
            .status(500)
            .json({ error: "An error occurred while saving the formulary." });
        });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error when formulary create",
    });
  }
});
//for check if user is authorized
formularyRouter.post("/checkIfAuthorized", async (req, res) => {
  try {
    const { token, formulary } = req.body as {
      token: string;
      formulary: number;
    };

    interface DecodedType {
      userID?: number;
    }

    let decoded: DecodedType;
    decoded = await verifyToken(token);

    if ("userID" in decoded) {
      const decodedID = { id: decoded.userID };
    }
    if (decoded.hasOwnProperty("userID")) {
      const decodedID = { id: decoded?.userID };
      const formularyDB = await AppDataSource.getRepository(Formulary).findOne({
        where: {
          id: formulary,
        },
      });
      if (formularyDB) {
        console.log("Formulary found", formularyDB);
        if (formularyDB.userId === decodedID.id) {
          res.status(200).json({ authorized: true });
        } else {
          res.status(200).json({ authorized: false });
        }
      } else {
        res.status(404).json({ error: "Formulary not found" });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Error when permissions is checked",
    });
  }
});
formularyRouter.get("/getFormulary", async (req, res) => {
    try {
        const formularyID = req.query.formularyID;

        if (typeof formularyID !== 'string') {
            return res.status(400).json({error: "Invalid formularyID provided"});
        }

        const formularyIdNumber = parseInt(formularyID, 10);
        if (isNaN(formularyIdNumber)) {
            return res.status(400).json({error: "formularyID must be a number"});
        }

        const formularyDB = await AppDataSource.getRepository(Formulary).findOne({
            where: {
                id: formularyIdNumber
            }
        });

        if (formularyDB) {
            console.log("Formulary found", formularyDB);
            res.status(200).json({formulary: formularyDB});
        } else {
            res.status(404).json({error: "Formulary not found"});
        }

    } catch (error) {
        console.error("Error when getting formulary", error);
        res.status(500).json({
            error: "Error when getting formulary",
            message: error
        });
    }
});
formularyRouter.put("/update", async (req, res) => {
    try {
        console.log('Données reçu', req.body);
        const {formularyID, title, isNoted, isPrivate} = req.body as {
            formularyID: number;
            title: string;
            isNoted: boolean;
            isPrivate: boolean;
        };

        const formularyDB = await AppDataSource.getRepository(Formulary).findOne({
            where: {
                id: formularyID
            }
        });
        if (formularyDB) {
            console.log("Formulary found", formularyDB);
            formularyDB.name = title;
            formularyDB.isNoted = isNoted;
            formularyDB.isPrivate = isPrivate;
            await AppDataSource.getRepository(Formulary).save(formularyDB);
            res.status(200).json({formulary: formularyDB});
        }
    } catch (error) {
        res.status(500).json({
            error: "Error when formulary update",
        });
    }
});

//Get all formularies from user id

formularyRouter.post("/getAll", async (req, res) => {

    try {
        const {token} = req.body as { token: string };

        interface DecodedType {
            userID?: number;
        }

        let decoded: DecodedType;
        decoded = await verifyToken(token);
        const formularies = await AppDataSource.getRepository(Formulary).find({where: {userId: decoded.userID}});
        res.status(200).json(formularies);
    } catch (error) {
        res.status(500).json({
            error: "Error when getting formularies",
        });
    }
});


export default formularyRouter;
