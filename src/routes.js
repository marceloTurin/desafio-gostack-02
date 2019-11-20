import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Todas as rotas abaixo usarão esse middleware de autenticação
routes.use(authMiddleware);

routes.post('/student', StudentController.store);
routes.put('/student', StudentController.update);

export default routes;
