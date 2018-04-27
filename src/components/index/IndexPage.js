import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box flex={true}>
        <Box flex={true} colorIndex="neutral-1-a" justify="center" align="center">
          <Section>
            <Box size="large">
              {
                this.props.currentUser ?
                <Heading tag="h2"> Hello, {this.props.currentUser.get('email')}</Heading> :
                null
              }
            </Box>
          </Section>
        </Box>
      </Box>
    );
  }
}

IndexPage.propTypes = {
  currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.getIn(['currentUser', 'profile'])
  };
}

export default connect(
  mapStateToProps
)(IndexPage);
