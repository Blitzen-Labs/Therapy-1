import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("professional")
class Professional {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string

    @Column()
    idCod: string

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    password: string;

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

export { Professional };