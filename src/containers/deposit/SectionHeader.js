import React from 'react';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';


export default function SectionHeader(props) {
  let _icon = props.icon ?
              <Box>
                <Button plain={true} size="xsmall" icon={props.icon}></Button>
              </Box>
              : null;


  return (
    <Header
      justify="center"
      alignContent="center"
      size="small"
      colorIndex="neutral-1-a"
      pad="none">
      <Box flex={true}
        justify='between'
        alignContent='center'
        direction='row'
        pad={{horizontal: "small"}}
        responsive={false}>
        <span>{props.label}</span>
      </Box>
      {_icon}
    </Header>
  );
}


