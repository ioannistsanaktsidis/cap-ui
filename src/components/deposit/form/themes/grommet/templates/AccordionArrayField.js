import React from 'react';

import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Header from 'grommet/components/Header';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import AddCircleIcon from 'grommet/components/icons/base/AddCircle';
import FormField from 'grommet/components/FormField';

import Sidebar from 'grommet/components/Sidebar';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import Layer from 'grommet/components/Layer';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import FieldHeader from '../components/FieldHeader';
import FormLayer from '../components/FormLayer';

import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import FormTrashIcon from 'grommet/components/icons/base/FormTrash';
import FormUpIcon from 'grommet/components/icons/base/FormUp';
import FormDownIcon from 'grommet/components/icons/base/FormDown';
import FormEditIcon from 'grommet/components/icons/base/FormEdit';

class AccordionArrayField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layers: []
    };
  }

  _onAddClick(event) {
    this.setState({ layers: this.state.layers.concat([true])});
    this.props.onAddClick(event)
  }

  _onFormLayerClose(index) {
    console.log("_onFormLayerClose::", index)
    const layers = this.state.layers;
    layers[index] = false;
    this.setState({ layers: layers});
  }

  _showLayer(index) {
    const layers = this.state.layers;
    layers[index] = true;
    this.setState({ layers: layers});
  }

  render() {
    return (
          <Accordion animate={false} openMulti={false}>
            <AccordionPanel heading={this.props.header}>
              {
                this.props.items.length > 0 ?
                <Box colorIndex="light-2">
                  {this.props.items.map(element => element.children)}
                </Box>:
                <ListPlaceholder
                  addControl={<Button onClick={this.props._onAddClick.bind(this)} icon={<AddIcon />} />}
                  emptyMessage='You do not have any items at the moment.'
                  unfilteredTotal={0}/>
              }
            </AccordionPanel>
          </Accordion>
    );
  }
}

export default AccordionArrayField;
