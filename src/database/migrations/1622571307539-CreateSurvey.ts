import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurvey1622571307539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "avaliation",
                        type: "double"
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
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("survey");
    }

}
