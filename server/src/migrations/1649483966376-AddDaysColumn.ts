import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDaysColumn1649483966376 implements MigrationInterface {
    name = 'AddDaysColumn1649483966376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."section_days_enum" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday')`);
        await queryRunner.query(`ALTER TABLE "section" ADD "days" "public"."section_days_enum" array NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."accessory_days_enum" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday')`);
        await queryRunner.query(`ALTER TABLE "accessory" ADD "days" "public"."accessory_days_enum" array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessory" DROP COLUMN "days"`);
        await queryRunner.query(`DROP TYPE "public"."accessory_days_enum"`);
        await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "days"`);
        await queryRunner.query(`DROP TYPE "public"."section_days_enum"`);
    }

}
