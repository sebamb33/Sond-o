import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteProfilPicture1707504310253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "profilePicture");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
