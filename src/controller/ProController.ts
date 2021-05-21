import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { Professional } from '../models/Professional';
import { ProRepository } from '../repositories/ProRepository';

class ProController {

    //Criar
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

    //Deletar
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

    //Procurar
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

    //Atualizar
    async update(req: Request, res: Response) {
        //recebe o id do profissional a ser editado
        const { id } = req.body;

        const proRepository = getCustomRepository(ProRepository);

        //usa o id para localiza-lo no bd
        let user = await proRepository.findOne({
            id
        });

        const { name = user.name, idCod = user.idCod, cpf = user.cpf, email = user.email, password = user.password, birthDate = user.birthDate} = req.body;

        if (!user) {
            return res.status(400).json("User not found");
        }

        const updatedPro = {
        name: name, idCod: idCod, cpf: cpf, email: email,
        password: password, birthDate: birthDate
    }

        await proRepository.update(id, updatedPro)


        return res.json(updatedPro);
    }

    //Exibir todos
    async show(request: Request, response: Response) {
        const proRepository = getCustomRepository(ProRepository);

        const all = await proRepository.find();
        response.setHeader("Access-Control-Allow-Origin", "*");
        return response.json(all);
    }

}

export { ProController }