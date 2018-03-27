import React from 'react';

import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
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
import FieldHeader from '../components/FieldHeader';
import FormLayer from '../components/FormLayer';

import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import FormTrashIcon from 'grommet/components/icons/base/FormTrash';
import FormUpIcon from 'grommet/components/icons/base/FormUp';
import FormDownIcon from 'grommet/components/icons/base/FormDown';
import FormEditIcon from 'grommet/components/icons/base/FormEdit';

import LayerArrayField from './LayerArrayField';
import AccordionArrayField from './AccordionArrayField';
import DefaultArrayField from './DefaultArrayField';

class ArrayFieldTemplate extends React.Component {
  constructor(props) {
    super(props);

    // IF 'ui:array' is passed render accordingly
    // ELSE IF array items are short (NOT "array"/"object")
    // render without FormLayer (modal)
    // ELSE render the default way
    this.formRenderType = 'default';

    this.state = {
      layers: []
    };

    if ( "ui:array" in this.props.uiSchema ) {
      this.formRenderType = this.props.uiSchema['ui:array'];
    }
    else if (
        this.props.schema &&
        this.props.schema.items &&
        (['array', 'object'].indexOf(this.props.schema.items.type) != -1)
      ) {

      this.formRenderType = 'LayerArrayField';
    }
  }

  _onAddClick(event) {
    this.setState({ layers: this.state.layers.concat([true])});
    this.props.onAddClick(event)
  }

  _getArrayField(_label) {
    if (this.formRenderType == 'default') {
      return (
      <Box className="grommetux-form-field">
        {_label}
        <DefaultArrayField _onAddClick={this._onAddClick.bind(this)} {...this.props} />
      </Box>
      );
    }
    else if (this.formRenderType == 'LayerArrayField') {
      return (
        <Box className="grommetux-form-field">
          {_label}
          <LayerArrayField _onAddClick={this._onAddClick.bind(this)} {...this.props} />
        </Box>
      );
    }
    else if (this.formRenderType == 'AccordionArrayField') {
      return <AccordionArrayField header={_label} _onAddClick={this._onAddClick.bind(this)} {...this.props} />;
    }
    else {
      return <div>{this.props.schema.items.type}</div>;
    }
  }

  render() {
    let _label = (
      <FieldHeader
        title={this.props.title}
        required={this.props.required}
        description={this.props.description}
        onArrayAddClick={this._onAddClick.bind(this)}
        margin="none"

        />
    );

    return this._getArrayField(_label);

    // if (this.formRenderType == 'default') {
    //   return <DefaultArrayField {...this.props} />;
    // }
    // else if (this.formRenderType == 'LayerArrayField') {
    //   return <LayerArrayField {...this.props} />;
    // }
    // else if (this.formRenderType == 'AccordionArrayField') {
    //   return <AccordionArrayField {...this.props} />;
    // }
    // else {
    //   return <div>{this.props.schema.items.type}</div>;
    // }
  }
}

export default ArrayFieldTemplate;


                // <ListItem onClick={this._showLayer.bind(this, element.index)} key={element.index} flex={true} justify='between'>
                //   <FormLayer
                //     layerActive={this.state.layers[element.index]}
                //     onClose={this._onFormLayerClose.bind(this, element.index)}
                //     properties={element.children}
                //   />
                //   <Box flex={true} direction="row" wrap={false}>
                //     <Box flex={true} pad="small">
                //       {JSON.stringify(element.children.props.formData)}
                //     </Box>
                //     <Box direction="row" justify="between">
                //       <Button
                //         onClick={this._showLayer.bind(this)}
                //         icon={<FormEditIcon />} />
                //       <Button
                //         onClick={element.hasRemove ? element.onDropIndexClick(element.index) : null}
                //         icon={<FormTrashIcon />} />
                //       <Button
                //         onClick={element.hasMoveDown ? element.onReorderClick(element.index, element.index+1) : null}
                //         icon={<FormDownIcon />} />
                //       <Button
                //         onClick={element.hasMoveUp ? element.onReorderClick(element.index, element.index-1) : null}
                //         icon={<FormUpIcon />} />
                //     </Box>
                //   </Box>
                // </ListItem>






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