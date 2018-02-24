import React from 'react';

import Box from 'grommet/components/Box';

let ArrayFieldTemplate = function (props) {
  return (
    <div>
      {props.items.map(element => element.children)}
      {props.canAdd && <button type="button" onClick={props.onAddClick}></button>}
    </div>
  );
}

export default ArrayFieldTemplate;