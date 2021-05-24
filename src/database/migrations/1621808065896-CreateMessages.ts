import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessages1621808065896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "messages",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nickname",
                        type: "varchar"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "chatRoomId",
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
                        name: "FKChatRoom",
                        referencedTableName: "chatRooms",
                        referencedColumnNames: ["id"],
                        columnNames: ["chatRoomId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages")
    }

}
