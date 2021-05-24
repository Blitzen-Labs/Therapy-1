import { Router } from 'express';
import { UserController } from './controller/userController';
import { ProController } from './controller/ProController';
import { ChatRoomController } from './controller/ChatRoomController';
import { MessageController } from './controller/MessageController';

//Criação das rotas e dos controladores do usuário e profissional
const router = Router();
const userController = new UserController();
const proController = new ProController();
const chatRoomController = new ChatRoomController();
const messageController = new MessageController();

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



//Sala de chat
router.post('/chat', chatRoomController.create); //Criar
router.delete('/chat/:id', chatRoomController.delete); //Deletar
//router.post('/updateChat', proController.update); //Atualizar
router.get('/chatReadPeople', chatRoomController.readFromPeople); //Ler com base os dois usuários cadastrados no mesmo
router.get('/chat/:id', chatRoomController.read); // Pesquisar (logar)
router.get('/showChat', proController.show); //exibir todos




//Mensagens
router.post('/msg', messageController.create); //Criar
router.delete('/chat/:id', chatRoomController.delete); //Deletar
router.post('/updateChat', proController.update); //Atualizar
router.get('/chatReadPeople', chatRoomController.readFromPeople); //Ler com base os dois usuários cadastrados no mesmo
router.get('/chat/:id', chatRoomController.read); // Pesquisar (logar)
router.get('/showChat', proController.show); //exibir todos











export { router };