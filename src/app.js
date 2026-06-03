import express from 'express';
import router from './routers/userRouter.js';
import prestadorRouters from './routers/prestadorRouter.js'
import prestadorService from './service/prestadorService.js';

const app = express();

app.use(express.json());
app.use('/user', router);
app.use("/prestador", prestadorRouters);

export default app;