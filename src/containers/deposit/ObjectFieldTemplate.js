import React from 'react';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';

import AccordionFieldTemplate from './AccordionObjectField';
import LayerObjectFieldTemplate from './LayerObjectFieldTemplate';
import FieldHeader from './FieldHeader';

let ObjectFieldTemplate = function (props) {
  if ( props.idSchema.$id == "root" ) {
    return (
      <Box>
        {props.properties.map(prop => prop.content )}
      </Box>
    )
  }

  function _getObjectField() {
    if ( !('ui:object' in props.uiSchema) ) {
      return (
        <Box className="grommetux-form-field">
          <FieldHeader
            title={props.title}
            required={props.required}
            description={props.description}
            />
          {props.properties.map(prop => prop.content )}
        </Box>
      )
    }
    else {
      if (props.uiSchema['ui:object'] == 'layerObjectField'){
        return <LayerObjectFieldTemplate {...props} />;
      }
      else if (props.uiSchema['ui:object'] == 'accordionObjectField'){
        return <AccordionFieldTemplate {...props} />;
      }
      else {
        return <div {...props}>This object( <i>{props.title}</i>) can NOT be rendered.. Check implementaion</div>;
      }
    }
  }

  let _label = (
      <Heading size="small" tag="h6" margin="none" strong={true} >
        <span>{props.title}</span>
      </Heading>
  );

  return _getObjectField();
}

export default ObjectFieldTemplate;
