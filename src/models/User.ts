import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';


@Entity("user")
class User {
    //Modelo do usuário com seus respectivos atributos

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @CreateDateColumn()
    birthDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { User };