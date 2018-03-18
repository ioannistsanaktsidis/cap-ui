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
import FieldHeader from './FieldHeader';
import FormLayer from './FormLayer';

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
        <Box size={{height: "small"}} colorIndex="light-2">
          <Accordion animate={false} openMulti={true}>
            { this.props.items.length > 0 ?
              this.props.items.map(element => (
                <AccordionPanel heading={(
                  <div>
                    <Title>{this.props.title}{this.props.required ? "*" : null}
                      {
                        this.props.canAdd ?
                        <Button
                          icon={<AddCircleIcon />}
                          onClick={this.props.onAddClick}
                          href='#'
                          plain={false}
                          critical={false}
                          accent={false}
                          secondary={false}
                          primary={false}
                          type='submit' /> : null
                      }
                    </Title>
                   {this.props.description ? <Paragraph size='small'>{this.props.description}</Paragraph> : null}
                 </div>)}>
                 <Box>
                   {this.props.items.map(element => element.children)}
                 </Box>
               </AccordionPanel>
              )) :
              <ListPlaceholder
                addControl={<Button onClick={this.props._onAddClick.bind(this)} icon={<AddIcon />} />}
                emptyMessage='You do not have any items at the moment.'
                unfilteredTotal={0}/>
            }
          </Accordion>
        </Box>
    );
  }
}

export default AccordionArrayField;

    // <Box className="grommetux-form-field" style={{padding: "10px"}}>
    //   <Accordion animate={false} openMulti={true}>
    //     <AccordionPanel pad="large" heading={(
    //       <div>
    //         <Title>{props.title}{props.required ? "*" : null}
    //         {props.canAdd &&
    //         <Button icon={<AddCircleIcon />}
    //           onClick={props.onAddClick}
    //           href='#'
    //           plain={false}
    //           critical={false}
    //           accent={false}
    //           secondary={false}
    //           primary={false}
    //           type='submit' />}</Title>
    //         {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
    //       </div>)}>
    //       <Box>
    //         {props.items.map(element => element.children)}
    //       </Box>
    //     </AccordionPanel>
    //   </Accordion>
    // </Box>



// <div>
//   <Header>
//     <Title>{props.title}{props.required ? "*" : null}</Title>
//     {props.canAdd &&
//     <Button icon={<AddCircleIcon />}
//       onClick={props.onAddClick}
//       href='#'
//       plain={false}
//       critical={false}
//       accent={false}
//       secondary={false}
//       primary={false}
//       type='submit' />}
//     {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
//   </Header>
//   {props.items.map(element => element.children)}
// </div>