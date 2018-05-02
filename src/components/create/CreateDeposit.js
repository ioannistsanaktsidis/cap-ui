import _ from 'lodash';
import React from 'react';

import {connect} from 'react-redux';

import {Box, Heading, Tiles, Tile, Paragraph} from 'grommet';

import _isEqual from 'lodash/isEqual';

import {startDeposit, fetchSchema} from '../../actions/drafts';
import DepositForm from '../deposit/form/Form';
import DepositHeader from '../deposit/components/DepositHeader';

import CMSAnalysisUISchema from '../deposit/uiSchemas/cms-analysis';
import testUISchema from '../deposit/uiSchemas/testSchema';

let uiSchemas = {
  "cms-analysis": CMSAnalysisUISchema,
};

const transformSchema = (schema) => {
  const schemaFieldsToRemove = [
    "_access",
    "_deposit",
    "_cap_status",
    "_buckets",
    "_files",
    "$ana_type",
    "$schema",
    "general_title",
    "_experiment",
    "control_number"
  ];

  schema.properties = _.omit(schema.properties, schemaFieldsToRemove);
  schema = { type: schema.type, properties: schema.properties };

  return schema;
};


export class CreateDeposit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
    };
  }

  componentDidMount() {
    if (this.props.match.params.schema_id)
      this.props.fetchSchema(this.props.match.params.schema_id);
  }

  _saveData() {
    console.log("--------_saveData-----------");
    console.log(this.state.formData);
    console.log("--------_saveData-----------");
  }

  render() {
    let _schema = transformSchema(this.props.payload);
    let schemaName =  this.props.schema;
    console.log("--------save-----------::", _schema, schemaName);
    return (
      <Box id="deposit-page" basis="full" flex={true}>
        <DepositHeader saveData={this._saveData.bind(this)}/>
          <Box direction="row" flex={true} wrap={false}>
          {
            this.props.payload ?
            <DepositForm
              formData={this.state.formData}
              schema={_schema}
              uiSchema={uiSchemas[schemaName] || {}}
              onChange={(change) => {
                console.log("CHANGE::",change);
                this.setState({formData: change.formData});
              }}
            /> : null
          }
          </Box>
      </Box>
    );
  }
}

CreateDeposit.propTypes = {};

function mapStateToProps(state) {
  return {
    schema: state.drafts.get('schemaToFetch'),
    payload: state.drafts.get('payload')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSchema: (schema) => dispatch(fetchSchema(schema)),
    startDeposit: (schema, data) => dispatch(startDeposit(schema, data)),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDeposit);
