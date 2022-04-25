import { Section } from '../entities/Section'
import {
  Resolver,
  Arg,
  Query,
  ObjectType,
  Field,
  InputType,
  createUnionType
} from 'type-graphql'
import { batchAccessories, batchAccessory } from '../db/loaders/accessoriesLoader'
import { UserInputError } from 'apollo-server-express'
import genSchedule from '../utils/scheduler'
import { Accessory } from '../entities/Accessory'
import { Semester } from '../utils/enums'

@ObjectType()
class AutocompleteName {
  @Field()
  label: string
  @Field()
  num_avail: string
  @Field()
  value: string
}

const BlockUnion = createUnionType({
  name: "BlockUnion", // the name of the GraphQL union
  types: () => [Section, Accessory] as const, // function that returns tuple of object types classes
});

@ObjectType()
class Schedule {
  @Field(() => [Section])
  blocks: [Section]
}

@InputType()
class ScheduleInput {
  @Field(() => [String])
  course_ids: [string]
  @Field()
  semester: string
}

@Resolver(Section)
export class SectionResolver {
  @Query(() => Section, { nullable: true })
  section(@Arg('crn') crn: number) {

    const section = batchAccessory(crn)
    if (!section) return null

    return section
  }

  @Query(() => [Section], { nullable: true })
  sections() {
    const sections = batchAccessories();
    if (!sections) return null

    return sections
  }

  @Query(() => [AutocompleteName], { nullable: true })
  async sectionNames() {

    const sections = await Section.createQueryBuilder('section')
      .select(['course_id', 'COUNT(course_id) as num_avail'])
      .groupBy('course_id')
      .getRawMany();

    const names = await sections.map(async (section) => {
      return {
        label: section.course_id,
        value: section.course_id,
        num_avail: section.num_avail
      }
    })

    return names;
  }

  @Query(() => [Schedule], { nullable: true })
  async schedules(
    @Arg("schedule_in") schedule_in: ScheduleInput){

    if (!(<any>Object).values(Semester).includes(schedule_in.semester)) {
      throw new UserInputError('Invalid semester type');
    }

    return genSchedule(schedule_in.course_ids, schedule_in.semester);
  }
}
