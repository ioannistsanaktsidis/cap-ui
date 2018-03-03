import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

let actions = {};
import Legend from 'grommet/components/Legend';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';


import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import NextIcon from 'grommet/components/icons/base/Next';
import PreviousIcon from 'grommet/components/icons/base/Previous';
import Sort from 'grommet-addons/components/Sort';

import "searchkit/theming/theme.scss";

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    if (this.props.results){
      return (
        <Box flex={true}>
        <List>
          {
            this.props.results.hits.map(item => (
              <ListItem key={item.id} >
                <Box>
                  <Header justify='between'>
                    <Title>{item.metadata.title.title}</Title>
                    <span  className='secondary'>
                      {item.created}
                    </span>
                  </Header>
                  <Paragraph size='medium'>
                    {item.metadata.title.title}
                  </Paragraph>
                </Box>
              </ListItem>
            ))
          }
        </List>
        </Box>
      );
    }
    else {
      return <div>No Results</div>
    }
  }
}

SearchResults.propTypes = {
  // actions: PropTypes.object.isRequired,
  // fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    // fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);