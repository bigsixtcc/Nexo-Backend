import express from 'express';
import router from './routers/userRouter.js';
import prestadorRouters from './routers/prestadorRouter.js'
import prestadorService from './service/prestadorService.js';
import servicoRouters from './routers/servicoRouter.js';
import clienteRouter from './routers/clienteRouter.js';
import emailRouter from './routers/emailRouter.js';
import path from "path";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"))
app.use('/user', router);
app.use("/prestador", prestadorRouters);
app.use("/cliente", clienteRouter);
app.use("/servico", servicoRouters);
app.use("/email", emailRouter);

export default app;