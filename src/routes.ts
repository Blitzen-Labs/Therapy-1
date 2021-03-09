import { Router } from 'express';
import { UserController } from './controller/userController';

const router = Router();
const userController = new UserController();

router.post('/user', userController.create);
router.post('/delete', userController.delete);

router.get('/search', userController.search);


export { router };