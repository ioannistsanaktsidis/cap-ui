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

class DepositSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.showSidebar ?
      <Sidebar full={false} size="medium" colorIndex='light-2'>
        <Box flex={true}>
          <SectionHeader
            label="Files | Data | Source Code"
            icon={
              <Box>
                <Anchor
                  onClick={this.props.toggleFilemanagerLayer}
                  size="xsmall"
                  icon={<UploadIcon />}></Anchor>
              </Box>
            } />
          <DepositFilesList />
        </Box>
        <Box flex={true}>
          <SectionHeader label="Form Actions"/>
          <Box pad="small"  flex={true}>
            <FormField>
              <Select placeHolder='None'
                options={Object.keys(this.props.schemas)}
                value={undefined}
                placeHolder="Choose schema to render"
                onChange={this.props.onChangeSchema}/>
            </FormField>
            <FormField>
              <CheckBox
                label='Validation'
                toggle={true}
                checked={this.props.validate}
                onChange={this.props.onValidateChange}
                />
            </FormField>
            <FormField>
              <CheckBox
                label='Live Validate'
                toggle={true}
                checked={this.props.liveValidate}
                onChange={this.props.onLiveValidateChange}
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
)(DepositSidebar);
