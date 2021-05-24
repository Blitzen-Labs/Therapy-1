import { Request, response, Response } from 'express';
import { createQueryBuilder, getCustomRepository, getRepository } from 'typeorm';
import { ChatRoom } from '../models/chatRoom';
import { ChatRoomRepository } from '../repositories/ChatRoomRepository';
import { MessageRepository } from '../repositories/MessageRepository';
import { ChatRoomController } from './ChatRoomController';
import { ProController } from './ProController';
import { UserController } from './userController';

class MessageController {
    async create(req: Request, res: Response) {
        const { nickname, message, chatRoomId } = req.body;

        if (!nickname || !message || !chatRoomId) {
            return res.status(400).json({
                Message: "Campo(s) faltando!"
            })
        }

        const chatController = new ChatRoomController();

        const chat = await chatController.readFromId(chatRoomId);

        if (!chat) {
            return res.status(400).json({
                Message: "Sala de chat não existe!"
            })
        }

        const messageRepository = getCustomRepository(MessageRepository);

        const messageSaved = await messageRepository.create({
            nickname,
            message,
            chatRoomId
        })

        messageRepository.save(messageSaved);

        return res.status(201).json(messageSaved);

    }

    async createLog(nickname: any, message: any, chatRoomId: any) {
        if (!nickname || !message || !chatRoomId) {
            return "Campo(s) faltando!";
        }

        const chatController = new ChatRoomController();

        const chat = await chatController.readFromId(chatRoomId);

        if (!chat) {
            return "Sala de chat não existe!"
        }

        const messageRepository = getCustomRepository(MessageRepository);

        const messageSaved = await messageRepository.create({
            nickname,
            message,
            chatRoomId
        })

        messageRepository.save(messageSaved);

        return "Sucesso!";

    }


}

export { MessageController };