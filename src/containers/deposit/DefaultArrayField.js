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
import Label from 'grommet/components/Label';

import Sidebar from 'grommet/components/Sidebar';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import Layer from 'grommet/components/Layer';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import FieldHeader from './FieldHeader';
import FormLayer from './FormLayer';
import ArrayUtils from './ArrayUtils';

import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import FormTrashIcon from 'grommet/components/icons/base/FormTrash';
import FormUpIcon from 'grommet/components/icons/base/FormUp';
import FormDownIcon from 'grommet/components/icons/base/FormDown';
import FormEditIcon from 'grommet/components/icons/base/FormEdit';
// import AddIcon from 'grommet/components/icons/base/Add';

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

  // render() {
  //   return (
  //     <Box pad="large" className="grommetux-form-field" >
  //       <Header flex={true} alignContent="between">
  //         <FieldHeader
  //           title={this.props.title}
  //           required={this.props.required}
  //           description={this.props.description}
  //           />
  //         <Box flex={false}>
  //           <Button
  //             icon={ <AddCircleIcon /> }
  //             onClick={this._onAddClick.bind(this)}
  //             href='#'
  //             plain={false}
  //             critical={false}
  //             primary={false}/>
  //         </Box>
  //       </Header>
  //       <Box size={{height: "small"}} >
  //         <List>
  //           { this.props.items.length > 0 ?
  //             this.props.items.map(element => (
  //               <ListItem >
  //                 <Box flex={true}>
  //                   {element.children}
  //                 </Box>
  //               </ListItem>
  //             )) :
  //             <ListPlaceholder
  //               addControl={<Button onClick={this._onAddClick.bind(this)} icon={<AddIcon />} />}
  //               emptyMessage='You do not have any items at the moment.'
  //               unfilteredTotal={0}/>
  //           }
  //         </List>
  //       </Box>
  //     </Box>
  //   );
  // }


  render() {

    let _label = (
        <Label size="small">{this.props.title}
        <Button
          icon={ <AddCircleIcon /> }
          onClick={this._onAddClick.bind(this)}
          href='#'
          plain={false}
          critical={false}
          primary={false}/>
        </Label>
    );

    return (
      <Box colorIndex="light-2" size={{height: "small"}} >
        <List>
          { this.props.items.length > 0 ?
            this.props.items.map(element => (
              <ListItem >
                <Box flex={true}>
                  {element.children}
                </Box>
                <ArrayUtils
                  hasRemove={element.hasRemove}
                  hasMoveDown={element.hasMoveDown}
                  hasMoveUp={element.hasMoveUp}
                  onDropIndexClick={element.onDropIndexClick}
                  onReorderClick={element.onReorderClick}
                  index={element.index}
                />
              </ListItem>
            )) :
            <ListPlaceholder
              addControl={<Button onClick={this.props._onAddClick.bind()} icon={<AddIcon />} />}
              emptyMessage='You do not have any items at the moment.'
              unfilteredTotal={0}/>
          }
        </List>
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