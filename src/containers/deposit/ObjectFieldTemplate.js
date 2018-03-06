import React from 'react';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Header from 'grommet/components/Header';

import AccordionFieldTemplate from './AccordionObjectField';
import LayerObjectFieldTemplate from './LayerObjectFieldTemplate';

let ObjectFieldTemplate = function (props) {
  console.log("$$$$$$:::",props);

  if (props.idSchema['$id'] == "root" ) {
    return (<Box>
      {props.properties.map(prop => prop.content )}</Box>)
  }
  else {
    if (props.uiSchema['ui:object'] == 'layerObjectField'){
      return <LayerObjectFieldTemplate {...props} />;
    }

    else {
      return <AccordionFieldTemplate {...props} />
    }
  }

  return null
}

// let ObjectFieldTemplate = function (props) {
//   console.log(props);

//   if (props.idSchema['$id'] == "root" ) {
//     return (<Box>
//       {props.properties.map(prop => prop.content )}</Box>)
//   }
//   else {
//     return (
//       <Box className="grommetux-form-field" >
//         <Accordion animate={false} openMulti={true}>
//           <AccordionPanel pad="medium" heading={(
//             <div>
//               <Title>{props.title}{props.required ? "*" : null}</Title>
//               {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
//             </div>)}>
//             <Box>
//               {props.properties.map(prop => prop.content )}
//             </Box>
//           </AccordionPanel>
//         </Accordion>
//       </Box>
//     );
//   }
// }


export default ObjectFieldTemplate;


// <Box style={{padding: "10px", border: "1px solid #f5f5f5"}}>
//   <Title>{props.title}{props.required ? "*" : null}</Title>
//   {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
//   {props.properties.map(prop => (
//       <Box
//         key={prop.content.key}>
//         {prop.content}
//       </Box>
//     ))}
// </Box>

// <Accordion animate={false} openMulti={true}>
//   <AccordionPanel heading={(
//     <Header>
//       <Title>{props.title}{props.required ? "*" : null}</Title>
//       {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
//     </Header>)}>
//       {props.properties.map(prop => (
//             <div>{prop.content}</div>
//         ))}
//   </AccordionPanel>
// </Accordion>