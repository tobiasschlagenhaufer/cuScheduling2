import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  BaseEntity,
  Index,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Section } from './Section';
import { Day, Semester, Status } from '../utils/enums'

@ObjectType()
@Entity()
@Index(["crn"])
export class Accessory extends BaseEntity {
  @Field()
  @PrimaryColumn()
  crn!: string;

  @Field()
  @Column()
  course_id!: string;

  @Field()
  @Column()
  section_id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({
    type: "enum",
    enum: Semester,
    name: 'semester'
  })
  semester!: string;

  @Field()
  @Column()
  year!: number;

  @Field()
  @Column()
  location!: string;

  @Field()
  @Column()
  instructor: string;

  @Field()
  @Column()
  start_hr!: number;

  @Field()
  @Column()
  start_min!: number;

  @Field()
  @Column()
  duration!: number;

  @Field(() => [String])
  @Column({
    type: "enum",
    enum: Day,
    array: true
  })
  days!: string[];

  @Field()
  @Column({
    type: "enum",
    enum: Status,
  })
  status!: Status;

  @Field(() => Section)
  @ManyToOne(() => Section, section => section.accessories)
  section: Section;
}
