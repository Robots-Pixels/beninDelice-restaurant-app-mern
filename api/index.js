import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import { menuRouter } from "./routes/menu.route.js";
import cors from "cors";
import path from "path";

dotenv.config();


const __dirname = path.resolve();
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());


// Routes
app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter)
app.use(cors({
  origin: 'http://localhost:5173/',
}))

// Connexion à MongoDB et démarrage du serveur
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");

    // Démarrer le serveur après une connexion réussie à la base de données
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error.message);
});


app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// })