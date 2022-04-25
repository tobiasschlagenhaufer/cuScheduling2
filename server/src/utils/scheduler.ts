import { batchAccessoriesByCourseId } from "../db/loaders/accessoriesLoader"
import { Accessory } from "../entities/Accessory";
import { Section } from "../entities/Section";

const genSchedule = async (course_ids: [string], semester: string) => {

    // first batch load everything
    const batch_sections = await batchAccessoriesByCourseId(course_ids, semester);
    
    // each accessory / section combo grouped by course id 
    const section_accessory = {} as any;
    for (const course_id of course_ids) {
        section_accessory[course_id] = []
    }
    for (const section of batch_sections) {
        if (!section.accessories.length) {
            section_accessory[section.course_id].push([section])
            continue
        }
        for (const accessory of section.accessories) {
            let minimal_section = <Section>JSON.parse(JSON.stringify(section))
            minimal_section.accessories = []
            section_accessory[section.course_id].push([minimal_section, accessory])
        }
    }

    // for each accessory / section combo build schedules if possible
        // this is the heavy lifting logic

    let schedule_builder = section_accessory[course_ids[0]];

    for (const course_id of course_ids.slice(1)) {

        let cache_schedules = [] as any;

        for (const candidate_combo of section_accessory[course_id]) {

            for (const schedule of schedule_builder) {

                let valid = true;

                for (const schedule_block of schedule) {
                    
                    // this will have max 2 entries
                    for(const candidate of candidate_combo) {

                        let conflict = intersects(candidate, schedule_block);

                        if (conflict) {
                            valid = false;
                            break;
                        }
                    }
                
                    if (!valid) break;
                }

                if (valid) {
                    cache_schedules.push(schedule.concat(candidate_combo))
                }
            }
        }

        schedule_builder = cache_schedules;
    }

    return schedule_builder.map((schedule: any) => {
        return {blocks: schedule}
    })
}

const intersects = (block1: Section | Accessory, block2: Section | Accessory): Boolean => {
    const start1 = block1.start_hr * 60 + block1.start_min;
    const end1 = start1 + block1.duration

    const start2 = block2.start_hr * 60 + block2.start_min;
    const end2 = start2 + block2.duration
    for (const day1 of block1.days) {
        for (const day2 of block2.days) {
            if (day1 == day2) {
                if ((start1 >= start2 && start1 <= end2) || // start falls in block2
                    (end1 >= start2 && end1 <= end2) || // end falls in block2
                    (start1 <= start2 && end1 >= end2)) { // start falls before and end falls after block 2 (edge case)
                        return true
                }
            }
        }
    }

    return false;
}

export default genSchedule;