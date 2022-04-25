import 'reflect-metadata'
import 'dotenv-safe/config'
import path from 'path'
import { Connection, createConnection } from 'typeorm'

import { __prod__ } from './config'
import { UserAccount } from './entities/index'
import { Section} from './entities/Section'
import { TimeSlot } from './entities/TimeSlot'
import { cleanDb } from './utils/cleanDb'
import { Accessory } from './entities/Accessory'
import { Semester, Status, Day } from './utils/enums'

const init = async () => {
  console.log(process.env.DATABASE_URL)
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    //  do not want synchronize true in production, possiblility of losing data
    synchronize: false,
    entities: [UserAccount, Section, TimeSlot, Accessory],
    migrations: [path.join(__dirname, './migrations/*')],
    //  need this to use postgres heroku plugin
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    ssl: false
  })

  await cleanDb();

  const section_array = await sections(conn);

  await accessories(conn, section_array);

  console.log('Complete.');

  return;
}

const sections = async (conn: Connection) => {
    console.log("Creating Sections");
    const section_data = [
        { course_id: "COMP1405", section_id: "A", crn: "11052", title: "Intro to Computer Science I", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "John Jonans", status: Status.OPEN, start_hr: 13, start_min: 5, duration: 80, days: [Day.WEDNESDAY, Day.FRIDAY] },
        { course_id: "COMP1405", section_id: "B", crn: "11055", title: "Intro to Computer Science I", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 11, start_min: 35, duration: 80, days: [Day.TUESDAY, Day.THURSDAY] },
        
        { course_id: "COMP1406", section_id: "A", crn: "11059", title: "Intro to Computer Science II", semester: Semester.FALL, year: 2022, location: "Herzberg 121", instructor: "John Jonans", status: Status.WAITLIST, start_hr: 10, start_min: 5, duration: 80, days: [Day.MONDAY, Day.WEDNESDAY] },
        { course_id: "COMP1406", section_id: "B", crn: "11061", title: "Intro to Computer Science II", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 8, start_min: 35, duration: 80, days: [Day.MONDAY, Day.WEDNESDAY] },

        { course_id: "COMP2402", section_id: "A", crn: "11090", title: "Abstract Data Types/Algorithms", semester: Semester.FALL, year: 2022, location: "Herzberg 121", instructor: "John Jonans", status: Status.OPEN, start_hr: 16, start_min: 5, duration: 80, days: [Day.MONDAY, Day.WEDNESDAY] },
        { course_id: "COMP2402", section_id: "B", crn: "11091", title: "Abstract Data Types/Algorithms", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 14, start_min: 35, duration: 80, days: [Day.FRIDAY, Day.WEDNESDAY] },

        { course_id: "BIOL2001", section_id: "B", crn: "10376", title: "Animals: Form and Function", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 10, start_min: 5, duration: 80, days: [Day.MONDAY, Day.WEDNESDAY] },

        { course_id: "BUSI1003", section_id: "A", crn: "10534", title: "Survey of Accounting", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 12, start_min: 35, duration: 170, days: [Day.TUESDAY] },

        { course_id: "BUSI1001", section_id: "A", crn: "10539", title: "Accounting I", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 11, start_min: 35, duration: 170, days: [Day.TUESDAY] },
    ];

    const sectionRepo = conn.getRepository(Section);
    let section_array = [];
    for (let section of section_data) {
        let newSec = sectionRepo.create(section);
        section_array.push(newSec);
    }

    await sectionRepo.save(section_array);

    return section_array;
}

const accessories = async (conn: Connection, sections: Array<Object>) => {
    console.log("Creating Accessories");
    const accessory_data = [
        { course_id: "COMP1405", section_id: "A1", crn: "11053", title: "Intro to Computer Science I", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "John Jonans", status: Status.OPEN, start_hr: 16, start_min: 35, duration: 80, section: sections[0], days: [Day.THURSDAY] },
        { course_id: "COMP1405", section_id: "A2", crn: "11054", title: "Intro to Computer Science I", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 14, start_min: 35, duration: 80, section: sections[0], days: [Day.FRIDAY] },
        { course_id: "COMP1405", section_id: "B1", crn: "11056", title: "Intro to Computer Science I", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Kim Kimberly", status: Status.FULL, start_hr: 13, start_min: 5, duration: 80, section: sections[1], days: [Day.WEDNESDAY] },
        { course_id: "COMP1405", section_id: "B2", crn: "11057", title: "Intro to Computer Science I", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Nick Nicholson", status: Status.WAITLIST, start_hr: 8, start_min: 35, duration: 80, section: sections[1], days: [Day.FRIDAY] },

        { course_id: "COMP1406", section_id: "A1", crn: "11059", title: "Intro to Computer Science II", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "John Jonans", status: Status.OPEN, start_hr: 11, start_min: 35, duration: 80, section: sections[2], days: [Day.WEDNESDAY] },
        { course_id: "COMP1406", section_id: "A2", crn: "11060", title: "Intro to Computer Science II", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Sarah Joe", status: Status.OPEN, start_hr: 14, start_min: 35, duration: 80, section: sections[2], days: [Day.FRIDAY] },
        { course_id: "COMP1406", section_id: "B1", crn: "11088", title: "Intro to Computer Science II", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Kim Kimberly", status: Status.FULL, start_hr: 10, start_min: 5, duration: 80, section: sections[3], days: [Day.FRIDAY] },
        { course_id: "COMP1406", section_id: "B2", crn: "11089", title: "Intro to Computer Science II", semester: Semester.FALL, year: 2022, location: "ONLINE", instructor: "Nick Nicholson", status: Status.WAITLIST, start_hr: 14, start_min: 35, duration: 80, section: sections[3], days: [Day.WEDNESDAY] },
    ];

    const accessoryRepo = conn.getRepository(Accessory);
    const acc_array = [];
    for (let accessory of accessory_data) {
        let acc = accessoryRepo.create(accessory);
        acc_array.push(acc);
    }

    await accessoryRepo.save(acc_array);
}

init().catch((err) => {
    console.error(err)
})