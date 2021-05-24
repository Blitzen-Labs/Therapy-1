import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../models/message';

@EntityRepository(Message)
class MessageRepository extends Repository<Message>{


}

export { MessageRepository }