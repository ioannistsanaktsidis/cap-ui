import React from 'react';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';


export default function SectionHeader(props) {
  return (
    <Header
      justify="center"
      alignContent="center"
      size="small"
      colorIndex="grey-3-a"
      pad="small">
      <Box flex={true}
        justify='between'
        alignContent='center'
        direction='row'
        responsive={false}>
        <span>{props.label}</span>
      </Box>
      <Box>
        <Button size="xsmall" icon={props.icon}></Button>
      </Box>
    </Header>
  );
}


