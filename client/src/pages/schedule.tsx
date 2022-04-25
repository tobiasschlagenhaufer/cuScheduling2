import WithSubNavigation from '../components/Nav'
import { Box, Stack, Container, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import Timetable from 'react-timetable-events'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const ScheduleView: React.FC = () => {
  const [schedules, setSchedules] = useState([])
  const [curr, setCurr] = useState(0)
  const day_arr = {
    "mon": [],
    "tue": [],
    "wed": [],
    "thu": [],
    "fri": []
  }
  const colour_arr = [
    "#f55c7a",
    "#f57c73",
    "#f68c70",
    "#f6ac69",
    "#f6bc66"
  ]

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search)
    let data = queryParams.get('data');
    let jsonData = decodeURIComponent(data!);
    let decodedSchedules = JSON.parse(jsonData);
    transform_sched(decodedSchedules).then(() => {
      console.log("nice!");
    })
  }, [])

  const transform_sched = async (coded_sched: any) => {
    var day_sched = [] as any;
    var colour = {} as any;
    var i = 0;
    for (let j=0; j<coded_sched.length; j++) {
      day_sched.push(JSON.parse(JSON.stringify(day_arr)))
      
      for (const sched of coded_sched[j].blocks){
        i++;
        if (!(sched.course_id in Object.keys(colour))) {
          colour[sched.course_id] = colour_arr[Object.keys(colour).length-1]
        }
          
        let start_d = new Date(2022, 0, 31, sched.start_hr, sched.start_min, 0, 0)
        // let start_d = new Date("2018-02-23T11:30:00")
        let end_d = new Date(start_d.getTime() + sched.duration*60000)
        // let end_d = new Date("2018-02-23T13:30:00")
        console.log(`start: ${start_d.toLocaleTimeString()}, end: ${end_d.toLocaleTimeString()}`)
        let new_block = {
          id: i,
          type: "custom",
          name: sched.course_id + sched.section_id,
          startTime: start_d,
          endTime: end_d,
          location: sched.location,
          event_info: "block",
          colour: colour[sched.course_id]
        }

        if (sched.days.includes("monday")) {
          day_sched[j]["mon"].push(new_block)
        }
        if (sched.days.includes("tuesday")) {
          day_sched[j]["tue"].push(new_block)
        }
        if (sched.days.includes("wednesday")) {
          day_sched[j]["wed"].push(new_block)
        }
        if (sched.days.includes("thursday")) {
          day_sched[j]["thu"].push(new_block)
        }
        if (sched.days.includes("friday")) {
          day_sched[j]["fri"].push(new_block)
        }
      }
    }
    setSchedules(day_sched)
  }

  const setSched = (i: number) => {
    var newC = curr + i;
    if (newC < 0) {
      newC = schedules.length -1;
    } else if (newC >= schedules.length) {
      newC = 0;
    }
    setCurr(newC);
  }

  return (
    <Box>
      <WithSubNavigation/>
      <Box
        bg={'gray.100'}
        css={{
          backgroundAttachment: 'fixed',
        }}>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Button onClick={() => {setSched(-1)}}>
            <ArrowLeftIcon />
          </Button>
          <Text>
            {curr+1}
          </Text>
          <Button onClick={() => {setSched(1)}}>
            <ArrowRightIcon />
          </Button>
        </Stack>
        <Stack
          as={Container}
          maxW={'7xl'}
          py={{ base: 10, lg: 10 }}
          spacing={{ base: 10, lg: 24 }}
          direction={{ base: 'column', lg: 'row' }}
          alignItems={'start'}
        >
          
          <Box w={'7xl'} maxH={100}>
            <Timetable
            hoursInterval={{from: 8, to: 20 }}
              events={{
                monday: schedules[curr] ? schedules[curr]["mon"] : [],
                tuesday: schedules[curr] ? schedules[curr]["tue"] : [],
                wednesday: schedules[curr] ? schedules[curr]["wed"] : [],
                thursday: schedules[curr] ? schedules[curr]["thu"] : [],
                friday: schedules[curr] ? schedules[curr]["fri"] : [],
              }}
              // @ts-ignore
              // renderEvent={renderE}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default ScheduleView;