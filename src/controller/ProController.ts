import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { Professional } from '../models/Professional';
import { ProRepository } from '../repositories/ProRepository';

class ProController {

    async create(req: Request, res: Response) {
        const { name, idCod, cpf, email, password, birthDate } = req.body;

        const proRepository = getCustomRepository(ProRepository);

        const userAlreadyExist = await proRepository.findOne({
            email
        })


        if (userAlreadyExist) {
            return res.status(400).json({
                error: "email already in use"
            })
        }

        const user = proRepository.create({
            name, idCod, cpf, email, password, birthDate
        });

        await proRepository.save(user);


        return res.json(user);
    }

    async delete(req: Request, res: Response, params) {

        const { id } = req.params;
        const proRepository = getCustomRepository(ProRepository);
        const userExist = await proRepository.findOne({
            id
        });

        if (!userExist) {
            return res.json({
                "message": "User not found"
            });
        }

        proRepository.delete({ id });


        return res.json({
            "message": "sucess"
        });
    }

    async search(req: Request, res: Response) {
        const { email, password } = req.body;

        const proRepository = getCustomRepository(ProRepository);

        const user = await proRepository.findOne({
            email, password
        });

        if (!user) {
            return res.status(400).json("User not found");
        } else {
            return res.json(user);
        }
    }

    async update(req: Request, res: Response) {
        //recebe todos os dados do  usuario a ser editado
        const { id, name, idCod, cpf, email, password, birthDate } = req.body;

        const proRepository = getCustomRepository(ProRepository);

        //porem usa apenas o id para localiza-lo no bd
        let user = await proRepository.findOne({
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
        user.idCod == idCod ? user.idCod = user.idCod : user.idCod = idCod;


        await proRepository.update(id, {
            name: user.name, idCod: user.idCod, cpf: user.cpf, email: user.email,
            password: user.password, birthDate: user.birthDate
        })


        return res.json(user);
    }


    async show(request: Request, response: Response) {
        const proRepository = getCustomRepository(ProRepository);

        const all = await proRepository.find();
        response.setHeader("Access-Control-Allow-Origin", "*");
        return response.json(all);
    }

}

export { ProController }