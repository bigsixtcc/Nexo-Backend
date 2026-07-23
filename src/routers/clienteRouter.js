import express from 'express';
import {me, update, remove} from '../controllers/clienteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const clienteRouter = express.Router();

clienteRouter.get("/me", authMiddleware, me);

clienteRouter.put("/update", authMiddleware, update);

clienteRouter.delete("/remove", authMiddleware, remove);

export default clienteRouter;