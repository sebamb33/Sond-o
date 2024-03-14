import express from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import { error } from "console";

dotenv.config();
const salt: number = 10;
const userRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;

const hashPassword = async (password: any) => {
  return bcrypt.hash(password, salt);
};

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
// Route pour récupérer les utilisateurs
userRouter.post("/connect", async (req, res) => {
  try {
    const { mail, password } = req.body as { mail: string; password: string };
    console.log(req.body);

    let user = await AppDataSource.getRepository(User).findOne({
      where: {
        mail: mail,
      },
    });
    let token = "";
    if (user) {
      //Pick a hashed password in database
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          token = jwt.sign({ userID: user.id }, jwtSecret);
          //Delete the password return for front
          delete user.password;
          res.json({ user, token });
        } else {
          res.status(401).json({
            error: "password not wrong",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error when user connect",
    });
  }
});

//Route pour crée un compte
userRouter.post("/create", async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body as {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    };

    let hashedPassword = "";
    if (password && typeof password === "string") {
      hashedPassword = await hashPassword(password);
    }
    const existingUser = await AppDataSource.getRepository("User").findOne({
      where: {
        mail: email,
      },
    });
    if (existingUser) {
      return res.status(409).json({ error: "Account with this mail" });
    } else {
      const newUser = await AppDataSource.createQueryBuilder()
        .insert()
        .into(User)
        .values({
          firstname: firstname,
          lastname: lastname,
          password: hashedPassword,
          mail: email,
        })
        .execute();
      const userId = newUser.identifiers[0].id;
      const token = jwt.sign({ userID: userId }, jwtSecret);

      const insertedUser = await AppDataSource.getRepository("User").findOne({
        where: {
          id: userId,
        },
      });
      console.log(insertedUser);
      //Retour de l'utilisateur
      res.status(201).json({ user: insertedUser, token });
    }
  } catch (error) {
    res.status(500).json({ error: "Error when make user" });
  }
});

//Route pour vérifier token
userRouter.post("/verifyToken", async (req, res) => {
  try {
    if (req.body.token) {
      const decodedToken = await verifyToken(req.body.token);
      if (decodedToken.hasOwnProperty("userID")) {
        interface Token {
          userID: number;
        }
        const userID: number = (decodedToken as Token).userID;

        const user = await AppDataSource.getRepository("User").findOne({
          where: {
            id: userID,
          },
        });
        if (user) {
          //remove password
          delete user.password;
        }
        res.status(200).json({ user });
      }
    } else {
      res.status(401).json({
        error: "Token invalid",
      });
    }
  } catch (Error) {
    res.status(500).json({
      error: "Problem when check token",
    });
  }
});

//Pour mettre à jour un utilisateur

userRouter.put("/update", async (req, res) => {
  try {
    const { firstname, lastname, mail, password } = req.body?.userData as {
      token: string;
      firstname: string;
      lastname: string;
      mail: string;
      password: string;
    };
    const token = req.body?.token;

    if (token) {
      const decodedToken = await verifyToken(token);
      if (decodedToken.hasOwnProperty("userID")) {
        interface Token {
          userID: number;
        }

        const userID: number = (decodedToken as Token).userID;

        const user = await AppDataSource.getRepository("User").findOne({
          where: {
            id: userID,
          },
        });
        if (user) {
          if (firstname && firstname.length > 0) {
            user.firstname = firstname;
          }
          if (lastname && lastname.length > 0) {
            user.lastname = lastname;
          }
          console.log("mail", mail);
          if (mail && mail.length > 0) {
            //check if mail is not already used and is not the id of the user
            const existingUser = await AppDataSource.getRepository(User)
              .createQueryBuilder("user")
              .where("user.mail = :mail", { mail })
              .andWhere("user.id != :id", { id: userID })
              .getOne();

            if (existingUser) {
              return res
                .status(409)
                .json({ message: "Account with this mail" });
            } else {
              user.mail = mail;
            }
          }
          if (password && password.length > 0) {
            user.password = await hashPassword(password);
          }

          await AppDataSource.getRepository("User").save(user);
          res.status(200).json({ user });
        }
      }
    }
  } catch {
    return res.status(500).json({ error: "Error when update user" });
  }
});
// Exportez le routeur
export default userRouter;
