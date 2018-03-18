import React from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';

let FieldHeader = function (props) {
  const {title, required, description} = props;
  return (
    <Box flex={true}>
      <Heading tag='h6' margin="none" strong={true}>
        {title}{required ? "*" : null}
      </Heading>
      {description ? <Paragraph margin="small" size='small'>{description}</Paragraph> : null}
    </Box>
  );
}

export default FieldHeader;