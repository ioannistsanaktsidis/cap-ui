import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import Split from 'grommet/components/Split';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Spinning from 'grommet/components/icons/Spinning';


import {login, logout} from '../actions/auth';

import LoginIcon from 'grommet/components/icons/base/Login';
// import HomeImage from '../imgs/home_image';
// import SVGIcon from 'grommet/components/SVGIcon'

import { Link } from 'react-router-dom';

export class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("inde page")
    // if (!this.props.isLoggedIn) this.props.history.push('/welcome')
  }

  // _login() {
  //   this.props.login();
  // }

  render() {
    return (
      <Box flex={true}>
        <Box flex={true} colorIndex="neutral-1-a" justify="center" align="center">
          <Section>
            <Box size="large">
              <Heading tag="h2"> HELLOOOOO </Heading>
              {
                this.props.isLoggedIn ?
                <Button
                  label="Logout"
                  onClick={this.props.logout} /> : null
              }
              {
                !this.props.isLoggedIn ?
                <Button
                  label="Login"
                  onClick={this.props.login} /> : null
              }
            </Box>
          </Section>
        </Box>
      </Box>
    );
  }
}

IndexPage.propTypes = {
  // isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.get('isLoggedIn'),
    token: state.auth.get('token'),
    authLoading: state.auth.get('loading')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
