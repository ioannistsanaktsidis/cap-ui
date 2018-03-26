import React from 'react';

import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

export default function ErrorListTemplate(props) {
  const {errors} = props;

  console.log("ERROR_LIST:::", errors, props)
  return (
    <Box flex={true}>
    <Notification state={null}
      message='Data provided are not correct'
      timestamp={null}
      status='critical'
      closer={true} >

    </Notification>
    <Box colorIndex="light-2">
      <List flex="true" >
      {
        errors.map((error, i) => {
          return (
            <ListItem key={i}  >
              <Box flex={true}>
                {error.stack}
              </Box>
            </ListItem>
          );
        })
      }
      </List>
    </Box>
    </Box>
  );
}
