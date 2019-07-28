import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Lucas Pedro',
    email: 'lucaspedro@gmail.com',
    password_hash: '1234567',
  });

  res.json(user);
});

export default routes;
