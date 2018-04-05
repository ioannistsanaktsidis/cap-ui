import React from 'react';

import {
  Box,
  Notification,
  List,
  ListItem,
} from 'grommet';

export default function ErrorListTemplate(props) {
  const {errors} = props;

  return (
    <Box flex={true}>
      <Notification state={null}
        message="Data provided are not correct"
        timestamp={null}
        status="critical"
        closer={true} />
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
