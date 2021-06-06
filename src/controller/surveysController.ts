import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProRepository } from '../repositories/ProRepository';
import { SurveysRepository } from '../repositories/SurveyRepository';
import { UsersRepository } from '../repositories/UsersRepository';
class SurveysController {

    async create(req: Request, res: Response) {
        const { avaliation, userId, proId } = req.body;

        if (!avaliation || !userId || !proId) {
            return res.status(400).json({
                Message: "Campos faltando!"
            })
        }

        const surveyRepository = getCustomRepository(SurveysRepository);
        const usersRepository = getCustomRepository(UsersRepository);
        const proRepository = getCustomRepository(ProRepository);


        const user = await usersRepository.findOne({ id: userId });
        const pro = await proRepository.findOne({ id: proId });

        if (!user) {
            return res.status(400).json({
                Message: "Usuário não encontrado!"
            })
        } else if (!pro) {
            return res.status(400).json({
                Message: "Profissional não encontrado!"
            })
        }

        const survey = await surveyRepository.create({ avaliation, userId, proId });

        const surveySaved = await surveyRepository.save(survey);

        return res.status(201).json(surveySaved);

    }

    async read(req: Request, res: Response) {
        const { id } = req.params;

        const surveyRepository = getCustomRepository(SurveysRepository);

        const survey = await surveyRepository.findOne(id);

        if (!survey) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(survey);

    }



    async update(req: Request, res: Response) {
        //recebe todos os dados do  usuario a ser editado

        const { id } = req.body;

        const surveyRepository = getCustomRepository(SurveysRepository);

        //porem usa apenas o id para localiza-lo no bd
        let survey = await surveyRepository.findOne({
            id
        });

        if (!survey) {
            return res.status(400).json("Avaliação não encontrada");
        }

        const { avaliation = survey.avaliation, userId = survey.userId, proId = survey.proId } = req.body;

        const updatedSurvey = {
            avaliation,
            userId,
            proId
        }


        await surveyRepository.update(id, updatedSurvey)

        return res.json(updatedSurvey);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const surveyRepository = getCustomRepository(SurveysRepository);

        const survey = await surveyRepository.findOne(id);

        if (!survey) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        await surveyRepository.delete(id);

        return res.status(200).json({
            Message: "Sucesso!"
        })

    }

    async show(req: Request, res: Response) {

        const surveyRepository = getCustomRepository(SurveysRepository);

        const surveys = await surveyRepository.find();

        if (!surveys) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(surveys);
    }

}

export { SurveysController };
