import React from 'react';

import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

export default function ErrorListTemplate(props) {
  const {errors} = props;
  return (
    <Notification state={null}
      message='Information proved are not correct'
      timestamp={null}
      status='critical'
      closer={true} >
        <Accordion animate={false} openMulti={true}>
          <AccordionPanel>
            <List flex={false} size={{height: 10}}>
              {errors.map((error, i) => {
                return (
                  <ListItem key={i} justify='between'>
                    <span>
                      {error.property}
                    </span>
                    <span className='secondary'>
                      {error.message}
                    </span>
                  </ListItem>
                );
              })}
            </List>
          </AccordionPanel>
        </Accordion>
    </Notification>
  );
}


// export default function ErrorListTemplate(props) {
//   const {errors} = props;
//   return (
//     <Notification state={null}
//       message='Information proved are not correct'
//       timestamp={null}
//       status='critical' >
//     <List flex={false} size={{height: 10}}>
//       {errors.map((error, i) => {
//         return (
//           <ListItem key={i} justify='between'>
//             <span>
//               {error.property}
//             </span>
//             <span className='secondary'>
//               {error.message}
//             </span>
//           </ListItem>
//         );
//       })}
//     </List>
//     </Notification>
//   );
// }
