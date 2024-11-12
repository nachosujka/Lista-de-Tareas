import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import tareasRouter from "./routes/tareas.router.js";
const app = express();
dotenv.config();

const uriConexion = process.env.URIMONGO;
mongoose.connect(uriConexion);

app.use(express.json()); //fundamental para trabajar con json y recibir correctamente archivos del body
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(8080, () => {
  console.log("Servidor iniciado");
});
app.use("/tareas", tareasRouter);
