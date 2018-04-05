import React from 'react';

import {
  Accordion,
  AccordionPanel,
  Box
} from 'grommet';

import FieldHeader from '../components/FieldHeader';

class AccordionObjectField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layerActive: false
    };

    this._onClick = this._onClick.bind(this);
  }


  _onClick() {
    this.setState({ layerActive: true });
  }

  render() {
    if (this.props.idSchema['$id'] == "root" ) {
      return (
        <Box>
          {this.props.properties.map(prop => prop.content )}
        </Box>
      );
    }
    else {
      return (
        <Accordion animate={false} openMulti={true}>
          <AccordionPanel
            heading={
              <FieldHeader
                title={this.props.title}
                required={this.props.required}
                description={this.props.description}
                />
              }
          >
            <Box pad="small" colorIndex="light-2">
              {this.props.properties.map(prop => prop.content )}
            </Box>
          </AccordionPanel>
        </Accordion>
      );
    }
  }
}

export default AccordionObjectField;
