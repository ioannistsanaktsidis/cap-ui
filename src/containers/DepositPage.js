import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Box from 'grommet/components/Box';

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

import {startDeposit} from '../actions/deposit'
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
      const _schema = transformSchema(schemas[schema]);
      const uiSchema = uiSchemas[schema] ?  uiSchemas[schema] : {};

      this.props.startDeposit({ selectedSchema: schema, schema: _schema, uiSchema: uiSchema });

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
              onChangeSchema={this._changeSchema.bind(this)} />


            <Box direction="row" flex={true} wrap={false}>
              <DepositForm
                formData={this.state.formData}
                selectSchema={this.state.selectSchema}
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
    toggleFilemanagerLayer: () => dispatch(toggleFilemanagerLayer()),
    startDeposit: (schema, data) => dispatch(startDeposit(schema, data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositPage);
