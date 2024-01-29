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
    const { mail, password } = req.query as { mail: string; password: string };
    console.log(mail);
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        mail: mail,
        password: password,
      },
    });
    let token = jwtSecret;
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

// Route pour créer un utilisateur
userRouter.get("/create", async (req, res) => {
  const { mail, password, firstname, lastname } = req.query as {
    mail: string;
    password: string;
    firstname: string;
    lastname: string;
  };
  try {
    res.json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de l'utilisateur.",
    });
  }
});

userRouter.get("/update", async (req, res) => {
  try {
    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
    });
  }
});

// Exportez le routeur
export default userRouter;
