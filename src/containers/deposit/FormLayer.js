import React from 'react';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';
import Edit from 'grommet/components/icons/base/Edit';

class FormLayer extends React.Component {
  constructor(props) {
    super(props);

    console.log("FormLayer",this.props)
  }

  render() {
    return (
      this.props.layerActive ?
      <Layer
        closer={true}
        align="right"
        peek={true}
        flush={true}
        onClose={this.props.onClose}
        overlayClose={true}
        >
        <Box justify="center" align="center" pad="large" >
          <Box pad="large" size="large" >
            <Header>
              <Heading tag="h2" strong={true} align="start" margin='none'>Title</Heading>
            </Header>
            <Box>
              { this.props.properties }
            </Box>
          </Box>
        </Box>
      </Layer> :
      null
    );
  }
}

export default FormLayer;