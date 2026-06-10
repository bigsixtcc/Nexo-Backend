import express from 'express';
import servicoController from '../controllers/servicoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const servicoRouters = express.Router();

servicoRouters.post("/criacao",authMiddleware,servicoController.create );

export default servicoRouters;