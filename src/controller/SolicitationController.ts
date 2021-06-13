import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProRepository } from '../repositories/ProRepository';
import { SolicitationRepository } from '../repositories/SolicitationRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class SolicitationController {
    async create(req: Request, res: Response) {
        const { requestDate, obsUser, professionalAnswer, obsProfessional, userId, proId } = req.body;

        if (!requestDate || !userId || !proId) {
            return res.status(400).json({
                Message: "Campo(s) faltando!"
            })
        }

        const userRepository = getCustomRepository(UsersRepository);
        const proRepository = getCustomRepository(ProRepository);
        const solicitationRepository = getCustomRepository(SolicitationRepository);

        const user = await userRepository.findOne({ id: userId });

        if (!user) {
            return res.status(400).json({
                Message: "Usuário não encontrado!"
            })
        }

        const pro = await proRepository.findOne({ id: proId });

        if (!pro) {
            return res.status(400).json({
                Message: "Profissional não encontrado!"
            })
        }

        const solicitationSaved = await solicitationRepository.create({
            requestDate,
            obsUser,
            professionalAnswer,
            obsProfessional,
            userId,
            proId
        })

        solicitationRepository.save(solicitationSaved);

        return res.status(201).json(solicitationSaved);

    }


    async read(req: Request, res: Response) {
        const { id } = req.params;

        const solicitationRepository = getCustomRepository(SolicitationRepository);

        const solicitation = await solicitationRepository.findOne({ id });

        if (!solicitation) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(solicitation);
    }


    async update(req: Request, res: Response) {
        //recebe todos os dados do  usuario a ser editado

        const { id } = req.body;

        const solicitationRepository = getCustomRepository(SolicitationRepository);

        const solicitation = await solicitationRepository.findOne({ id });

        if (!solicitation) {
            return res.status(400).json({
                Message: "Solicitação não encontrada"
            });
        }

        const { obsProfessional = solicitation.obsProfessional, obsUser = solicitation.obsUser, proId = solicitation.proId, professionalAnswer = solicitation.professionalAnswer, requestDate = solicitation.requestDate, userId = solicitation.userId } = req.body;

        const updatedSolicitation = {
            requestDate,
            obsUser,
            professionalAnswer,
            obsProfessional,
            userId,
            proId
        }


        await solicitationRepository.update(id, updatedSolicitation)


        return res.json(updatedSolicitation);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const solicitationRepository = getCustomRepository(SolicitationRepository);

        const solicitation = await solicitationRepository.findOne(id);


        if (!solicitation) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        await solicitationRepository.delete({ id });

        return res.status(200).json({
            Message: "Sucesso!"
        });

    }

    async show(req: Request, res: Response) {
        const solicitationRepository = getCustomRepository(SolicitationRepository);

        const all = await solicitationRepository.find();

        if (!all) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(all);
    }


}

export { SolicitationController };
