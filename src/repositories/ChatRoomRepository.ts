import { EntityRepository, Repository } from 'typeorm';
import { ChatRoom } from '../models/chatRoom';

@EntityRepository(ChatRoom)
class ChatRoomRepository extends Repository<ChatRoom>{


}

export { ChatRoomRepository }