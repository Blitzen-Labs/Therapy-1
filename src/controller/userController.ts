import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {




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

    async update(req: Request, res: Response) {
        //recebe todos os dados do  usuario a ser editado
        const { id, name, cpf, email, password, birthDate, city, state } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);

        //porem usa apenas o id para localiza-lo no bd
        let user = await usersRepository.findOne({
            id
        });

        if (!user) {
            return res.status(400).json("User not found");
        }



        user.name == name ? user.name = user.name : user.name = name;
        user.cpf == cpf ? user.cpf = user.cpf : user.cpf = cpf;
        user.email == email ? user.email = user.email : user.email = email;
        user.password == password ? user.password = user.password : user.password = password;
        user.birthDate == birthDate ? user.birthDate = user.birthDate : user.birthDate = birthDate;
        user.city == city ? user.city = user.city : user.city = city;
        user.state == state ? user.state = user.state : user.state = state;


        await usersRepository.update(id, {
            name: user.name, cpf: user.cpf, email: user.email,
            password: user.password, birthDate: user.birthDate
        })


        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(user);
    }


    async show(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const all = await usersRepository.find();
        response.setHeader("Access-Control-Allow-Origin", "*");
        return response.json(all);
    }

}

export { UserController }