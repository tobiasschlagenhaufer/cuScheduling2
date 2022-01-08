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
exports.Section = exports.Status = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const TimeSlot_1 = require("./TimeSlot");
var Status;
(function (Status) {
    Status["OPEN"] = "open";
    Status["WAITLIST"] = "waitlist";
    Status["FULL"] = "full";
})(Status = exports.Status || (exports.Status = {}));
let Section = class Section extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Section.prototype, "id", void 0);
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
], Section.prototype, "crn", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Section.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
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
    type_graphql_1.Field(type => [TimeSlot_1.TimeSlot]),
    typeorm_1.ManyToMany(type => TimeSlot_1.TimeSlot, timeslot => timeslot.sections),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Section.prototype, "timeslots", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: Status,
        default: Status.OPEN,
    }),
    __metadata("design:type", String)
], Section.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(type => [type_graphql_1.Int]),
    typeorm_1.Column("int", { array: true }),
    __metadata("design:type", Array)
], Section.prototype, "extras", void 0);
Section = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Section);
exports.Section = Section;
//# sourceMappingURL=Section.js.map