import React from 'react';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';

import Header from 'grommet/components/Header';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    if (this.props.results){
      // console.log("results::", this.props.results);
      return (
        <Box flex={true} colorIndex="light-2">
          <List >
            {
              this.props.results.map(item => (
                <ListItem key={item.id} >
                  <Box flex={true}>
                    <Header justify="between">
                      <Title>{item.metadata.title.title}</Title>
                      <span>
                        {item.created}
                      </span>
                    </Header>
                    <Paragraph size="medium">
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
      return <div>No Results</div>;
    }
  }
}

SearchResults.propTypes = {
  results: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     // actions: bindActionCreators(actions, dispatch)
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchResults);

export default SearchResults;