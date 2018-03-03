import React from 'react';

import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Header from 'grommet/components/Header';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import AddCircleIcon from 'grommet/components/icons/base/AddCircle';
import FormField from 'grommet/components/FormField';

import Sidebar from 'grommet/components/Sidebar';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

let ArrayFieldTemplate = function (props) {
  return (
    <Box className="grommetux-form-field" style={{padding: "10px"}}>
      <Accordion animate={false} openMulti={true}>
        <AccordionPanel pad="large" heading={(
          <div>
            <Title>{props.title}{props.required ? "*" : null}
            {props.canAdd &&
            <Button icon={<AddCircleIcon />}
              onClick={props.onAddClick}
              href='#'
              plain={false}
              critical={false}
              accent={false}
              secondary={false}
              primary={false}
              type='submit' />}</Title>
            {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
          </div>)}>
          <Box>
            {props.items.map(element => element.children)}
          </Box>
        </AccordionPanel>
      </Accordion>
    </Box>





  );
}

export default ArrayFieldTemplate;



// <div>
//   <Header>
//     <Title>{props.title}{props.required ? "*" : null}</Title>
//     {props.canAdd &&
//     <Button icon={<AddCircleIcon />}
//       onClick={props.onAddClick}
//       href='#'
//       plain={false}
//       critical={false}
//       accent={false}
//       secondary={false}
//       primary={false}
//       type='submit' />}
//     {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
//   </Header>
//   {props.items.map(element => element.children)}
// </div>