import React from 'react';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';

const UpDownWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };

  // return (
  //   <Box flex={true}>
  //   <FormField
  //     label={props.label}
  //     help={props.schema.description}>
  //     <NumberInput id='item1'
  //       name='item-1'
  //       step={null}
  //       min={null}
  //       max={null}
  //       onChange={_onChange}
  //       onBlur={props.onBlur}
  //       value={props.value}/>
  //   </FormField>
  //   </Box>
  // );

  return (
    <NumberInput id='item1'
      name='item-1'
      step={null}
      min={null}
      max={null}
      onChange={_onChange}
      onBlur={props.onBlur}
      value={props.value}/>
  );
};

export default UpDownWidget;