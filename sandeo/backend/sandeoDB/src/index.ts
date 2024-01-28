import { AppDataSource } from "./data-source";
import express from "express";
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
const port = process.env.PORT || 3000; // Port par défaut : 3000
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
