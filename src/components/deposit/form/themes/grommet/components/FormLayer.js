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
import Trash from 'grommet/components/icons/base/Trash';

class FormLayer extends React.Component {
  constructor(props) {
    super(props);

    console.log("FormLayer",this.props)
  }

  render() {
    console.log("LAYER::", this.props)
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
              <Heading tag="h2" strong={true} align="start" margin='none'>{this.props.properties.props.schema ? this.props.properties.props.schema.title : null}</Heading>
            </Header>
            <Box>
              { this.props.properties }
            </Box>


            <Box direction="row" justify="between" pad={{vertical: "small"}}>
              <Box>
                <Button
                  label="OK"
                  primary={true}
                  onClick={this.props.onClose}
                />
              </Box>
              <Box>
              {
                this.props.remove ?
                <Button
                  label="Remove"
                  plain={true}
                  onClick={this.props.remove ? this.props.remove : null}
                  icon={<Trash />}
                /> : null

              }
              </Box>
            </Box>
          </Box>
        </Box>
      </Layer> :
      null
    );
  }
}

export default FormLayer;