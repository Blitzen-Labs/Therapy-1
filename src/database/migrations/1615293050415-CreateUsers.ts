import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";

export class CreateUsers1615293050415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
