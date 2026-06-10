import express from 'express';
import {createPrestador,me} from '../controllers/prestadorController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const prestadorRoutes = express.Router();

prestadorRoutes.post("/perfil", authMiddleware,createPrestador);
prestadorRoutes.get("/me", authMiddleware,me);

export default prestadorRoutes;