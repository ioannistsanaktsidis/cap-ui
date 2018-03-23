import React from 'react';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';


export default function SectionHeader(props) {
  return (
    <Header
      justify="center"
      alignContent="center"
      size="small"
      colorIndex="neutral-1-t"
      pad="none">
      <Box flex={true}
        justify='between'
        alignContent='center'
        direction='row'
        pad={{horizontal: "small"}}
        responsive={false}>
        <span>{props.label}</span>
      </Box>
      { props.icon ? props.icon : null}
    </Header>
  );
}


