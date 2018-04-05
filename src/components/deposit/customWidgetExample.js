import React from 'react';

const MyCustomWidget = (props) => {
  return (
    <input type="text"
      className="custom"
      value={props.value}
      required={props.required}
      onChange={(event) => props.onChange(event.target.value)} />
  );
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
