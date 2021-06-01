import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { ChatRoom } from '../models/chatRoom';
import { ChatRoomRepository } from '../repositories/ChatRoomRepository';
import { ProController } from './ProController';
import { UserController } from './userController';

class SurveysController {

    async create(req: Request, res: Response) {
        const {avaliation, userId, proId} = req.body;

        if(!avaliation || !userId || !proId){
            return res.status(400).json({
                Message: "Campos faltando!"
            })
        }

    }

}

export {SurveysController}