import { MigrationInterface, QueryRunner } from "typeorm";

export class MailUnique1706452203639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` ADD UNIQUE INDEX `IDX_UNIQUE_MAIL` (`mail`)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_UNIQUE_MAIL`");
  }
}
