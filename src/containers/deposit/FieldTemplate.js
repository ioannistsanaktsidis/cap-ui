import React from 'react';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Header from 'grommet/components/Header';

// let FieldTemplate = function (props) {
//   const {id, classNames, label, help, required, description, rawErrors=[], children} = props;

//   console.log("FieldTemplate::", props)
//   return (
//     <div>
//       {children}
//       {rawErrors.map(error => <div><h1>{error}</h1></div>)}
//       {help}
//     </div>
//   );
// }

let FieldTemplate = function (props) {
  const {id, classNames, label, help, required, description, rawErrors=[], children} = props;
  let _errors = null;
  let _utils = null;


  if (rawErrors.length > 0)
    _errors = rawErrors.map(error => <span>{error}</span>)

  if ( ["array", "object"].indexOf(props.schema.type) > -1) {
    return (
      <span>{children}</span>
    )
  }

  return (
    <FormField
      help={description ? description : null}
      label={label}
      key={id}
      error={_errors}>
      {children}
    </FormField>
  );
}


export default FieldTemplate;