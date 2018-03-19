import React from 'react';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';

const CheckBoxWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.currentTarget.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };
  let _errors = null;
  // if (props.rawErrors.length > 0)
  //   _errors = props.rawErrors.map(error => <span>{error}</span>)

  console.log("CheckBox::::::", props)
  return (
    <FormField
      help={props.schema.description ? props.schema.description : null}
      label={props.schema.title}
      error={_errors}>
      {
        props.options.enumOptions.length > 0 ?
        props.options.enumOptions.map( item => (
          <CheckBox
            key={item.value}
            id={item.value}
            inline="true"
            name={item.label}
            label={item.value}
            value={item.value}
            checked={(props.value == item.value)}
            onChange={_onChange} />
        )) : null
      }
    </FormField>
  );
};


export default CheckBoxWidget;