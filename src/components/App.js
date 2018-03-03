/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';
import SearchPage from '../containers/SearchPage';
import DepositPage from '../containers/DepositPage';

import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Header from './partials/Header';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div id="app-main">
        <Header id="header"/>
        <div id="main-container">
         <Switch id="main-container">
            <Route exact path="/" component={HomePage} />
            <Route path="/fuel-savings" component={FuelSavingsPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/deposit" component={DepositPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}


         // <Switch>
            // <Route exact path="/" component={HomePage} />
            // <Route path="/fuel-savings" component={FuelSavingsPage} />
            // <Route path="/about" component={AboutPage} />
            // <Route path="/search" component={SearchPage} />
            // <Route path="/deposit" component={DepositPage} />
            // <Route component={NotFoundPage} />
          // </Switch>




App.propTypes = {
  children: PropTypes.element
};

export default App;
