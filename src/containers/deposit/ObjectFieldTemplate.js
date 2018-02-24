import React from 'react';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';

let ObjectFieldTemplate = function (props) {
  return (
    <Box style={{padding: "10px"}}>
      <Title>{props.title}</Title>
      <Paragraph size='small'>{props.description}{props.required ? "*" : null}</Paragraph>
      {props.properties.map(prop => (
          <Box
            key={prop.content.key}>
            {prop.content}
          </Box>
        ))}
    </Box>
  );
}

export default ObjectFieldTemplate;
