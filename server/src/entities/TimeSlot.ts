import { ObjectType, Field } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from 'typeorm'
import { Section } from './Section'

export enum Day {
  MONDAY = "mon",
  TUESDAY = "tue",
  WEDNESDAY = "wed",
  THURSDAY = "thu",
  FRIDAY = "fri",
}

@ObjectType()
@Entity()
export class TimeSlot extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({
    type: "enum",
    enum: Day,
  })
  day!: string

  @Field()
  @Column()
  start_hr!: number

  @Field()
  @Column()
  start_min!: number

  @Field()
  @Column()
  end_hr!: number

  @Field()
  @Column()
  end_min!: number

  //@ts-ignore
  @Field(type => Section)
  //@ts-ignore
  @ManyToMany(type => Section, section => section.timeslots)
  sections!: Section[];

  @Field()
  @Column()
  alternating!: boolean
}
