import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicStatus1728087711078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "status"("name") VALUES ($1)`, [
      'pending',
    ]);
    await queryRunner.query(`INSERT INTO "status"("name") VALUES ($1)`, [
      'approved',
    ]);
    await queryRunner.query(`INSERT INTO "status"("name") VALUES ($1)`, [
      'rejected',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM status');
  }
}
