import express from 'express';
import {register,login} from '../controllers/authController.js';
import { verificarEmail } from '../controllers/emailController.js';
import { refreshAutentification } from '../controllers/authController.js';
import { deleteUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.delete('/auth/apagar', deleteUser)
router.get('/auth/verificar-email', verificarEmail);
router.get('/auth/refresh-email',refreshAutentification);
export default router;
