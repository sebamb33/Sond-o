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

// Exportez le routeur
export default userRouter;
