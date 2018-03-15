import React from 'react';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

const SelectWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.value.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };

  return (
    <Box flex={true}>
      <FormField
        label={props.label}
        help={props.schema.description}>

        <Select placeHolder='None'
          inline={false}
          multiple={false}
          options={props.options.enumOptions}
          value={props.value}
          onBlur={props.onBlur}
          onChange={_onChange} />
      </FormField>
    </Box>
  );
};


export default SelectWidget;