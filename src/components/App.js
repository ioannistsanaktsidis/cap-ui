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
import Header from './partials/Header';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

import {
  SearchkitManager,
  SearchkitProvider,
} from "searchkit";

// const searchkit = new SearchkitManager("https://pammbp.cern.ch:5000/api/records")
// const searchkit = new SearchkitManager("http://localhost:9200/");
const searchkit = new SearchkitManager("http://demo.searchkit.co/api/movies/")

class App extends React.Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <GrommetApp full={true} centered={false} id="main" style={{ backgroundColor: '#e5e5e5' }}>
          <Box full={true}>
            <Header></Header>
            <Box full={true}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/fuel-savings" component={FuelSavingsPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/deposit" component={DepositPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Box>
          </Box>
        </GrommetApp>
      </SearchkitProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
