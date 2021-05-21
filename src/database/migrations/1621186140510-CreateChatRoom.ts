import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateChatRoom1621186140510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chatRoom",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
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
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["userId"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                  },
                  {
                    name: "FKPro",
                    referencedTableName: "professionals",
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
        await queryRunner.dropTable("chatRooms");
    }

}
