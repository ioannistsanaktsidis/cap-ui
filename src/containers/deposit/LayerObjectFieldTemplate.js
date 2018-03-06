import React from 'react';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Header from 'grommet/components/Header';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';
import Edit from 'grommet/components/icons/base/Edit';

class LayerObjectFieldTemplate extends React.Component {
  constructor(props) {
    super(props);

    console.log("LLLL::::",this.props)
    // this.props.
    this.state = {
      layerActive: false
    };

  }


  _onClick() {
    this.setState({ layerActive: true })
  }

  render() {

    console.log(this.props.idSchema['$id'] == "root")
    if (this.props.idSchema['$id'] == "root" ) {
      return (
        <Box>
          {this.props.properties.map(prop => prop.content )}
        </Box>
      )
    }
    else {

      return (
        <Box className="grommetux-form-field" >
          <div>
            <Title>{this.props.title}{this.props.required ? "*" : null}</Title>

            {this.props.description ? <Paragraph size='small'>{this.props.description}</Paragraph> : null}

            <Button icon={<Edit />}
              label='Edit'
              onClick={this._onClick.bind(this)}/>
          </div>
          {
            this.state.layerActive ?
            <Layer
              closer={true}
              flush={true}
              onClose={()=>{this.setState({layerActive:false})}}
              overlayClose={true}
              >
              <Box pad="large" >
                {this.props.properties.map(prop => prop.content )}
              </Box>
            </Layer>
            :
            null
          }
        </Box>
      );
    }
  }
}

// let LayerObjectFieldTemplate = function (props) {
//   console.log(props);

//   if (props.idSchema['$id'] == "root" ) {
//     return (<Box>
//       {props.properties.map(prop => prop.content )}</Box>)
//   }
//   else {

//   return (
//     <Box className="grommetux-form-field" >
//       <Accordion animate={false} openMulti={true}>
//         <AccordionPanel pad="medium" heading={(
//           <div>
//             <Title>{props.title}{props.required ? "*" : null}</Title>
//             {props.description ? <Paragraph size='small'>{props.description}</Paragraph> : null}
//           </div>)}>
//           <Box>
//             {props.properties.map(prop => prop.content )}
//           </Box>
//         </AccordionPanel>
//       </Accordion>
//     </Box>
//   );
// }
// }

export default LayerObjectFieldTemplate;


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