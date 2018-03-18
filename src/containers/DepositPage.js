import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';

import Form from "react-jsonschema-form";

import FieldTemplate from './deposit/FieldTemplate';
import ObjectFieldTemplate from './deposit/ObjectFieldTemplate';
import LayerObjectFieldTemplate from './deposit/LayerObjectFieldTemplate';
import ArrayFieldTemplate from './deposit/ArrayFieldTemplate';
import ErrorListTemplate from './deposit/ErrorListTemplate';
import SectionHeader from './deposit/SectionHeader';
import DepositSidebar from './deposit/DepositSidebar';

import CMSAnalysisSchema from './schemas/cms-analysis';
import testSchema from './schemas/testSchema';
import zenodoSchema from './schemas/zenodo';
import inspireSchema from './schemas/inspire';

import TextInput from 'grommet/components/TextInput';
import Select from 'grommet/components/Select';

import FormField from 'grommet/components/FormField';
import _Form from 'grommet/components/Form';
import Sidebar from 'grommet/components/Sidebar';
import Button from 'grommet/components/Button';

import ReactJson from 'react-json-view'

import DatabaseIcon from 'grommet/components/icons/base/Database';
import UploadIcon from 'grommet/components/icons/base/Upload';
import TreeIcon from 'grommet/components/icons/base/Tree';

import CheckBox from 'grommet/components/CheckBox';

import widgets from './widgets';

const log = (type) => console.log.bind(console, type);

let actions = {};

const schemaFieldsToRemove = [
  "_deposit",
  "_cap_status",
  "_buckets",
  "_files",
  "$ana_type",
  "$schema",
  "general_title",
  "_experiment"
];

// let schema = CMSAnalysisSchema;
let schema = testSchema;
// let schema = inspireSchema;
// let schema = zenodoSchema;
// let schema = physicsObjectsSchema;

let schemas = {
  CMSAnalysisSchema: CMSAnalysisSchema,
  testSchema: testSchema,
  inspireSchema: inspireSchema,
  zenodoSchema: zenodoSchema
}

let schemaTitle = schema.title ? schema.title : "Deposit";
let schemaDescription = schema.description ? schema.description : null;

schema.properties = _.omit(schema.properties, schemaFieldsToRemove);
schema = { type: schema.type, properties: schema.properties };

const transformSchema = (schema) => {
  const schemaFieldsToRemove = [
    "_deposit",
    "_cap_status",
    "_buckets",
    "_files",
    "$ana_type",
    "$schema",
    "general_title",
    "_experiment"
  ];

  schema.properties = _.omit(schema.properties, schemaFieldsToRemove);
  schema = { type: schema.type, properties: schema.properties };

  return schema;
}

const _TextWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };

  return (
    <Box flex={true}>
    <FormField
      label={props.label}
      help={props.schema.description}>
      <TextInput id='item1'
        name='item-1'
        placeHolder={props.placeholder}
        onDOMChange={_onChange}
        onBlur={props.onBlur}
        value={props.value}/>
    </FormField>
    </Box>
  );
};


const _SelectWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.value.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };

  return (
    <Box flex={true}>
      <FormField
        label={props.label}
        help={props.schema.description}>

        <Select placeHolder='None'
          inline={false}
          multiple={false}
          options={props.options.enumOptions}
          value={props.value}
          onBlur={props.onBlur}
          onChange={_onChange} />
      </FormField>
    </Box>
  );
};


const fields = {
  'layerObjectField': LayerObjectFieldTemplate
};

// const widgets = {
//   text: _TextWidget,
//   select: _SelectWidget
// };

const uiSchema = {
  // "ui:order": ["basic_info", "*"],
  // "basic_info": {
  //   "ui:object": "layerObjectField",
  //   os: {
  //     // "ui:object": "layerObjectField"
  //   }
  // }
  "object_with_nested_objects": {
    "nested_object": {
      "ui:object": "accordionObjectField"
    }
  },
  "basic_object": {
    "simple_number": {
      "ui:widget": "updown"
    }
  }
};

export class DepositPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      auto_validate: false,
      schema: {}
    };
  }

  _toggleAutoValidate() {
    this.setState(prevState => ({
      auto_validate: !prevState.auto_validate
    }));
  }

  _changeSchema(event) {
    console.log("_changeSchema::", event.value)
    if (schemas[event.value]){
      this.setState({schema: transformSchema(schemas[event.value])});
    }
  }

  render() {
    return (
      <Box id="deposit-page" basis="full" flex={true}>
        <Header flex={true} size="small" pad="none" colorIndex="neutral-1-t">
          <Box flex={true} pad={{horizontal: "small"}} direction="row" justify="between" align="center">
            <Box>{schemaTitle}</Box>
            <Box align="center" flex={true} >{(schemaDescription)}</Box>
            <Box>
              <Select placeHolder='None'
                options={Object.keys(schemas)}
                value={undefined}
                onChange={this._changeSchema.bind(this)}/>
            </Box>
            <Box>
              <CheckBox
                label='Live Validate'
                toggle={true}
                checked={this.state.auto_validate}
                onChange={this._toggleAutoValidate.bind(this)}
                />
            </Box>
          </Box>
        </Header>

        <Box flex={true} wrap={false} direction="row">
          <Box direction="row" full={false} flex={true}>
            <DepositSidebar formData={this.state.formData} />


            <Box direction="row" flex={true} wrap={false}>
              <Box size={{width: {min: "large"}}} flex={true}  wrap={false}>
                <SectionHeader label="Submission Form" />
                <Box alignContent="center" justify="center" align="center" flex={true} wrap={false}>
                <Box size="xlarge"  pad="large" flex={false} wrap={false}>
                  <Form
                    schema={this.state.schema}
                    FieldTemplate={FieldTemplate}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    ArrayFieldTemplate={ArrayFieldTemplate}
                    showErrorList={true}
                    ErrorList={ErrorListTemplate}
                    widgets={widgets}
                    fields={fields}
                    uiSchema={uiSchema}
                    liveValidate={this.state.auto_validate}
                    noValidate={false}
                    onError={log("errors")}
                    formData={this.state.formData}
                    onBlur={(type) => {
                      console.log("onBlur::::",type);
                      // this.setState({formData: change.formData})
                    }}
                    onChange={(change) => {
                      console.log("CHANGE::",change);
                      this.setState({formData: change.formData})
                    }}
                  />
                </Box>
              </Box>
              </Box>

              <Sidebar full={false} size="large" colorIndex='light-2'>
                <Box flex={true}>
                  <SectionHeader label="Form Data" icon={<UploadIcon />} />
                  <Box pad="small" flex={true}>
                    <ReactJson src={this.state.formData} />
                  </Box>
                </Box>
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
