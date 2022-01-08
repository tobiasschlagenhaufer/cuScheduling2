import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1641680445685 implements MigrationInterface {
    name = 'InitDB1641680445685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_account" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c4d4fae641bf9048ad324ee0d9" UNIQUE ("username"), CONSTRAINT "UQ_56a0e4bcec2b5411beafa47ffa5" UNIQUE ("email"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."time_slot_day_enum" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri')`);
        await queryRunner.query(`CREATE TABLE "time_slot" ("id" SERIAL NOT NULL, "day" "public"."time_slot_day_enum" NOT NULL, "start_hr" integer NOT NULL, "start_min" integer NOT NULL, "end_hr" integer NOT NULL, "end_min" integer NOT NULL, "alternating" boolean NOT NULL, CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."section_status_enum" AS ENUM('open', 'waitlist', 'full')`);
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "course_id" character varying NOT NULL, "section_id" character varying NOT NULL, "crn" character varying NOT NULL, "title" character varying NOT NULL, "semester" character varying NOT NULL, "year" integer NOT NULL, "location" character varying NOT NULL, "instructor" character varying NOT NULL, "status" "public"."section_status_enum" NOT NULL DEFAULT 'open', "extras" integer array NOT NULL, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section_timeslots_time_slot" ("sectionId" integer NOT NULL, "timeSlotId" integer NOT NULL, CONSTRAINT "PK_97c65d55388927a1dc3a449031f" PRIMARY KEY ("sectionId", "timeSlotId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7628c25c94b5ced6543708b542" ON "section_timeslots_time_slot" ("sectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6083d9d6d721394bd8ea2ab83f" ON "section_timeslots_time_slot" ("timeSlotId") `);
        await queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" ADD CONSTRAINT "FK_7628c25c94b5ced6543708b542c" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" ADD CONSTRAINT "FK_6083d9d6d721394bd8ea2ab83f5" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" DROP CONSTRAINT "FK_6083d9d6d721394bd8ea2ab83f5"`);
        await queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" DROP CONSTRAINT "FK_7628c25c94b5ced6543708b542c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6083d9d6d721394bd8ea2ab83f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7628c25c94b5ced6543708b542"`);
        await queryRunner.query(`DROP TABLE "section_timeslots_time_slot"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TYPE "public"."section_status_enum"`);
        await queryRunner.query(`DROP TABLE "time_slot"`);
        await queryRunner.query(`DROP TYPE "public"."time_slot_day_enum"`);
        await queryRunner.query(`DROP TABLE "user_account"`);
    }

}
