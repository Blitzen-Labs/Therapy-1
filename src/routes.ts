import { Router } from 'express';
import { UserController } from './controller/userController';
import { ProController } from './controller/ProController';

//Criação das rotas e dos controladores do usuário e profissional
const router = Router();
const userController = new UserController();
const proController = new ProController();

router.post('/user', userController.create); //Criar
router.delete('/user/:id', userController.delete); //Deletar
router.post('/updateuser', userController.update); //Atualizar

router.get('/user', userController.search); // Pesquisar (logar)
router.get('/show', userController.show); //exibir todos



//Professional
router.post('/pro', proController.create); //Criar
router.delete('/pro/:id', proController.delete); //Deletar
router.post('/updatepro', proController.update); //Atualizar

router.get('/pro', proController.search); // Pesquisar (logar)
router.get('/showPro', proController.show); //exibir todos











export { router };