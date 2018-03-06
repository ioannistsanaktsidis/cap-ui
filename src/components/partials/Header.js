import React from 'react';

import GrommetHeader from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Form from 'grommet/components/Form';
import Search from 'grommet/components/Search';
import Anchor from 'grommet/components/Anchor';
import { NavLink, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';
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
      <GrommetHeader pad="small" size="small" colorIndex="neutral-1">
        <Anchor path={{path:"/"}}>
          <Title>
            { config.project.name || "Project Name"}
          </Title>
        </Anchor>
        <Box flex={true}
          pad={{horizontal: "small"}}
          justify='end'
          direction='row'
          responsive={false}>
          <Form plain={true} onSubmit={this._onSearchSubmit.bind(this)} >
            <Search inline={true}
              fill={true}
              size="medium"
              placeHolder="Search"
              dropAlign={{"right": "right"}}
              onDOMChange={onSearchInput}/>
          </Form>
        <Menu pad={{horizontal: "small"}} direction="row" responsive={true}>
          <Anchor path={{path:"/deposit"}}>Deposit</Anchor>
          <Anchor path={{path:"/search"}}>Search</Anchor>
        </Menu>
        </Box>
      </GrommetHeader>
    );
  }
}
              // onDOMChange={debounce(onSearchInput, 250)} />
//
Header.propTypes = {
  // actions: PropTypes.object.isRequired,
  // fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    // fuelSavings: "state.fuelSavings"
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSearch: (query) => { dispatch(fetchSearch(query)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));