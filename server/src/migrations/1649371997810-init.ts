import {MigrationInterface, QueryRunner} from "typeorm";

export class init1649371997810 implements MigrationInterface {
    name = 'init1649371997810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."section_semester_enum" AS ENUM('fall', 'summer', 'winter')`);
        await queryRunner.query(`CREATE TABLE "section" ("crn" character varying NOT NULL, "course_id" character varying NOT NULL, "section_id" character varying NOT NULL, "title" character varying NOT NULL, "semester" "public"."section_semester_enum" NOT NULL, "year" integer NOT NULL, "location" character varying NOT NULL, "instructor" character varying NOT NULL, "start_hr" integer NOT NULL, "start_min" integer NOT NULL, "duration" integer NOT NULL, "status" "public"."section_status_enum" NOT NULL DEFAULT 'open', CONSTRAINT "PK_ce6a6eea22a2ea72b790806f6cc" PRIMARY KEY ("crn"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ce6a6eea22a2ea72b790806f6c" ON "section" ("crn") `);
        await queryRunner.query(`CREATE TYPE "public"."accessory_semester_enum" AS ENUM('fall', 'summer', 'winter')`);
        await queryRunner.query(`CREATE TYPE "public"."accessory_status_enum" AS ENUM('open', 'waitlist', 'full')`);
        await queryRunner.query(`CREATE TABLE "accessory" ("crn" character varying NOT NULL, "course_id" character varying NOT NULL, "section_id" character varying NOT NULL, "title" character varying NOT NULL, "semester" "public"."accessory_semester_enum" NOT NULL, "year" integer NOT NULL, "location" character varying NOT NULL, "instructor" character varying NOT NULL, "start_hr" integer NOT NULL, "start_min" integer NOT NULL, "duration" integer NOT NULL, "status" "public"."accessory_status_enum" NOT NULL, "sectionCrn" character varying, CONSTRAINT "PK_93491b697b331ac5dbab222fd5a" PRIMARY KEY ("crn"))`);
        await queryRunner.query(`CREATE INDEX "IDX_93491b697b331ac5dbab222fd5" ON "accessory" ("crn") `);
        await queryRunner.query(`CREATE TABLE "user_account" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c4d4fae641bf9048ad324ee0d9" UNIQUE ("username"), CONSTRAINT "UQ_56a0e4bcec2b5411beafa47ffa5" UNIQUE ("email"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_slot" ("id" SERIAL NOT NULL, "day" "public"."time_slot_day_enum" NOT NULL, "start_hr" integer NOT NULL, "start_min" integer NOT NULL, "end_hr" integer NOT NULL, "end_min" integer NOT NULL, "alternating" boolean NOT NULL, CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accessory" ADD CONSTRAINT "FK_0d63a606d1bc9832b5cab64873a" FOREIGN KEY ("sectionCrn") REFERENCES "section"("crn") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessory" DROP CONSTRAINT "FK_0d63a606d1bc9832b5cab64873a"`);
        await queryRunner.query(`DROP TABLE "time_slot"`);
        await queryRunner.query(`DROP TABLE "user_account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_93491b697b331ac5dbab222fd5"`);
        await queryRunner.query(`DROP TABLE "accessory"`);
        await queryRunner.query(`DROP TYPE "public"."accessory_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."accessory_semester_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce6a6eea22a2ea72b790806f6c"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TYPE "public"."section_semester_enum"`);
    }

}
