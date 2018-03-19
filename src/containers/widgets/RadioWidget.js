import React from 'react';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import RadioButton from 'grommet/components/RadioButton';

const RadioWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.currentTarget.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };

  return (
    <Box direction="row" pad={{horizontal: "medium"}} flex={false}>
      {
        props.options.enumOptions.length > 0 ?
        props.options.enumOptions.map( item => (
          <RadioButton
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
    </Box>
  );
};


export default RadioWidget;