import React from 'react';

import GrommetHeader from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Form from 'grommet/components/Form';
import Search from 'grommet/components/Search';
import Anchor from 'grommet/components/Anchor';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import queryString from 'query-string';
import UserIcon from 'grommet/components/icons/base/User';

import {fetchSearch} from '../../actions/search';
import config from '../../config';
import {login, logout} from '../../actions/auth';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  _onSearchSubmit(event) {
    // event.preventDefault();
    console.log("event:::", event)
    let query = event.target.value;
    let q = queryString.parse(window.location.search);
    q["q"] = query;

    const search_location = {
      pathname: `search`,
      search: `${queryString.stringify(q)}`,
      from: this.props.match.path
    }
    this.props.history.push(search_location);
  }

  render() {
    let onSearchInput = (event) => {
      let query = event.target.value;
      let q = queryString.parse(window.location.search);
      q["q"] = query;

      const location = {
        search: `${queryString.stringify(q)}`
      }
      // history.pushState(null, null, `?${queryString.stringify(q)}`);
      // this.props.history.push(location);

      this.props.fetchSearch(query)
    }

    return (
      <GrommetHeader fixed={true}  size="small" colorIndex="neutral-1" >


        <Box
          flex={true}
          pad={{horizontal: "small"}}
          justify='end'
          direction='row'
          responsive={false}>
        <Title>
          <Anchor
            path="/"
            label={ config.project.name || "Project Name" }
            />
        </Title>
        <Box flex={true} justify="center">
            <Search inline={true}
              flex="true"
              placeHolder="Search"
              dropAlign={{"right": "right"}}
              onDOMChange={onSearchInput}
              onSelect={this._onSearchSubmit.bind(this)}
              />

            </Box>
        <Menu pad={{horizontal: "small"}} direction="row" responsive={true}>
          <Anchor path={{path:"/deposit"}}>Deposit</Anchor>
          <Anchor path={{path:"/search"}}>Search</Anchor>
          <Menu responsive={true}

            icon={<UserIcon />}>
            <Anchor
              className='active'
              label="Logout"
              animateIcon={false}
              onClick={this.props.logout} />
          </Menu>
        </Menu>
        </Box>
      </GrommetHeader>
    );
  }
}

Header.propTypes = {};

function mapStateToProps(state) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSearch: (query) => { dispatch(fetchSearch(query)) },
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));