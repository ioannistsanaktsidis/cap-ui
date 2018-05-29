import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {
  Anchor,
  Box,
  Button,
  Header,
  Label,
  Menu
} from 'grommet';

import SplitIcon from 'grommet/components/icons/base/Split';
import SplitsIcon from 'grommet/components/icons/base/Splits';
import SaveIcon from 'grommet/components/icons/base/Save';
import ShareIcon from 'grommet/components/icons/base/Share';
import TrashIcon from 'grommet/components/icons/base/Trash';
import RefreshIcon from 'grommet/components/icons/base/Refresh';
import ViewIcon from 'grommet/components/icons/base/View';
import MoreIcon from 'grommet/components/icons/base/More';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';
import SettingsOptionIcon from 'grommet/components/icons/base/SettingsOption';
import {withRouter} from 'react-router';

import { togglePreviewer, toggleSidebar } from '../../../actions/drafts';

const SettingsAnchor = withRouter(({ history, draft_id=draft_id }) => (
        <Anchor
          icon={<SettingsOptionIcon/>}
          plain={true}
          secondary={true}
          label="Settings"
          onClick={() => history.push(`/drafts/${draft_id}/settings`)} 
        />
    ))


class DepositHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  // getStatusBar() {
  //   if (this.props.loading ) {
  //     return [
  //       <Spinning colorIndex="neutral-1" />,
  //       this.props.message && this.props.message.msg
  //     ];
  //   }
  //   else if (this.props.message){
  //     return [
  //       <Status value={this.props.message.status} />,
  //       this.props.message && this.props.message.msg
  //     ]
  //   }

  // }

  render() {
    return (
      <Header flex={true} size="small" pad="none" colorIndex="neutral-1-a">
        <Box flex={true}  direction="row" justify="between" align="center">
          <Box justify="start" align="center" direction="row">
            <Menu responsive={false}
              label="Layout"
              inline={false}>
              <Anchor label="Files" onClick={this.props.showPreviewer} />
              <Anchor label="Previewer" onClick={this.props.showSidebar} />
            </Menu>
          </Box>
          <Box pad="small" flex={true} align="center" justify="center" direction="row" wrap={false}>
            {this.props.draftId} - {this.props.selectedSchema}
            {
              this.props.message &&
              <Box direction="row" pad={{horizontal: "small"}} align="center" justify="between">
              {[
                this.props.loading ?
                <Spinning colorIndex="neutral-1" /> :
                <Status value={this.props.message.status} />,
                this.props.message && <Box pad={{horizontal: "small"}}><Label  size="small">{this.props.message.msg}</Label></Box>
              ]}
              </Box>
            }
          </Box>
          <Box flex={false} >
            <Menu responsive={true}
              fill={true}
              label="Layout"
              direction="row"

              justify="center"
              align="center"
              inline={true}>
              {this.props.draft_id ?
                <SettingsAnchor draft_id={this.props.draft_id} />:null}
              <Anchor
                icon={<ShareIcon/>}
                plain={true}
                secondary={true}
                label="Share"
                onClick={this.props.draft_id ? this.props.publishData: null}
              />
              <Anchor
                icon={<SaveIcon/>}
                plain={true}
                label="Save"
                onClick={this.props.saveData}
              />
              <Menu responsive={true}
                icon={<MoreIcon />}

                justify="center"
                inline={false}>
                  <Anchor
                    label="Delete"
                    icon={<TrashIcon/>}
                    onClick={this.props.draft_id ? this.props.deleteDraft: null}
                    primary={true}
                  />
                  <Anchor
                    icon={<RefreshIcon/>}
                    plain={true}
                    secondary={true}
                    label="Discard"
                    onClick={this.props.discardData}
                  />

              </Menu>
            </Menu>
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
  publishData: PropTypes.func,
  showSidebar: PropTypes.func
};

function mapStateToProps(state) {
  return {
    selectedSchema: state.drafts.get("selectedSchema"),
    draft_id: state.drafts.getIn(['current_item', 'id']),
    loading: state.drafts.getIn(['current_item', 'loading']),
    message: state.drafts.getIn(['current_item', 'message']),
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