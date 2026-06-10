import express from 'express';
import router from './routers/userRouter.js';
import prestadorRouters from './routers/prestadorRouter.js'
import prestadorService from './service/prestadorService.js';
import servicoRouters from './routers/servicoRouter.js';

const app = express();

app.use(express.json());
app.use('/user', router);
app.use("/prestador", prestadorRouters);
app.use("/servico", servicoRouters);

export default app;