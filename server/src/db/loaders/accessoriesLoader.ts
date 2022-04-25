import { Semester } from "src/utils/enums";
import { Section } from "../../entities/Section";

export const batchAccessories = async () => {
    const sections_accessories = await Section.createQueryBuilder('section')
        .leftJoinAndSelect('section.accessories', 'accessories')
        .getMany();
    return sections_accessories;
}

export const batchAccessory = async (sectionCrn: number) => {
    const sections_accessory = await Section.createQueryBuilder('section')
        .leftJoinAndSelect('section.accessories', 'accessories')
        .where('section.crn = :sectionCrn', { sectionCrn })
        .getOne();
    return sections_accessory;
}

export const batchAccessoriesByCourseId = async (course_ids: string[], semester: string) => {
    var semEnum = semester as Semester;
    const sections_accessory = await Section.createQueryBuilder('section')
        .leftJoinAndSelect('section.accessories', 'accessories')
        .where('section.course_id IN(:...course_ids)', { course_ids })
        .andWhere('section.semester = :semEnum', { semEnum })
        .getMany();
    return sections_accessory;
}