import React from 'react';

import {
  Box,
  Button,
  List,
  ListItem,
} from 'grommet';


import FormLayer from '../components/FormLayer';

import FormTrashIcon from 'grommet/components/icons/base/FormTrash';
import FormUpIcon from 'grommet/components/icons/base/FormUp';
import FormDownIcon from 'grommet/components/icons/base/FormDown';
import FormEditIcon from 'grommet/components/icons/base/FormEdit';

class ArrayFieldTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layers: []
    };
  }

  _onAddClick(event) {
    this.setState({ layers: this.state.layers.concat([true])});
    this.props.onAddClick(event);
  }

  _onFormLayerClose(index) {
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
        <Box flex={false} size={{"height": {"max": "small"} }}>
          <List >
            { this.props.items.length > 0 ?
              this.props.items.map(element => (
                <ListItem key={element.index} flex={true} margin="none" pad="none" justify="between">
                  <FormLayer
                    layerActive={this.state.layers[element.index]}
                    onClose={this._onFormLayerClose.bind(this, element.index)}
                    properties={element.children}
                    remove={element.hasRemove ? element.onDropIndexClick(element.index) : null}
                  />
                  <Box flex={true} direction="row" wrap={false}>
                    <Box onClick={this._showLayer.bind(this, element.index)}  flex={true} pad="small">
                      {JSON.stringify(element.children.props.formData)}
                    </Box>
                    <Box direction="row" justify="between">
                      <Button
                        onClick={this._showLayer.bind(this)}
                        icon={<FormEditIcon />} />
                      <Button
                        onClick={element.hasRemove ? element.onDropIndexClick(element.index) : null}
                        icon={<FormTrashIcon />} />
                      <Button
                        onClick={element.hasMoveDown ? element.onReorderClick(element.index, element.index+1) : null}
                        icon={<FormDownIcon />} />
                      <Button
                        onClick={element.hasMoveUp ? element.onReorderClick(element.index, element.index-1) : null}
                        icon={<FormUpIcon />} />
                    </Box>
                  </Box>
                </ListItem>
              )) :
              null
              // <ListPlaceholder
              //   addControl={<Button onClick={this.props._onAddClick.bind(this)} icon={<AddIcon />} />}
              //   emptyMessage='You do not have any items at the moment.'
              //   unfilteredTotal={0}/>
            }
          </List>
        </Box>
    );
  }
}

export default ArrayFieldTemplate;

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