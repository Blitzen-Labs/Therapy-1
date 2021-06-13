import { Router, Request, Response } from 'express';
import { UserController } from './controller/userController';
import { ProController } from './controller/ProController';
import { ChatRoomController } from './controller/ChatRoomController';
import { MessageController } from './controller/MessageController';
import { SurveysController } from './controller/surveysController';
import { SolicitationController } from './controller/SolicitationController';

//Criação das rotas e dos controladores do usuário e profissional
const router = Router();
const userController = new UserController();
const proController = new ProController();
const chatRoomController = new ChatRoomController();
const messageController = new MessageController();
const surveyController = new SurveysController();
const solicitationController = new SolicitationController();

router.post('/user', userController.create); //Criar
router.delete('/user/:id', userController.delete); //Deletar
router.post('/updateuser', userController.update); //Atualizar
router.get('/user', userController.search); // Pesquisar (logar)
router.get('/show', userController.show); //exibir todos



//Profissional
router.post('/pro', proController.create); //Criar
router.delete('/pro/:id', proController.delete); //Deletar
router.delete('/pro/', (req: Request, res: Response) => {
    return res.status(400).json({
        Message: "Id não encontrado"
    })
}); //Erro caso falte id
router.post('/updatepro', proController.update); //Atualizar
router.get('/pro/', proController.search); // Pesquisar (logar)
router.get('/showPro', proController.show); //exibir todos



//Sala de chat
router.post('/chat', chatRoomController.create); //Criar
router.delete('/chat/:id', chatRoomController.delete); //Deletar
router.post('/updateChat', chatRoomController.update); //Atualizar
router.get('/chatReadPeople', chatRoomController.readFromPeople); //Ler com base os dois usuários cadastrados no mesmo
router.get('/chat/:id', chatRoomController.read); // Pesquisar
router.get('/showChat', chatRoomController.show); //exibir todos




//Mensagens
router.post('/message', messageController.create); //Criar
router.delete('/message/:id', messageController.delete); //Deletar
router.post('/updateMsg', messageController.update); //Atualizar
router.get('/message/:id', messageController.read); // Pesquisar
router.get('/messageByChat/:chatRoomId', messageController.readByChat); // Pesquisar as mensagens de um chat especifico
router.get('/showMsg', messageController.show); //exibir todos



//Survey
router.post('/survey', surveyController.create); //Criar
router.delete('/survey/:id', surveyController.delete); //Deletar
router.post('/updateSurvey', surveyController.update); //Atualizar
router.get('/survey/:id', surveyController.read); // Pesquisar
router.get('/showSurvey', surveyController.show); //exibir todos



//Solicitation
router.post('/solicitation', solicitationController.create); //Criar
router.delete('/solicitation/:id', solicitationController.delete); //Deletar
router.post('/updatesolicitation', solicitationController.update); //Atualizar
router.get('/solicitation/:id', solicitationController.read); // Pesquisar
router.get('/showsolicitation', solicitationController.show); //exibir todos








export { router };