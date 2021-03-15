import { Router } from 'express';
import { UserController } from './controller/userController';

const router = Router();
const userController = new UserController();

router.post('/user', userController.create);
router.delete('/delete/:id', userController.delete);
router.post('/update', userController.update);

router.get('/search', userController.search);
router.get('/show', userController.show);


export { router };