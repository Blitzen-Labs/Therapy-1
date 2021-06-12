import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { ChatRoom } from '../models/chatRoom';
import { ChatRoomRepository } from '../repositories/ChatRoomRepository';
import { ProController } from './ProController';
import { UserController } from './userController';

class ChatRoomController {

    async create(req: Request, res: Response) {
        const { userId, proId } = req.body;

        if (!userId || !proId) {
            return res.status(406).json({
                Message: "Campo(s) faltando!"
            })
        }


        const proController = new ProController();

        const userController = new UserController();

        const pro = await proController.readFromId(proId);

        const user = await userController.readFromId(userId);

        if (!pro) {
            return res.status(400).json({
                Message: "Profissional não encontrado"
            })
        } else if (!user) {
            return res.status(400).json({
                Message: "Usuário não encontrado"
            })
        }


        const chatRoomRepository = getCustomRepository(ChatRoomRepository);

        const chatRoomSaved = await chatRoomRepository.create({
            userId,
            proId
        })

        chatRoomRepository.save(chatRoomSaved);

        return res.status(201).json({
            chatRoomSaved
        })

    }

    async read(req: Request, res: Response) {
        const { id } = req.params;

        const chatRoomRepository = getCustomRepository(ChatRoomRepository);

        const chat = await chatRoomRepository.findOne(id);

        if (!chat) {
            return res.status(406).json({
                Message: "Chat não encontrado!"
            })
        }


        return res.status(200).json(chat);

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const chatRoomRepository = getCustomRepository(ChatRoomRepository);

        const chat = await chatRoomRepository.findOne(id);

        if (!chat) {
            return res.status(406).json({
                Message: "Chat não encontrado!"
            })
        }

        chatRoomRepository.delete({ id });


        return res.status(200).json({
            Message: "Sucesso!"
        })

    }

    async readFromPeople(req: Request, res: Response) {
        const { userId, proId } = req.body;

        if (!userId || !proId) {
            return res.status(400).json({
                Message: "Campo(s) faltando!"
            })
        }

        const chatRoomRepository = getCustomRepository(ChatRoomRepository);

        const chat = await chatRoomRepository.findOne({ userId, proId });

        if (!chat) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(chat);


    }

    async readFromId(id: any) {

        const chatRoomRepository = getCustomRepository(ChatRoomRepository);

        const chat = await chatRoomRepository.findOne(id);

        return chat;
    }

    async show(req: Request, res: Response) {
        const chatRoomRepository = getCustomRepository(ChatRoomRepository);
        
        const chat = await chatRoomRepository.find();

        return chat;
    }

}

export { ChatRoomController }