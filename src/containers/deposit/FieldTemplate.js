import React from 'react';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';

let FieldTemplate = function (props) {
  const {id, classNames, label, help, required, description, rawErrors=[], children} = props;
  return (
    <div >
      {children}
      {rawErrors.map(error => <div style={{color: "blue"}}><h1>{error}</h1></div>)}
      {help}
    </div>
  );
}

export default FieldTemplate;