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
exports.TimeSlot = exports.Day = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Section_1 = require("./Section");
var Day;
(function (Day) {
    Day["MONDAY"] = "mon";
    Day["TUESDAY"] = "tue";
    Day["WEDNESDAY"] = "wed";
    Day["THURSDAY"] = "thu";
    Day["FRIDAY"] = "fri";
})(Day = exports.Day || (exports.Day = {}));
let TimeSlot = class TimeSlot extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: Day,
    }),
    __metadata("design:type", String)
], TimeSlot.prototype, "day", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "start_hr", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "start_min", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "end_hr", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "end_min", void 0);
__decorate([
    type_graphql_1.Field(type => Section_1.Section),
    typeorm_1.ManyToMany(type => Section_1.Section, section => section.timeslots),
    __metadata("design:type", Array)
], TimeSlot.prototype, "sections", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], TimeSlot.prototype, "alternating", void 0);
TimeSlot = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], TimeSlot);
exports.TimeSlot = TimeSlot;
//# sourceMappingURL=TimeSlot.js.map