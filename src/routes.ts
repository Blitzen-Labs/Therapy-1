import { Router } from 'express';
import { UserController } from './controller/userController';
import { ProController } from './controller/ProController';

const router = Router();
const userController = new UserController();
const proController = new ProController();

router.post('/user', userController.create); //Criar
router.delete('/user/:id', userController.delete); //Deletar
router.post('/updateuser', userController.update); //Atualizar

router.get('/user', userController.search); // Pesquisar (logar)
router.get('/show', userController.show); //exibir todos



//Professional
router.post('/pro', proController.create);







router.get('/', (req, res) => {
    return res.json({
        "message": "Server started!"
    })
});


export { router };