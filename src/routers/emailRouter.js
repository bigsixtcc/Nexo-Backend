import { Router } from "express";
import { enviarEmailTeste } from "../controllers/emailController.js";

const emailRouter = Router();

emailRouter.post("/teste", enviarEmailTeste);

export default emailRouter;