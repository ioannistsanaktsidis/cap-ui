import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';

import Form from "react-jsonschema-form";

import FieldTemplate from './deposit/FieldTemplate';
import ObjectFieldTemplate from './deposit/ObjectFieldTemplate';
import LayerObjectFieldTemplate from './deposit/LayerObjectFieldTemplate';
import ArrayFieldTemplate from './deposit/ArrayFieldTemplate';
import ErrorListTemplate from './deposit/ErrorListTemplate';

import SectionHeader from './deposit/SectionHeader';
import DepositSidebar from './deposit/DepositSidebar';
import DepositHeader from './deposit/DepositHeader';
import DepositPreviewer from './deposit/DepositPreviewer';
import DepositForm from './deposit/Form';
import AvailableDeposits from './deposit/AvailableDeposits';

import CMSAnalysisUISchema from './uiSchemas/cms-analysis';
import testUISchema from './uiSchemas/testSchema';

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
import fields from './fields';

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

let uiSchemas = {
  CMSAnalysisSchema: CMSAnalysisUISchema,
  testSchema: testUISchema,
  // inspireSchema: inspireUISchema,
  // zenodoSchema: zenodoUISchema
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



// const fields = {
//   'layerObjectField': LayerObjectFieldTemplate
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
      liveValidate: false,
      validate: true,
      selectSchema: null,
      schema: {},
      uiSchema: {},
      layout: [true, true]
    };
  }

  _toggleAutoValidate() {
    this.setState(prevState => ({
      liveValidate: !prevState.liveValidate
    }));
  }

  _toggleValidate() {
    this.setState(prevState => ({
      validate: !prevState.validate
    }));
  }

  _changeSchema(event) {
    let schema = event.value ? event.value : event;

    console.log("_changeSchema::", schema)
    if (schemas[schema]){
      this.setState({
        formData: {},
        selectSchema: schemas[schema],
        schema: transformSchema(schemas[schema]),
        uiSchema: uiSchemas[schema] ?  uiSchemas[schema] : {}
      });
    }
  }

  _saveData() {
    console.log("--------_saveData-----------")
    console.log(this.state.formData);
    console.log("--------_saveData-----------")

    // this.form.submitButton.click();
  }

  _validate(formData, errors) {
    // console.log("_validate")
    // // errors.object_with_nested_objects.addError("BAM BOOOOM");
    // console.log(formData, errors);
    // console.log("_validate")

    return errors;

    // this.form.submitButton.click();
  }

  render() {
    return (
      <Box id="deposit-page" basis="full" flex={true}>
        <DepositHeader saveData={this._saveData.bind(this)}/>

        <Box flex={true} wrap={false} direction="row">
          <Box direction="row" full={false} flex={true}>
            <DepositSidebar
              files={[]}
              schemas={schemas}
              validate={this.state.validate}
              liveValidate={this.state.liveValidate}
              onChangeSchema={this._changeSchema.bind(this)}
              onValidateChange={this._toggleValidate.bind(this)}
              onLiveValidateChange={this._toggleAutoValidate.bind(this)} />


            <Box direction="row" flex={true} wrap={false}>
              <DepositForm
                formData={this.state.formData}
                selectSchema={this.state.selectSchema}
                schema={this.state.schema}
                uiSchema={this.state.uiSchema}
                schemas={schemas}
                changeSchema={this._changeSchema.bind(this)}
                onChange={(change) => {
                  console.log("CHANGE::",change);
                  this.setState({formData: change.formData})
                }}
              />
              <DepositPreviewer data={this.state.formData} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}


DepositPage.propTypes = {
  // actions: PropTypes.object.isRequired,
  // fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    showSidebar: state.deposit.get('showSidebar')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFilemanagerLayer: () => dispatch(toggleFilemanagerLayer())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositPage);
