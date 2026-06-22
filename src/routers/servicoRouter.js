import express from "express";
import servicoController from "../controllers/servicoController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploads.js";

const servicoRouters = express.Router();

servicoRouters.post("/criacao",authMiddleware,upload.single("imagem"),servicoController.create);

export default servicoRouters;