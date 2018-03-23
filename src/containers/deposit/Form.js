import React from 'react';

import {connect} from 'react-redux';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';

import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Sidebar from 'grommet/components/Sidebar';
import Select from 'grommet/components/Select';
import UploadIcon from 'grommet/components/icons/base/Upload';

import ReactJson from 'react-json-view'

import {toggleFilemanagerLayer} from '../../actions/deposit';

import SectionHeader from './SectionHeader';
import DepositFilesList from './DepositFilesList';

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
      liveValidate: false,
      validate: true,
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
                liveValidate={this.state.liveValidate}
                noValidate={!this.state.validate}
                onError={console.log("errors")}
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
    showSidebar: state.deposit.get('showSidebar')
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
