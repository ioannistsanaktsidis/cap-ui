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
import Label from 'grommet/components/Label';

import Sidebar from 'grommet/components/Sidebar';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import Layer from 'grommet/components/Layer';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import FieldHeader from '../components/FieldHeader';
import FormLayer from '../components/FormLayer';
import ArrayUtils from '../components/ArrayUtils';

import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import FormTrashIcon from 'grommet/components/icons/base/FormTrash';
import FormUpIcon from 'grommet/components/icons/base/FormUp';
import FormDownIcon from 'grommet/components/icons/base/FormDown';
import FormEditIcon from 'grommet/components/icons/base/FormEdit';

class AccordionArrayField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box size={{height: {max: "small"}}} >
        <List>
          { this.props.items.length > 0 ?
            this.props.items.map(element => (
              <ListItem key={element.index} margin="none" pad="none">
                <Box flex={true}>
                  {element.children}
                </Box>
                <ArrayUtils
                  hasRemove={element.hasRemove}
                  hasMoveDown={element.hasMoveDown}
                  hasMoveUp={element.hasMoveUp}
                  onDropIndexClick={element.onDropIndexClick}
                  onReorderClick={element.onReorderClick}
                  index={element.index}
                />
              </ListItem>
            )) : null
          }
        </List>
      </Box>
    );
  }
}

export default AccordionArrayField;