import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Switch, Route} from 'react-router-dom';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';

import SearchPage from '../search/SearchPage';
import DepositPage from '../deposit/DepositPage';
import PublishedItem from '../published/PublishedItem';
import DraftsItem from '../drafts/DraftsItem';
import AboutPage from '../about/AboutPage';
import Header from '../partials/Header';
import CreateIndex from '../create/CreateIndex';
import SettingsIndex from '../settings/SettingsIndex';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("IndexPage::componentWillMount::", this.props)
    if (!this.props.isLoggedIn) {
      this.props.history.push({
        pathname: '/login',
        from: this.props.match.path
      });
    }
  }

  componentWillUpdate(nextProps) {
    console.log("IndexPage::componentWillUpdate::", this.props, nextProps)
    if (!nextProps.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  render() {
    console.log("IndexPage::componentWillUpdate::", this.props)
    return (
      <Box flex={true}>
        <Header />
        <Switch>
          <Route exact path="/" component={AboutPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/published/:id" component={PublishedItem} />
          <Route path="/drafts/:id" component={DraftsItem} />
          <Route path="/create" component={CreateIndex}/>
          <Route path="/settings" component={SettingsIndex}/>
        </Switch>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.get('isLoggedIn')
  };
}

export default withRouter(connect(mapStateToProps)(IndexPage));
