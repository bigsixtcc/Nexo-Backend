import express from 'express';
import agendamentoController from '../controllers/agendamentoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const agendamentoRouter = express.Router()

agendamentoRouter.post('/marcando',authMiddleware, agendamentoController.create)

export default agendamentoRouter;