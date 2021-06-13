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

    async read(req: Request, res: Response) {
        const { id } = req.params;

        const messageRepository = getCustomRepository(MessageRepository);

        const message = await messageRepository.findOne({ id });

        if (!message) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(message);
    }

    async readByChat(req: Request, res: Response) {
        const { chatRoomId } = req.params;

        const messageRepository = getCustomRepository(MessageRepository);

        const message = await messageRepository.find({ chatRoomId });

        if (message.length == 0) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(message);
    }

    async update(req: Request, res: Response) {
        //recebe todos os dados do  usuario a ser editado

        const { id } = req.body;

        const messageRepository = getCustomRepository(MessageRepository);

        //porem usa apenas o id para localiza-lo no bd
        let messageSaved = await messageRepository.findOne({
            id
        });

        if (!messageSaved) {
            return res.status(400).json("Mensagem não encontrada");
        }

        const { nickname = messageSaved.nickname, message = messageSaved.message, chatRoomId = messageSaved.chatRoomId } = req.body;

        const updatedMessage = {
            nickname,
            message,
            chatRoomId
        }


        await messageRepository.update(id, updatedMessage)


        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(updatedMessage);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const messageRepository = getCustomRepository(MessageRepository);

        const message = await messageRepository.findOne(id);


        if (!message) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        await messageRepository.delete({ id });

        return res.status(200).json({
            Message: "Sucesso!"
        });

    }

    async show(req: Request, res: Response) {
        const messageRepository = getCustomRepository(MessageRepository);

        const all = await messageRepository.find();

        if (!all) {
            return res.status(400).json({
                Message: "Nada encontrado!"
            })
        }

        return res.status(200).json(all);
    }


}

export { MessageController };