import React, { ChangeEvent, useEffect, useState } from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'

import { useGetSectionNamesQuery, useGetSchedulesQuery } from '../generated/graphql'
import { Alert, AlertIcon, Box, Button, Grid, GridItem, Select, Stack } from '@chakra-ui/react';

import { NextRouter, useRouter } from 'next/router';

export interface SectionItem {
  label: string;
  value: string;
  num_avail: string;
}

export default function Search() {
  const router = useRouter();
  const [semester, setSemester] = useState<string>("fall");
  const [pickerItems, setPickerItems] = useState<SectionItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SectionItem[]>([]);
  const [stringSelections, setStringSelections] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [ {data: name_data, fetching: name_fetching} ] = useGetSectionNamesQuery()
  const [ {data: schedule_data, fetching: schedule_fetching}, executeScheduleQuery] = useGetSchedulesQuery({pause: true, variables: {schedule_in: {course_ids: stringSelections, semester: semester}}});

  const handleSelectedItemsChange = (selectedItems?: SectionItem[]) => {
    if (selectedItems) {
      let stringSelected = selectedItems.map(sectionItem => {
        return sectionItem.value
      })
      setSelectedItems(selectedItems);
      setStringSelections(stringSelected);
    }
  };

  const handleFilter = (items: SectionItem[], inputValue: string) : SectionItem[] => {
    if (inputValue.length < 1) {
      return [];
    }
    
    return items.filter((item) => {
      let val = item.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
      return val
    })
  }
  
  const handleScheduleSumbit = () => {
    if (selectedItems.length < 2) {
      setErrorMsg("Please select at least 2 courses")
    } else {
      executeScheduleQuery({ requestPolicy: 'network-only' });
      setErrorMsg("");
    }
  }

  const handleSelect = (e : any) => {
    setSemester(e.target.value)
  }

  useEffect(() => {
    console.log(name_fetching)
    
    if (name_data?.sectionNames) {
      setPickerItems(name_data?.sectionNames)
    }
  }, [name_data])

  useEffect(() => {
    if (schedule_data?.schedules) {
      if (schedule_data.schedules.length > 0) {
        console.log("Got some stuff back!")
        router.push({
          pathname: 'schedule',
          query: {data: encodeURIComponent(JSON.stringify(schedule_data.schedules))}},
          // '/schedule',
        )
      } else {
        setErrorMsg("No possible schedules with these courses")
      }
      console.log(schedule_data)
    }
  }, [schedule_data])

  return (
    <Grid
      alignItems="stretch"
      templateColumns='repeat(5, 1fr)'
      gap={4}
    >    
      <GridItem colSpan={1}>
        <Select
          placeholder='Select semester'
          onChange={handleSelect}
        >
          <option value='fall'>Fall</option>
          <option value='winter'>Winter</option>
          <option value='summer'>Summer</option>
        </Select>
      </GridItem>
      <GridItem colSpan={4}>
        <CUIAutoComplete 
          label={""}
          items={pickerItems}
          placeholder={"Enter course"}
          selectedItems={selectedItems}
          disableCreateItem={true}
          hideToggleButton={true}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
          optionFilterFunc={handleFilter}
          tagStyleProps={{
            bg: 'brand.pink_l',
            h: '3rem',
            fontSize: "lg"
          }}
          inputStyleProps={{
            fontSize: "2xl",
            p: 6
          }}
        />
        </GridItem>

        <GridItem alignItems={"end"}>
            <Button
              p={8}
              bg={"brand.red"}
              color={"white"}
              _hover={{
                bg: 'brand.pink'
              }}
              fontWeight={"normal"}
              fontSize={"xl"}
              onClick={handleScheduleSumbit}
              isLoading={schedule_fetching}
            >
              Search
            </Button>
        </GridItem>
        <Box width={300}>
        {errorMsg.length > 0 ?
          <Alert status='error'>
            <AlertIcon />
            {errorMsg}
          </Alert>
        :
          null
        }
        </Box>
      </Grid>
  );
}