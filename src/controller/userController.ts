import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {



    async create(req: Request, res: Response) {
        const { name, cpf, email, password, birthDate } = req.body;

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
            name, cpf, email, password, birthDate
        });

        await usersRepository.save(user);


        return res.json(user);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;


        const usersRepository = getCustomRepository(UsersRepository);
        usersRepository.delete({ id });


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

        if (!user) {
            return res.status(400).json("User not found");
        } else {
            return res.json(user);
        }
    }

}

export { UserController }