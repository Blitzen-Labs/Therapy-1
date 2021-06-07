import { Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Professional } from "./Professional";
import { User } from "./User";


@Entity("surveys")
class Survey {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  avaliation: number;

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

export { Survey }