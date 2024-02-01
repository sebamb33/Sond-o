import { AppDataSource } from "./data-source";
import express from "express";
import route from "./routes/route";
import cors from "cors";
require("dotenv").config();
console.log(process.env.JWT_SECRET);
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
//cors
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());

//import route
app.use("/api", route);
const port = process.env.PORT || 3000; // Port par défaut : 3000
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
