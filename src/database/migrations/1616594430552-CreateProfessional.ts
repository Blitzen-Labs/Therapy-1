import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";

export class CreateProfessional1616594430552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( //Criação da tabela de profissional 
            new Table({                //com seus respectivos tributos
                name: "professional",
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
                        name: 'idCod',
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
        await queryRunner.dropTable("professional");
    }

}
