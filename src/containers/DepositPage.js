import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Columns from 'grommet/components/Columns';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Form from "react-jsonschema-form";
import SplitPane from 'react-split-pane';

import FieldTemplate from './deposit/FieldTemplate';
import ObjectFieldTemplate from './deposit/ObjectFieldTemplate';
import ArrayFieldTemplate from './deposit/ArrayFieldTemplate';

import CMSAnalysisSchema from './schemas/cms-analysis2';
import App from 'grommet/components/App';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Sidebar from 'grommet/components/Sidebar';

const log = (type) => console.log.bind(console, type);

let actions = {};

const schemaFieldsToRemove = [
  "_deposit",
  "_cap_status",
  "_buckets",
  "_files"
]

let schema = CMSAnalysisSchema;
// let schema = physicsObjectsSchema;

let schemaTitle = schema.title ? schema.title : "Deposit";
let schemaDescription = schema.description ? schema.description : null;

schema.properties = _.omit(schema.properties, schemaFieldsToRemove)
schema = { type: schema.type, properties: schema.properties }
// Define the custom field component to use for the root object
const uiSchema = {
};

const _TextWidget = function(props) {
  // TOFIX onBlur, onFocus
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    console.log("booom:", value)
    return props.onChange(value === "" ? options.emptyValue : value);
  };

  return (
    <FormField
      label={props.label}
      help={props.schema.description}>
      <TextInput id='item1'
        name='item-1'
        placeHolder={props.placeholder}
        suggestions={[]}
        onDOMChange={_onChange}/>
    </FormField>
  );
};


const fields = {
  // text: TextWidget,


  // StringField: TextWidget

  // PhysicsObjectsField: PhysicsObjectsField
};

const widgets = {
  text: _TextWidget
  // PhysicsObjectsField: PhysicsObjectsField
};



export class DepositPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {}
    };
  }

  render() {
//     return (
//       <Box colorIndex="neutral-4-t" flex={true}>
// sdf
//       </Box>
//     )
    return (
      <Box  basis="full" flex={true}>
        <Header colorIndex="neutral-4-t" >
          <Box>{schemaTitle}</Box>
          <Box>{(schemaDescription)}</Box>
          <Box></Box>
        </Header>
        <Box flex={true} wrap={false} direction="row">
          <Box direction="row" full={false} fixed={false} flex={true}>
            <Sidebar full={false} size="medium" colorIndex='light-2'>
              <Box flex={true}>
                <Header>
                  Code
                </Header>
              </Box>
              <Box flex={true}>
                <Header>
                  Data
                </Header>
              </Box>
            </Sidebar>

            <Box fixed={false} direction="row" flex={true} wrap={false}>
            <Box   flex={true} wrap={false}>

                  <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    FieldTemplate={FieldTemplate}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    ArrayFieldTemplate={ArrayFieldTemplate}
                    widgets={widgets}
                    fields={fields}
                    onSubmit={log("submitted")}
                    onError={log("errors")}
                    onBlur={(type) => {
                      console.log(type);
                      // this.setState({formData: change.formData})
                    }}
                    onChange={(change) => {
                      console.log("CHANGE::",change);
                      // this.setState({formData: change.formData})
                    }}
                  />
            </Box>

              <Sidebar full={false} size="large" colorIndex='grey-2' pad="small">
              </Sidebar>

            </Box>

        </Box>

            </Box>
      </Box>
    );
  }
}


      // <Box basis="full" centered={false} full={true}>
      //   <Header pad="small" colorIndex="neutral-4-t" justify="between">
      //     <Box>{schemaTitle}</Box>
      //     <Box>{(schemaDescription)}</Box>
      //     <Box></Box>
      //   </Header>
      //   <Box full={true} direction="row">
      //     < full={true} fixed={true} size="large" colorIndex='light-2' pad="small">
      //       <Box>s
      //         <Header>Code</Header>
      //       </Box>
      //       <Box>
      //         <Header>Data</Header>
      //       </Box>
      //     </Sidebar>

      //     <Box full={true} alignContent="center" justify="center">
      //       <Box>
      //         <Form
      //           schema={schema}
      //           uiSchema={uiSchema}
      //           FieldTemplate={FieldTemplate}
      //           ObjectFieldTemplate={ObjectFieldTemplate}
      //           ArrayFieldTemplate={ArrayFieldTemplate}
      //           widgets={widgets}
      //           fields={fields}
      //           onSubmit={log("submitted")}
      //           onError={log("errors")}
      //           onBlur={(type) => {
      //             console.log(type);
      //             // this.setState({formData: change.formData})
      //           }}
      //           onChange={(change) => {
      //             console.log("CHANGE::",change);
      //             this.setState({formData: change.formData})
      //           }}

      //         />
      //       </Box>
      //     </Box>
      //     <Sidebar colorIndex='grey-1-a' pad="small"></Sidebar>
      //   </Box>
      // </Box>




DepositPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositPage);
