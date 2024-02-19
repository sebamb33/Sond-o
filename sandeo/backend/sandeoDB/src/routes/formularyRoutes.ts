import express from "express";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
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
      newFormulary.userId = decodedID.id;
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

export default formularyRouter;
