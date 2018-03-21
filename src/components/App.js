/* eslint-disable import/no-named-as-default */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import WelcomePage from './WelcomePage';
import AboutPage from './AboutPage';
import IndexPage from './IndexPage';
import NotFoundPage from './NotFoundPage';
import SearchPage from '../containers/SearchPage';
import DepositPage from '../containers/DepositPage';

import requireAuth from './auth/AuthorizationRequired';
import noRequireAuth from './auth/NoAuthorizationRequired';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div id="app-main">
        <div id="main-container">
         <Switch id="main-container">
            <Route exact path="/" component={requireAuth(IndexPage, true)} />
            <Route path="/login" component={noRequireAuth(WelcomePage)} />
            <Route path="/about" component={AboutPage} />
            <Route path="/search" component={requireAuth(SearchPage, true)} />
            <Route path="/deposit" component={requireAuth(DepositPage, true)} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;