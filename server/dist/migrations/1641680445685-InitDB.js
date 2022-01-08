"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDB1641680445685 = void 0;
class InitDB1641680445685 {
    constructor() {
        this.name = 'InitDB1641680445685';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user_account" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c4d4fae641bf9048ad324ee0d9" UNIQUE ("username"), CONSTRAINT "UQ_56a0e4bcec2b5411beafa47ffa5" UNIQUE ("email"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."time_slot_day_enum" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri')`);
            yield queryRunner.query(`CREATE TABLE "time_slot" ("id" SERIAL NOT NULL, "day" "public"."time_slot_day_enum" NOT NULL, "start_hr" integer NOT NULL, "start_min" integer NOT NULL, "end_hr" integer NOT NULL, "end_min" integer NOT NULL, "alternating" boolean NOT NULL, CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."section_status_enum" AS ENUM('open', 'waitlist', 'full')`);
            yield queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "course_id" character varying NOT NULL, "section_id" character varying NOT NULL, "crn" character varying NOT NULL, "title" character varying NOT NULL, "semester" character varying NOT NULL, "year" integer NOT NULL, "location" character varying NOT NULL, "instructor" character varying NOT NULL, "status" "public"."section_status_enum" NOT NULL DEFAULT 'open', "extras" integer array NOT NULL, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "section_timeslots_time_slot" ("sectionId" integer NOT NULL, "timeSlotId" integer NOT NULL, CONSTRAINT "PK_97c65d55388927a1dc3a449031f" PRIMARY KEY ("sectionId", "timeSlotId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_7628c25c94b5ced6543708b542" ON "section_timeslots_time_slot" ("sectionId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_6083d9d6d721394bd8ea2ab83f" ON "section_timeslots_time_slot" ("timeSlotId") `);
            yield queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" ADD CONSTRAINT "FK_7628c25c94b5ced6543708b542c" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" ADD CONSTRAINT "FK_6083d9d6d721394bd8ea2ab83f5" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" DROP CONSTRAINT "FK_6083d9d6d721394bd8ea2ab83f5"`);
            yield queryRunner.query(`ALTER TABLE "section_timeslots_time_slot" DROP CONSTRAINT "FK_7628c25c94b5ced6543708b542c"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_6083d9d6d721394bd8ea2ab83f"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7628c25c94b5ced6543708b542"`);
            yield queryRunner.query(`DROP TABLE "section_timeslots_time_slot"`);
            yield queryRunner.query(`DROP TABLE "section"`);
            yield queryRunner.query(`DROP TYPE "public"."section_status_enum"`);
            yield queryRunner.query(`DROP TABLE "time_slot"`);
            yield queryRunner.query(`DROP TYPE "public"."time_slot_day_enum"`);
            yield queryRunner.query(`DROP TABLE "user_account"`);
        });
    }
}
exports.InitDB1641680445685 = InitDB1641680445685;
//# sourceMappingURL=1641680445685-InitDB.js.map