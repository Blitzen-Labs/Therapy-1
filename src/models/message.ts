import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ChatRoom } from "./chatRoom";


@Entity("messages")
class Message {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    nickname: string;

    @Column()
    message: string;

    @Column()
    chatRoomId: string;

    @CreateDateColumn()
    createdAt: Date;


    @ManyToOne(() => ChatRoom)
    @JoinColumn({ name: "chatRoomId" })
    chatRoom: ChatRoom;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Message }