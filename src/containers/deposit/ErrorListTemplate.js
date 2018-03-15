import React from 'react';

import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';


export default function ErrorListTemplate(props) {
  const {errors} = props;
  return (
    <Notification state='Sample state'
      message='Sample message'
      timestamp={{}}
      status='critical' >
    <Box>
      {errors.map((error, i) => {
        return (
          <li key={i}>
            {error.stack}
          </li>
        );
      })}
    </Box>
    </Notification>
  );
}


