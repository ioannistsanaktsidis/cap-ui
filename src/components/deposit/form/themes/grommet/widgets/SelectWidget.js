import React from 'react';

import { Box, Select } from 'grommet';

const SelectWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    let value = _ref.value.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };

  return (
    <Box flex={true} pad={{"horizontal": "medium"}}>
      <Select
        placeHolder="None"
        inline={false}
        multiple={false}
        options={props.options.enumOptions}
        value={props.value}
        onBlur={props.onBlur}
        onChange={_onChange} />
    </Box>
  );
};


export default SelectWidget;

// return (
//   <Box flex={true}>
//     <FormField
//       label={props.label}
//       help={props.schema.description}>

//       <Select placeHolder='None'
//         inline={false}
//         multiple={false}
//         options={props.options.enumOptions}
//         value={props.value}
//         onBlur={props.onBlur}
//         onChange={_onChange} />
//     </FormField>
//   </Box>
// );