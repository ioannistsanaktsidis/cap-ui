import React from 'react';

import {connect} from 'react-redux';

import Box from 'grommet/components/Box';

import Tabs from 'grommet/components/Tabs';
import Title from 'grommet/components/Title';
import Tab from 'grommet/components/Tab';
import Header from 'grommet/components/Header';
import Layer from 'grommet/components/Layer';
import Sidebar from 'grommet/components/Sidebar';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';

import {toggleFilemanagerLayer} from '../../../actions/deposit';

import FileList from './FileList';

import Dropzone from 'react-dropzone';

const FileManagerDropzone = () => {
  return (
    <Box flex={true} >
      <Dropzone
        onDrop={(acceptedFiles, rejectedFiles) => {
          console.log("Dropped some files:::");
          console.log(acceptedFiles);
          console.log(rejectedFiles);
          console.log(":::::::::::::::::::::");
        }}
      >
        Try dropping some files here, or click to select files to upload.
      </Dropzone>
    </Box>
  );
};

class FileManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.activeLayer ?
      <Layer
        closer={true}
        align="center"
        flush={true}
        overlayClose={true}
        onClose={this.props.toggleFilemanagerLayer}
        >
        <Article size="xlarge">

          <Box direction="row" size="xlarge" flex={true} wrap={false}>
            <Sidebar size="small" full={false} colorIndex="light-2">
              <Header>
                <Box pad={{horizontal: "small"}}>
                  <Title>File Manager</Title>
                </Box>
              </Header>
              <Box pad="small" colorIndex="light-2">
                <FileList />
              </Box>
            </Sidebar>

            <Box size="large" flex={true}>
              <Tabs>
                <Tab title="Upload File">
                  <Box pad="medium">
                    <Heading tag="h5" strong={true}>Upload from Local</Heading>
                    <Box margin={{bottom: "small"}}>
                      <FileManagerDropzone />
                    </Box>
                    <Heading tag="h5" strong={true}>Upload from URL</Heading>
                    <Box>
                      <FormField
                        label="URL to upload">
                        <TextInput />
                      </FormField>
                    </Box>
                  </Box>
                </Tab>
                <Tab title="Repo Upload">
                  <Box pad="medium">
                    <Heading tag="h5" strong={true}>Upload from Gitlab CERN/Github</Heading>
                    <Box direction="row">
                      <Form>
                      <FormField
                        label="Location">
                        <Select
                          placeHolder="None"
                          options={["CERN Gitlab", "Github"]}
                          value={undefined}
                        />
                      </FormField>
                      <Box direction="row">
                        <FormField
                          label="User/Organisation"
                          >
                          <TextInput placeHolder="johndoe"/>
                        </FormField>
                        <FormField
                          label="Repo">
                          <TextInput placeHolder="myanalysis"/>
                        </FormField>
                      </Box>
                      </Form>

                    </Box>
                  </Box>
                </Tab>
                <Tab title="Image Upload">
                  <Box pad="medium">
                    <Heading tag="h5" strong={true}>Upload your image container from CERN Gitlab</Heading>
                    <Box direction="row">
                      <Form>
                      <FormField
                        label="Location">
                        <Select
                          placeHolder="None"
                          options={["CERN Gitlab", "Github"]}
                          value={undefined}
                        />
                      </FormField>
                      <Box direction="row">
                        <FormField
                          label="User/Organisation"
                          >
                          <TextInput placeHolder="johndoe"/>
                        </FormField>
                        <FormField
                          label="Repo">
                          <TextInput placeHolder="myanalysis"/>
                        </FormField>
                      </Box>
                      </Form>
                    </Box>
                  </Box>
                </Tab>
              </Tabs>
            </Box>
          </Box>
        </Article>
      </Layer>
      : null
    );
  }
}

function mapStateToProps(state) {
  return {
    activeLayer: state.deposit.get("fileManagerActiveLayer")
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
)(FileManager);