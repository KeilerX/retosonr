import { Router } from 'express';
import auth from './auth';
import user from './user';
import vehicle from './vehicle';
import observation from './observation';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/vehicles', vehicle);
routes.use('/observations', observation);

export default routes;