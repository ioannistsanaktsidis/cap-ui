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
import ErrorListTemplate from './deposit/ErrorListTemplate';
import SectionHeader from './deposit/SectionHeader';

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

let schemaTitle = schema.title ? schema.title : "Deposit";
let schemaDescription = schema.description ? schema.description : null;

schema.properties = _.omit(schema.properties, schemaFieldsToRemove);
schema = { type: schema.type, properties: schema.properties };

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
      formData: {}
    };
  }

  render() {
    return (
      <Box id="deposit-page" basis="full" flex={true}>
        <Header pad="small" colorIndex="neutral-4">
          <Box>{schemaTitle}</Box>
          <Box>{(schemaDescription)}</Box>
          <Box></Box>
        </Header>

        <Box flex={true} wrap={false} direction="row">
          <Box direction="row" full={false} flex={true}>
            <Sidebar full={false} size="medium" colorIndex='light-2'>
              <Box flex={true}>
                <SectionHeader label="Code" icon={<UploadIcon />} />
              </Box>
              <Box flex={true}>
                <SectionHeader label="Form Data" icon={<UploadIcon />} />
              </Box>
            </Sidebar>

            <Box direction="row" flex={true} wrap={false}>
              <Box size={{width: {min: "large"}}} flex={true} wrap={false}>
                <Box alignSelf="center" pad="large" wrap={false}>
                  <Form
                    schema={schema}
                    FieldTemplate={FieldTemplate}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    ArrayFieldTemplate={ArrayFieldTemplate}
                    showErrorList={true}
                    ErrorList={ErrorListTemplate}
                    widgets={widgets}
                    fields={fields}
                    uiSchema={uiSchema}
                    liveValidate={true}
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

              <Sidebar full={false} size="large" colorIndex='light-2'>
                <Box flex={true}>
                  <SectionHeader label="Form Data" icon={<UploadIcon />} />
                  <Box pad="small">
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
