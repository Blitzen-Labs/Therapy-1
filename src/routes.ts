import { Router } from 'express';
import { UserController } from './controller/userController';

const router = Router();
const userController = new UserController();

router.post('/user', userController.create); //Criar
router.delete('/delete/:id', userController.delete); //Deletar
router.post('/update', userController.update); //Atualizar

router.get('/search', userController.search); // Pesquisar (logar)
router.get('/show', userController.show); //exibir todos
router.get('/', (req, res) => {
    return res.json({
        "message": "Server started!"
    })
});


export { router };