import React from 'react';
import {connect} from 'react-redux';

import {
  Box,
  FormField,
  Anchor,
  CheckBox,
  Sidebar,
  Select,
} from 'grommet';

import UploadIcon from 'grommet/components/icons/base/Upload';

import {
  toggleFilemanagerLayer,
  toggleCustomValidation,
  toggleLiveValidate,
  toggleValidate
} from '../../../actions/drafts';

import SectionHeader from './SectionHeader';
import DepositFilesList from './DepositFilesList';

class DepositSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.showSidebar ?
      <Sidebar full={false} size="medium" colorIndex="light-2">
        <Box flex={true}>
          <SectionHeader
            label="Files | Data | Source Code"
            icon={
              <Box>
                <Anchor
                  onClick={this.props.toggleFilemanagerLayer}
                  size="xsmall"
                  icon={<UploadIcon />} />
              </Box>
            } />
          <DepositFilesList />
        </Box>
        <Box flex={true}>
          <SectionHeader label="Form Actions"/>
          <Box pad="small"  flex={true}>
            <FormField>
              <Select
                options={Object.keys(this.props.schemas)}
                value={this.props.selectedSchema}
                placeHolder="Choose schema to render"
                onChange={this.props.onChangeSchema}/>
            </FormField>
            <FormField>
              <CheckBox
                label="Validation"
                toggle={true}
                checked={this.props.validate}
                onChange={this.props.toggleValidate}
                />
            </FormField>
            <FormField>
              <CheckBox
                label="Live Validate"
                toggle={true}
                checked={this.props.liveValidate}
                onChange={this.props.toggleLiveValidate}
                />
            </FormField>
            <FormField>
              <CheckBox
                label="Custom Validation"
                toggle={true}
                checked={this.props.customValidation}
                onChange={this.props.toggleCustomValidation}
                />
            </FormField>
          </Box>
        </Box>
      </Sidebar> : null
    );
  }
}

function mapStateToProps(state) {
  return {
    showSidebar: state.drafts.get('showSidebar'),
    customValidation: state.drafts.get('customValidation'),
    liveValidate: state.drafts.get('liveValidate'),
    validate: state.drafts.get('validate'),
    selectedSchema: state.drafts.get('selectedSchema')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFilemanagerLayer: () => dispatch(toggleFilemanagerLayer()),
    toggleLiveValidate: () => dispatch(toggleLiveValidate()),
    toggleCustomValidation: () => dispatch(toggleCustomValidation()),
    toggleValidate: () => dispatch(toggleValidate())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositSidebar);
