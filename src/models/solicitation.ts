import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Professional } from "./Professional";
import { User } from "./User";


@Entity("solicitations")
class Solicitation {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    requestDate: Date;

    @Column()
    obsUser: string;

    @Column()
    professionalAnswer: Boolean;

    @Column()
    obsProfessional: string;

    @Column()
    userId: string;

    @Column()
    proId: string;

    @CreateDateColumn()
    createdAt: Date;


    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToOne(() => Professional)
    @JoinColumn({ name: "proId" })
    pro: Professional;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Solicitation }