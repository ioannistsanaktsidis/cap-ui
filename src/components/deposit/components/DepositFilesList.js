import React from 'react';
import PropTypes from 'prop-types';

import {
  Anchor,
  Box,
  Button,
  Label,
  Menu,
  List,
  ListItem,
} from 'grommet';

import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

import FileManager from './DepositFileManager';

import AddIcon from 'grommet/components/icons/base/Add';
import ArchiveIcon from 'grommet/components/icons/base/Archive';
import DocumentConfigIcon from 'grommet/components/icons/base/DocumentConfig';
import PieChartIcon from 'grommet/components/icons/base/PieChart';
import BookIcon from 'grommet/components/icons/base/Book';
import NoteIcon from 'grommet/components/icons/base/Note';
import MoreIcon from 'grommet/components/icons/base/More';

import prettyBytes from 'pretty-bytes';

class DepositFilesList extends React.Component {
  constructor(props) {
    super(props);
  }

  _getIcon(type) {
    const catToIcon = {
      archive: <ArchiveIcon type="status" size="xsmall"/>,
      configuration: <DocumentConfigIcon type="status" size="xsmall"/>,
      dataset: <PieChartIcon type="status" size="xsmall"/>,
      publication: <BookIcon type="status" size="xsmall"/>,
      plot: <PieChartIcon type="status" size="xsmall"/>,
    };

    return catToIcon[type] ? catToIcon[type] : <NoteIcon type="status" size="xsmall" />;
  }

  render() {
    const filesEmptyMessage =
      this.props.draftId ?
      "No files attached.." :
      "No files attached..This project has not yet been initiated. Please save or attach a file";

    return (
      <span>
      <FileManager
        item_id={this.props.item_id}
        files={this.props.files}
        bucket={this.props.bucket}
        activeLayer={this.props.fileManagerLayerActive}
        key="_file_manager"/>
      <List basis="full" flex="true">
        {
          this.props.files ?
          this.props.files.keySeq().toArray().map((filename) => {
            let file = this.props.files.get(filename)
            return (
            <ListItem key={file.key} justify="between" pad="none"  flex={true} >
              <Box direction="row" flex={true} justify="between">
                <Box  direction="row" flex={true}>
                  <Box justify="center" margin={{horizontal: "small"}}>
                    {<PieChartIcon type="status" size="xsmall"/> || this._getIcon(file.type)}
                  </Box>
                  <Box justify="center" margin={{right: "small"}}>
                    <Label justify="center" margin="none" size="small" truncate={true}> {file.key}</Label>
                  </Box>
                  <Box  justify="center" margin={{right: "small"}}>{prettyBytes(parseInt(file.size || "0"))}</Box>
                </Box>

                <Menu
                  responsive={true}
                  size="small"
                  dropAlign={{right: 'right', top: 'bottom'}}
                  icon={<MoreIcon size="xsmall" />}>
                    <Anchor href="#"
                      className="active">
                      Download
                    </Anchor>
                    <Anchor href="#">
                      More Info
                    </Anchor>
                </Menu>
              </Box>
            </ListItem>
            );
          }) :
          <ListPlaceholder
            emptyMessage={filesEmptyMessage}
            unfilteredTotal={0}/>
        }

      </List>
      </span>
    );
  }
}

DepositFilesList.propTypes = {
  fileManagerLayerActive: PropTypes.bool
};

export default DepositFilesList;
