import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ menssage: 'Parabéns você conseguiu seu primeiro!' });
});

export default routes;
