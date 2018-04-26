import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';

import {login, logout} from '../../actions/auth';
import {getPublishedItem} from '../../actions/published';



export class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {id} = this.props.match.params;

    this.props.getPublishedItem(id)
  }

  render() {
    return (
      <Box flex={true}>
        <Box flex={true} colorIndex="neutral-1-a"  align="center">
          <Section>
            <Box size="large">
              <Heading tag="h2"> Published, {this.props.match.params.id}</Heading>
              <hr/>
              {
                this.props.error ?
                <Box>
                  <Heading tag="h5">Errors</Heading>
                  <div>{JSON.stringify(this.props.error)}</div>
                </Box>: null
              }
              {
                this.props.item ?
                <Box>
                  <Heading tag="h5">Data</Heading>
                  <div>{JSON.stringify(this.props.item)}</div>
                </Box>: null
              }
            </Box>
          </Section>
        </Box>
      </Box>
    );
  }
}

IndexPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    item: state.published.getIn(['current_item', 'data']),
    error: state.published.getIn(['current_item', 'error']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    getPublishedItem: (id) => dispatch(getPublishedItem(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
