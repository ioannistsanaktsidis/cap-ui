import React from 'react';

import {connect} from 'react-redux';

import {
  Box,
  FormField,
  Anchor,
  Button,
  CheckBox,
  Sidebar,
  Select,
} from 'grommet';

import UploadIcon from 'grommet/components/icons/base/Upload';

import ReactJson from 'react-json-view'

import {toggleFilemanagerLayer} from '../../actions/deposit';

import SectionHeader from './SectionHeader';
import DepositFilesList from './DepositFilesList';

// Customized RJSF component ( Grommet )
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import LayerObjectFieldTemplate from './LayerObjectFieldTemplate';
import ArrayFieldTemplate from './ArrayFieldTemplate';
import ErrorListTemplate from './ErrorListTemplate';


import widgets from '../widgets';
import fields from '../fields';

import Form from "react-jsonschema-form";

import AvailableDeposits from './AvailableDeposits';

class DepositForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {}
    };
  }

  _validate(formData, errors) {

    errors["simple_number"].addError("I don't like it");
    errors["object_with_nested_objects"]["nested_array_of_objects"][0]["second_number"].addError("I don't like it 2");

    return errors;
  }

  render() {
    return (
      <Box size={{width: {min: "large"}}} flex={true}  wrap={false}>
        <SectionHeader label="Submission Form" />
        <Box alignContent="center" justify="center" align="center" flex={true} wrap={false}>
          <Box size="xlarge"  pad="large" flex={false} wrap={false}>
            {
              this.props.selectSchema ?
              <Form
                ref={(form) => {this.form=form;}}
                schema={this.props.schema}
                FieldTemplate={FieldTemplate}
                ObjectFieldTemplate={ObjectFieldTemplate}
                ArrayFieldTemplate={ArrayFieldTemplate}
                showErrorList={true}
                ErrorList={ErrorListTemplate}
                widgets={widgets}
                fields={fields}
                uiSchema={this.props.uiSchema}
                liveValidate={this.props.liveValidate}
                noValidate={!this.props.validate}
                validate={this.props.customValidation ? this._validate : null}
                onError={(e) => console.log("errors", e)}
                formData={this.props.formData}
                onBlur={(type) => {
                  console.log("onBlur::::",type);
                  // this.setState({formData: change.formData})
                }}
                onChange={this.props.onChange}>
                <Box></Box>
              </Form> :
              <AvailableDeposits schemas={this.props.schemas} selectSchema={this.props.changeSchema}/>
            }
          </Box>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    showSidebar: state.deposit.get('showSidebar'),
    customValidation: state.deposit.get('customValidation'),
    liveValidate: state.deposit.get('liveValidate'),
    validate: state.deposit.get('validate'),
    schema: state.deposit.get('schema'),
    uiSchema: state.deposit.get('uiSchema'),
    data: state.deposit.get('data'),
    selectedSchema: state.deposit.get('selectedSchema')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFilemanagerLayer: () => dispatch(toggleFilemanagerLayer())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositForm);
