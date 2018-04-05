import React from 'react';

import { Box } from 'grommet';

import AccordionFieldTemplate from './AccordionObjectField';
import LayerObjectFieldTemplate from './LayerObjectFieldTemplate';
import FieldHeader from '../components/FieldHeader';

let ObjectFieldTemplate = function (props) {
  if ( props.idSchema.$id == "root" ) {
    return (
      <Box>
        {props.properties.map(prop => prop.content )}
      </Box>
    );
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
      );
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

  return _getObjectField();
};

export default ObjectFieldTemplate;
