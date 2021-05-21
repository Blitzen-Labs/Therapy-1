import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";

export class CreateUsers1615293050415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( //Criação da tabela de usuário 
            new Table({                //com seus respectivos tributos
                name: "user",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varChar'
                    },
                    {
                        name: 'cpf',
                        type: 'varChar'
                    },
                    {
                        name: 'email',
                        type: 'varChar'
                    },
                    {
                        name: 'password',
                        type: 'varChar'
                    },
                    {
                        name: 'birthDate',
                        type: 'date'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'city',
                        type: 'varchar'
                    },
                    {
                        name: 'state',
                        type: 'varchar'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
