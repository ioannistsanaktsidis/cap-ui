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
import SplitIcon from 'grommet/components/icons/base/Split';
import SplitsIcon from 'grommet/components/icons/base/Splits';
import SaveIcon from 'grommet/components/icons/base/Save';

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
    console.log("_changeSchema::", event.value)
    if (schemas[event.value]){
      this.setState({
        formData: {},
        schema: transformSchema(schemas[event.value]),
        uiSchema: uiSchemas[event.value] ?  uiSchemas[event.value] : {}
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
        <Header flex={true} size="small" pad="none" colorIndex="neutral-1-t">
          <Box flex={true}  direction="row" justify="between" align="center">
            <Box pad="small">{schemaTitle}</Box>
            <Box align="center" flex={true} >{(schemaDescription)}</Box>
            <Box direction="row">
              <Menu responsive={true}
                label='Layout'
                size='small'
                inline={false}>
                <Anchor icon={<SplitIcon/>} onClick={() => this.setState({layout: [true, false]})} />
                <Anchor icon={<SplitsIcon/>} onClick={() => this.setState({layout: [true, true]})} />
              </Menu>
              <Button
                icon={<SaveIcon/>}
                plain={true}
                primary={true}
                label="Save"
                onClick={this._saveData.bind(this)}
              />
            </Box>
          </Box>
        </Header>

        <Box flex={true} wrap={false} direction="row">
          <Box direction="row" full={false} flex={true}>
            {
              this.state.layout[0] ?
              <DepositSidebar
                files={[]}
                schemas={schemas}
                validate={this.state.validate}
                liveValidate={this.state.liveValidate}
                onChangeSchema={this._changeSchema.bind(this)}
                onValidateChange={this._toggleValidate.bind(this)}
                onLiveValidateChange={this._toggleAutoValidate.bind(this)}
              /> : null
            }


            <Box direction="row" flex={true} wrap={false}>
              <Box size={{width: {min: "large"}}} flex={true}  wrap={false}>
                <SectionHeader label="Submission Form" />
                <Box alignContent="center" justify="center" align="center" flex={true} wrap={false}>
                <Box size="xlarge"  pad="large" flex={false} wrap={false}>
                  <Form
                    ref={(form) => {this.form=form;}}
                    schema={this.state.schema}
                    FieldTemplate={FieldTemplate}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    ArrayFieldTemplate={ArrayFieldTemplate}
                    showErrorList={true}
                    ErrorList={ErrorListTemplate}
                    widgets={widgets}
                    fields={fields}
                    uiSchema={this.state.uiSchema}
                    liveValidate={this.state.liveValidate}
                    noValidate={!this.state.validate}
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
                  >
                    <Box></Box>
                  </Form>
                </Box>
              </Box>
              </Box>
            {
              this.state.layout[1] ?
              <Sidebar full={false} size="large" colorIndex='light-2'>
                <Box flex={true}>
                  <SectionHeader label="Form Data" icon={<UploadIcon />} />
                  <Box pad="small" flex={true}>
                    <ReactJson src={this.state.formData} />
                  </Box>
                </Box>
              </Sidebar> : null
            }
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
