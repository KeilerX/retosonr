import { Router } from 'express';
import UserController from '../controllers/userController';
import { checkJwt } from './../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], UserController.getUsers);
router.get('/:id', [checkJwt], UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', [checkJwt], UserController.editUser);
router.delete('/:id', [checkJwt], UserController.deleteUser);

export default router;