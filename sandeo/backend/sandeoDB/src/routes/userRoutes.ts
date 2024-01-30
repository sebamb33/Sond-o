import express from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const userRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;
// Route pour récupérer les utilisateurs
userRouter.post("/connect", async (req, res) => {
  try {
    console.log("URL:", req.url);
    console.log("Method:", req.method);
    console.log("Body:", req.body);
    const { mail, password } = req.body as { mail: string; password: string };

    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        mail: mail,
        password: password,
      },
    });
    let token = "";
    if (user) {
      token = jwt.sign({ userID: user.id }, jwtSecret);
    }
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des utilisateurs.",
    });
  }
});

//Route pour crée un compte
userRouter.post("/create", async (req, res) => {
  try {
    const { mail, password, firstname, lastname } = req.body as {
      mail: string;
      password: string;
      firstname: string;
      lastname: string;
    };
    console.log("URL:", req.url);
    console.log("Method:", req.method);
    console.log("Body:", req.body);
    const existingUser = await AppDataSource.getRepository("User").findOne({
      where: {
        mail: mail,
      },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Un compte est déjà enregistré avec ce mail." });
    } else {
      const newUser = await AppDataSource.createQueryBuilder()
        .insert()
        .into(User)
        .values({
          firstname: firstname,
          lastname: lastname,
          password: password,
          mail: mail,
        })
        .returning("*")
        .execute();
      const token = jwt.sign(
        { userID: newUser.generatedMaps[0].id },
        jwtSecret
      );
      res.status(201).json({ user: newUser.generatedMaps[0], token });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Une erreur c'est produite durant la création" });
  }
});

// Exportez le routeur
export default userRouter;
