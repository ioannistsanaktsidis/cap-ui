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

import {fetchSearch} from '../../actions/search';
import config from '../../config';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  _onSearchSubmit(event) {
    event.preventDefault();

    let query = event.target.value;
    let q = queryString.parse(window.location.search);
    q["q"] = query;

    const search_location = {
      pathname: `search`,
      search: `${queryString.stringify(q)}`
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
      this.props.history.push(location);

      this.props.fetchSearch(query)
    }

    return (
      <GrommetHeader pad="none" size="small" colorIndex="neutral-1">
        <Anchor path={{path:"/"}}>
          <Title pad={{horizontal: "small"}}>
            { config.project.name || "Project Name"}
          </Title>
        </Anchor>
        <Box
          flex={true}
          pad={{horizontal: "small"}}
          justify='end'
          direction='row'
          responsive={false}>
            <Box flex={true} justify="center">
          <Form plain={true} onSubmit={this._onSearchSubmit.bind(this)} >
            <Search inline={true}
              size="small"
              flex="true"
              placeHolder="Search"
              dropAlign={{"right": "right"}}
              onDOMChange={onSearchInput}/>
          </Form>
            </Box>
        <Menu pad={{horizontal: "small"}} direction="row" responsive={true}>
          <Anchor path={{path:"/deposit"}}>Deposit</Anchor>
          <Anchor path={{path:"/search"}}>Search</Anchor>
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
    fetchSearch: (query) => { dispatch(fetchSearch(query)) }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));