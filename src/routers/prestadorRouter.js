import express from 'express';
import {createPrestador} from '../controllers/prestadorController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const prestadorRoutes = express.Router();

prestadorRoutes.post("/perfil", authMiddleware,createPrestador);

export default prestadorRoutes;