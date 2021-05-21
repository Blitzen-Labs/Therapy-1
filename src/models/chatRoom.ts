import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Professional } from "./Professional";
import { User } from "./User";

@Entity("chatRooms")
class ChatRoom {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  userId: string;

  @Column()
  proId: string;

  @CreateDateColumn()
  createdAt: Date;


  @ManyToOne(() => User)
  @JoinColumn({ name: "userID" })
  user: User;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: "proId" })
  pro: Professional;

  constructor() {
    if (!this.id) {
        this.id = uuid();
    }
}
}

export {ChatRoom}