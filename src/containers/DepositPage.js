import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Form from "react-jsonschema-form";

import FieldTemplate from './deposit/FieldTemplate';
import ObjectFieldTemplate from './deposit/ObjectFieldTemplate';
import LayerObjectFieldTemplate from './deposit/LayerObjectFieldTemplate';
import ArrayFieldTemplate from './deposit/ArrayFieldTemplate';

import CMSAnalysisSchema from './schemas/cms-analysis2';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';
import _Form from 'grommet/components/Form';
import Sidebar from 'grommet/components/Sidebar';
import Button from 'grommet/components/Button';


import DatabaseIcon from 'grommet/components/icons/base/Database';
import UploadIcon from 'grommet/components/icons/base/Upload';
import TreeIcon from 'grommet/components/icons/base/Tree';

const log = (type) => console.log.bind(console, type);

let actions = {};

const schemaFieldsToRemove = [
  "_deposit",
  "_cap_status",
  "_buckets",
  "_files"
];

let schema = CMSAnalysisSchema;
// let schema = physicsObjectsSchema;

let schemaTitle = schema.title ? schema.title : "Deposit";
let schemaDescription = schema.description ? schema.description : null;

schema.properties = _.omit(schema.properties, schemaFieldsToRemove);
schema = { type: schema.type, properties: schema.properties };

const _TextWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return props.onChange(value === "" ? options.emptyValue : value);
  };

  console.log("_TextWidget::::", props)
  return (

    <FormField
      label={props.label}
      help={props.schema.description}>
      <TextInput id='item1'
        name='item-1'
        placeHolder={props.placeholder}
        onDOMChange={_onChange}
        value={props.value}/>
    </FormField>
  );
};


const fields = {
  'layerObjectField': LayerObjectFieldTemplate
};

const widgets = {
  text: _TextWidget,
};

const uiSchema = {
  "basic_info": {
    "ui:object": "layerObjectField"
  }
};

export class DepositPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {}
    };
  }

  render() {
    return (
      <Box  basis="full" flex={true}>
        <Header colorIndex="neutral-4-t" >
          <Box>{schemaTitle}</Box>
          <Box>{(schemaDescription)}</Box>
          <Box></Box>
        </Header>
        <Box flex={true} wrap={false} direction="row">
          <Box direction="row" full={false} flex={true}>
            <Sidebar full={false} size="medium" colorIndex='light-2'>
              <Box flex={true}>
                <Header size="small" colorIndex="neutral-4-a" pad="small">
                  <Box flex={true}
                    justify='between'
                    alignContent='center'
                    direction='row'
                    responsive={false}>
                    <span>Code</span>
                  <Button size="xsmall" icon={<UploadIcon />}></Button>
                  </Box>
                </Header>
              </Box>
              <Box flex={true}>
                <Header size="small" colorIndex="neutral-4-a" pad="small">
                  <Box flex={true}
                    justify='between'
                    alignContent='center'
                    direction='row'
                    responsive={false}>
                    <span>Data</span>
                  <Button size="xsmall" icon={<UploadIcon />}></Button>
                  </Box>
                </Header>
              </Box>
            </Sidebar>

            <Box direction="row" flex={true} wrap={false}>
            <Box size={{width: {min: "large"}}} flex={true} wrap={false}>
              <Form
                schema={schema}
                FieldTemplate={FieldTemplate}
                ObjectFieldTemplate={ObjectFieldTemplate}
                ArrayFieldTemplate={ArrayFieldTemplate}
                widgets={widgets}
                fields={fields}
                uiSchema={uiSchema}
                onSubmit={log("submitted")}
                onError={log("errors")}
                onBlur={(type) => {
                  console.log(type);
                  // this.setState({formData: change.formData})
                }}
                onChange={(change) => {
                  console.log("CHANGE::",change);
                  // this.setState({formData: change.formData})
                }}
              />
            </Box>

              <Sidebar full={false} size="large" colorIndex='grey-2' pad="small">
              </Sidebar>

            </Box>

        </Box>

            </Box>
      </Box>
    );
  }
}

DepositPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositPage);
