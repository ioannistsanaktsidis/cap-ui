import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {
  Anchor,
  Box,
  Button,
  Header,
  Menu
} from 'grommet';

import SplitIcon from 'grommet/components/icons/base/Split';
import SplitsIcon from 'grommet/components/icons/base/Splits';
import SaveIcon from 'grommet/components/icons/base/Save';

import { togglePreviewer, toggleSidebar } from '../../../actions/drafts';

class DepositHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header flex={true} size="small" pad="none" colorIndex="neutral-1-a">
        <Box flex={true}  direction="row" justify="between" align="center">
          <Box pad="small">{this.props.selectedSchema}</Box>
          <Box align="center" flex={true} >{(this.props.selectedSchema)}</Box>
          <Box colorIndex="neutral-1-a" direction="row">
            <Menu responsive={true}
              label="Layout"
              size="small"
              inline={false}>
              <Anchor icon={<SplitIcon/>} onClick={this.props.showPreviewer} />
              <Anchor icon={<SplitsIcon/>} onClick={this.props.showSidebar} />
            </Menu>
            <Button
              icon={<SaveIcon/>}
              plain={true}
              primary={true}
              label="Save"
              onClick={this.props.saveData}
            />
          </Box>
        </Box>
      </Header>
    );
  }
}

DepositHeader.propTypes = {
  selectedSchema: PropTypes.string,
  showPreviewer: PropTypes.func,
  saveData: PropTypes.func,
  showSidebar: PropTypes.func
};

function mapStateToProps(state) {
  return {
    selectedSchema: state.drafts.get("selectedSchema")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showPreviewer: () => dispatch(togglePreviewer()),
    showSidebar: () => dispatch(toggleSidebar())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositHeader);