import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { Professional } from '../models/Professional';
import { ProRepository } from '../repositories/ProRepository';

class ProController {

    //Criar
    async create(req: Request, res: Response) {
        const { name, idCod, cpf, email, password, birthDate } = req.body;

        if (!name || !idCod || !cpf || !email || !password || !birthDate) {
            return res.status(400).json({
                Message: "Campo(s) faltando"
            })
        }

        const proRepository = getCustomRepository(ProRepository);

        const userAlreadyExist = await proRepository.findOne({
            email
        })


        if (userAlreadyExist) {
            return res.status(400).json({
                Message: "email already in use"
            })
        }

        const user = proRepository.create({
            name, idCod, cpf, email, password, birthDate
        });

        await proRepository.save(user);


        return res.status(201).json(user);
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
                Message: "Usuário não encontrado!"
            });
        }

        proRepository.delete({ id });


        return res.json({
            Message: "sucess"
        });
    }

    //Procurar
    async search(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                Message: "Campo email não encontrado!"
            })
        } else if (!password) {
            return res.status(400).json({
                Message: "Campo senha não encontrado!"
            })
        }

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

        if (!id) {
            return res.status(400).json({
                Message: "Campo id não encontrado!"
            })
        }

        const proRepository = getCustomRepository(ProRepository);

        //usa o id para localiza-lo no bd
        let user = await proRepository.findOne({
            id
        });

        const { name = user.name, idCod = user.idCod, cpf = user.cpf, email = user.email, password = user.password, birthDate = user.birthDate } = req.body;

        if (!user) {
            return res.status(400).json({
                Message: "Usuário não encontrado!"
            });
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
        return response.json(all);
    }

    async readFromId(id: any) {
        const proRepository = getCustomRepository(ProRepository);

        const pro = await proRepository.findOne({ id });

        return pro;

    }

}

export { ProController }