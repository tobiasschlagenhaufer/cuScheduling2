import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  BaseEntity,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Accessory } from './Accessory';
import { Day, Semester, Status } from '../utils/enums';

@ObjectType()
@Entity()
@Index(["crn"])
export class Section extends BaseEntity {
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
    default: Status.OPEN,
  })
  status!: Status;

  @Field(() => [Accessory], {nullable: true})
  @OneToMany(() => Accessory, accessory => accessory.section)
  accessories: Accessory[];
}
