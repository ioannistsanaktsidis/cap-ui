import React from 'react';
import PropTypes from 'prop-types';

const MyCustomWidget = (props) => {
  return (
    <input type="text"
      className="custom"
      value={props.value}
      required={props.required}
      onChange={(event) => props.onChange(event.target.value)} />
  );
};

MyCustomWidget.propTypes = {
  value: PropTypes.object,
  description: PropTypes.string,
  required: PropTypes.boolean,
  idSchema: PropTypes.object,
  uiSchema: PropTypes.object,
  properties: PropTypes.object,
  onChange: PropTypes.func,
};

export default MyCustomWidget;

// //////////// Usage ////////////////
//
// const widgets = {
//   myCustomWidget: MyCustomWidget
// };

// const uiSchema = {
//   "ui:widget": "myCustomWidget"
// }

// render((
//   <Form
//     schema={schema}
//     uiSchema={uiSchema}
//     widgets={widgets} />
// ), document.getElementById("app"));

// export default MyCustomWidget;
