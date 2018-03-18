import React from 'react';

import Box from 'grommet/components/Box';

import Button from 'grommet/components/Button';
import Sidebar from 'grommet/components/Sidebar';
import UploadIcon from 'grommet/components/icons/base/Upload';

import ReactJson from 'react-json-view'

import SectionHeader from './SectionHeader';
import DepositFilesList from './DepositFilesList';

class DepositSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Sidebar full={false} size="medium" colorIndex='light-2'>
        <Box flex={true}>
          <SectionHeader label="Files | Data | Source Code" icon={<UploadIcon />} />
          <DepositFilesList />
        </Box>
        <Box flex={true}>
          <SectionHeader label="Form Data" icon={<UploadIcon />} />
          <Box pad="small"  flex={true}>
            <ReactJson src={this.props.formData} />
          </Box>
        </Box>
      </Sidebar>
    );
  }
}

export default DepositSidebar;
