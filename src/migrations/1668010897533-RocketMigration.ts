import { MigrationInterface, QueryRunner } from "typeorm";

export class RocketMigration1668010897533 implements MigrationInterface {
    name = 'RocketMigration1668010897533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rocket" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "height" integer NOT NULL, "diameter" integer NOT NULL, "mass" integer NOT NULL, PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rocket"`);
    }

}
