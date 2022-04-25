"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Accessory_1 = require("./Accessory");
const enums_1 = require("../utils/enums");
let Section = class Section extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Section.prototype, "crn", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Section.prototype, "course_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Section.prototype, "section_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Section.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: enums_1.Semester,
    }),
    __metadata("design:type", String)
], Section.prototype, "semester", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Section.prototype, "year", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Section.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Section.prototype, "instructor", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Section.prototype, "start_hr", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Section.prototype, "start_min", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Section.prototype, "duration", void 0);
__decorate([
    type_graphql_1.Field(() => [enums_1.Day]),
    typeorm_1.Column({
        type: "enum",
        enum: enums_1.Day,
        array: true
    }),
    __metadata("design:type", Array)
], Section.prototype, "days", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: enums_1.Status,
        default: enums_1.Status.OPEN,
    }),
    __metadata("design:type", String)
], Section.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => [Accessory_1.Accessory], { nullable: true }),
    typeorm_1.OneToMany(() => Accessory_1.Accessory, accessory => accessory.section),
    __metadata("design:type", Array)
], Section.prototype, "accessories", void 0);
Section = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity(),
    typeorm_1.Index(["crn"])
], Section);
exports.Section = Section;
//# sourceMappingURL=Section.js.map