import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import TextInput from 'grommet/components/TextInput';

const TextWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    let value = _ref.target.value;
    return props.onChange(value === "" ? props.options.emptyValue : value);
  };

  return (
    <Box flex={true} pad={{"horizontal": "medium"}}>
      <TextInput
        id={props.id}
        name={props.id}
        placeHolder={props.placeholder}
        onDOMChange={_onChange}
        onBlur={props.onBlur}
        value={props.value ? props.value : ""}/>
    </Box>
  );
};

TextWidget.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  placeholder: PropTypes.string,

};

export default TextWidget;