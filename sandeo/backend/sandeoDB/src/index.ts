import { AppDataSource } from "./data-source";
import express from "express";
import userRouter from "./routes/userRoutes";
const app = express();
AppDataSource.initialize()
  .then(async () => {
    console.log("Relation avec la base de donnée effectué");
  })
  .catch((error) => console.log(error));

// Express server
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
//import route
app.use("/user", userRouter);
const port = process.env.PORT || 3000; // Port par défaut : 3000
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
