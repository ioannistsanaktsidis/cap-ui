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
        <Select placeHolder='None'
          inline={false}
          multiple={false}
          options={props.options.enumOptions}
          value={props.value}
          onBlur={props.onBlur}
          onChange={_onChange} />
  );
};


export default SelectWidget;