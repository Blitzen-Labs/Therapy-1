import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {



    //Criar
    async create(req: Request, res: Response) {
        const { name, cpf, email, password, birthDate, city, state } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExist = await usersRepository.findOne({
            email
        })


        if (userAlreadyExist) {
            return res.status(400).json({
                error: "email already in use"
            })
        }

        const user = usersRepository.create({
            name, cpf, email, password, birthDate, city, state
        });

        await usersRepository.save(user);


        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(user);
    }

    //Apagar
    async delete(req: Request, res: Response, params) {

        const { id } = req.params;
        const usersRepository = getCustomRepository(UsersRepository);
        const userExist = await usersRepository.findOne({
            id
        });

        if (!userExist) {
            return res.json({
                "message": "User not found"
            });
        }

        usersRepository.delete({ id });


        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({
            "message": "sucess"
        });
    }

    //Procurar
    async search(req: Request, res: Response) {
        const { email, password } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            email, password
        });

        res.setHeader("Access-Control-Allow-Origin", "*");
        if (!user) {
            return res.status(200).json("User not found");
        } else {
            return res.json(user);
        }
    }

    //Atualizar
    async update(req: Request, res: Response) {
        //recebe todos os dados do  usuario a ser editado

        const { id } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);

        //porem usa apenas o id para localiza-lo no bd
        let user = await usersRepository.findOne({
            id
        });

        const { name = user.name, cpf = user.cpf, email = user.email, password = user.password, birthDate = user.birthDate, city = user.city, state = user.state } = req.body;

        if (!user) {
            return res.status(400).json("User not found");
        }

        const updatedUser = {
            name: name, cpf: cpf, email: email,
            password: password, birthDate: birthDate
        }


        await usersRepository.update(id, updatedUser)


        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(updatedUser);
    }

    async readFromId(id: any) {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ id });

        return user;
    }


    //Exibir todos
    async show(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const all = await usersRepository.find();
        response.setHeader("Access-Control-Allow-Origin", "*");
        return response.json(all);
    }

}

export { UserController }