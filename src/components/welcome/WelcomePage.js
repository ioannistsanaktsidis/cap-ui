import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  Box,
  Sidebar,
  Button,
  Heading,
  Header,
  Section
} from 'grommet';

import Spinning from 'grommet/components/icons/Spinning';

import {login} from '../../actions/auth';

import LoginIcon from 'grommet/components/icons/base/Login';

export class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Box flex={true} direction="row">
            <Box flex={true} colorIndex="neutral-1-a" justify="center" align="center">
              <Section>
                <Box size="large">
                  <Heading tag="h2">
                    Welcome to the CERN
                    Analysis Preservation Portal.
                  </Heading>
                  <Heading tag="h3">
                    Our mission is to preserve the analyses
                    across all CERN experiments for years
                    to come...
                  </Heading>
                </Box>
              </Section>
            </Box>
            <Sidebar size="medium" justify="center" full={true}>
              <Box flex={true} justify="center" margin="medium">
                  <Header pad="small" justify="end" alignContent="end" align="end" textAlign="right">
                    { this.props.authLoading ? <Spinning /> :  null }
                  </Header>
                <Box flex={true} justify="center">
                  <Button
                    icon={<LoginIcon/>}
                    label="Log in with CERN"
                    onClick={this.props.login}
                  />
                </Box>
              </Box>
            </Sidebar>
        </Box>
      );
  }
}

WelcomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.get('isLoggedIn'),
    token: state.auth.get('token'),
    authLoading: state.auth.get('loading'),
    liveValidate: state.auth.get('liveValidate'),
    validate: state.auth.get('validate')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
