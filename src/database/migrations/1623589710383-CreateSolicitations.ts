import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSolicitations1623589710383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "solicitations",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "requestDate",
                        type: "timestamp"
                    },
                    {
                        name: "obsUser",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "professionalAnswer",
                        type: "tinyint",
                        isNullable: true
                    },
                    {
                        name: "obsProfessional",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "userId",
                        type: "varchar"
                    },
                    {
                        name: "proId",
                        type: "varchar"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }

                ],
                // criando as chaves esrangeiras
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        columnNames: ["userId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKPro",
                        referencedTableName: "professional",
                        referencedColumnNames: ["id"],
                        columnNames: ["proId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("solicitations");
    }

}

