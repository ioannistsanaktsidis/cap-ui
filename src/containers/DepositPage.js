import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Form from "react-jsonschema-form";
import SplitPane from 'react-split-pane';
// import PhysicsObjectsField from './deposit/physicsObjectsField';
import TextWidget from './deposit/default/widgets/TextWidget';
import FieldTemplate from './deposit/FieldTemplate';
import ObjectFieldTemplate from './deposit/ObjectFieldTemplate';
import ArrayFieldTemplate from './deposit/ArrayFieldTemplate';
// import '../styles/resizer.scss';
// import CMSAnalysisSchema from './schemas/cms-analysis';
import CMSAnalysisSchema from './schemas/cms-analysis2';
// import physicsObjectsSchema from './schemas/physicsObjectsSchema';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';

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



const CustomCheckbox = function(props) {
  return (
    <FormField
      label={props.label}
      help={props.schema.description}
    >
      <div>{JSON.stringify(Object.keys(props))}</div>
      <TextInput id='item1'
        name='item-1'
        placeHolder={props.placeholder}
        suggestions={[]}
        onChange={(bb) => props.onChange(bb)}/>

    </FormField>
  );
};


const fields = {
  // text: CustomCheckbox,


  // StringField: CustomCheckbox

  // PhysicsObjectsField: PhysicsObjectsField
};

const widgets = {
  text: CustomCheckbox
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
    return (
      <Box full={true}>
        <SplitPane split="vertical" minSize="50%">
         <Box full={true} pad="small">
           <Header>
            <Heading>
              {schemaTitle}
            </Heading>
            <Paragraph size='small'>
              {(schemaDescription)}
            </Paragraph>
          </Header>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            FieldTemplate={FieldTemplate}
            ObjectFieldTemplate={ObjectFieldTemplate}
            widgets={widgets}
            fields={fields}
            onSubmit={log("submitted")}
            onError={log("errors")}
            onBlur={(type) => {
              console.log(type);
              // this.setState({formData: change.formData})
            }}
            onChange={(type) => {
              console.log("CHANGE::",type);
              // this.setState({formData: change.formData})
            }}

          />
         </Box>
         <Box full={true} style={{backgroundColor: "#fff"}}>
           {JSON.stringify(this.state.formData, null, 4)}
         </Box>
        </SplitPane>
      </Box>
    );
  }
}


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
