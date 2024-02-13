import express from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import { error } from "console";
import userRouter from "./userRoutes";
const formularyRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;

formularyRouter.post('/create', async (req, res) => {
  try {
    console.log('la nouvelle requete',req.body);
    //const {token,name,isPrivate,isNoted} = req.body as {token:string,name:string,isPrivate:boolean,isNoted:boolean};

  }
  catch (error) {
    res.status(500).json({
      error: "Error when formulary create",
    });
  }
});
export default formularyRouter;

