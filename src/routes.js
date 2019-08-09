import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

/**
 * @import `authMiddleWare` Middlware de autenticação de usuário
 */
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * @rotas Middleware global `routes.use()` que é executado apenas nas rotas abaixo de sua linha.
 */
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
