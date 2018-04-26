import React from 'react';

import {connect} from 'react-redux';

import {
  Box
} from 'grommet';

import {toggleFilemanagerLayer} from '../../../actions/drafts';

// Customized RJSF component ( Grommet )
import FieldTemplate from './themes/grommet/templates/FieldTemplate';
import ObjectFieldTemplate from './themes/grommet/templates/ObjectFieldTemplate';
import ArrayFieldTemplate from './themes/grommet/templates/ArrayFieldTemplate';
import ErrorListTemplate from './themes/grommet/templates/ErrorListTemplate';

import SectionHeader from '../components/SectionHeader';

import widgets from './themes/grommet/widgets';
import fields from './themes/grommet/fields';

import Form from "react-jsonschema-form";

import AvailableDeposits from '../components/AvailableDeposits';

class DepositForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {}
    };
  }

  _validate(formData, errors) {
    // Example for custom validation
    // desc: traverse the error path in the 'errors' object
    // and add custom errors as below
    //
    // errors["simple_number"].addError("I don't like it");
    // errors["object_with_nested_objects"]["nested_array_of_objects"][0]["second_number"].addError("I don't like it 2");

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
                onError={({e}) => console.log("onError::::", e)}
                formData={this.props.formData}
                onBlur={({type}) => console.log("onBlur::::", type)}
                onChange={this.props.onChange}>
                <span />
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
    showSidebar: state.drafts.get('showSidebar'),
    customValidation: state.drafts.get('customValidation'),
    liveValidate: state.drafts.get('liveValidate'),
    validate: state.drafts.get('validate'),
    schema: state.drafts.get('schema'),
    uiSchema: state.drafts.get('uiSchema'),
    data: state.drafts.get('data'),
    selectedSchema: state.drafts.get('selectedSchema')
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
)(DepositForm);
