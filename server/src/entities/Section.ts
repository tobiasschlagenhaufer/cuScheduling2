import { ObjectType, Field, Int } from 'type-graphql';
import {
  Entity,
  JoinTable,
  Column,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeSlot } from './TimeSlot';

export enum Status {
  OPEN = "open",
  WAITLIST = "waitlist",
  FULL = "full"
}

@ObjectType()
@Entity()
export class Section extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  course_id!: string;

  @Field()
  @Column()
  section_id!: string;

  @Field()
  @Column()
  crn!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  semester!: string;

  @Field()
  @Column()
  year!: number;

  @Field()
  @Column()
  location!: string;

  // @Field()
  // @ManyToOne(type => Professor, professor => professor.sections)
  // professor: Professor;
  @Field()
  @Column()
  instructor: string;

  //@ts-ignore
  @Field(type => [TimeSlot])
  //@ts-ignore
  @ManyToMany(type => TimeSlot, timeslot => timeslot.sections)
  @JoinTable()
  timeslots: TimeSlot[];

  @Field()
  @Column({
    type: "enum",
    enum: Status,
    default: Status.OPEN,
  })
  status!: Status;

  //@ts-ignore
  @Field(type => [Int])
  @Column("int", { array: true })
  extras: number[];
}
