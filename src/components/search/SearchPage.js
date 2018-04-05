import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Box from 'grommet/components/Box';

import SearchFacets from './SearchFacets';
import SearchUtils from './SearchUtils';
import SearchResults from './SearchResults';

import {fetchSearch} from '../../actions/search';
import queryString from 'query-string';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: {}, selectedAggs: {}};
  }

  componentDidMount() {
    this.props.fetchSearch();
  }

  componentWillUnmount() {}

  _toggleAggs = (selectedAggs) => {
    let currentParams = this.getSearchParams();
    const location = {
      search: `${queryString.stringify(Object.assign(currentParams,selectedAggs))}`
    };

    this.props.history.push(location);
    this.props.fetchSearch();
  }

  _changePage = (page) => {
    let currentParams = this.getSearchParams();

    const location = {
      search: `${queryString.stringify(Object.assign(currentParams,{page: page}))}`
    };

    this.props.history.push(location);
    this.props.fetchSearch();
  }

  _changePageSize = (size) => {
    let currentParams = this.getSearchParams();
    const location = {
      search: `${queryString.stringify(Object.assign(currentParams,{size: size}))}`
    };

    this.props.history.push(location);
    this.props.fetchSearch();
  }

  getSearchParams = () => {
    let params = queryString.parse(this.props.location.search);
    return params;
  }

  render() {
    let utils;
    let total = null;
    let results = null;
    let aggs = null;

    let _results = {};
    let _aggs;

    let _location = queryString.parse(this.props.location.search);

    this.getSearchParams();

    if (this.props.results) {
      _results = this.props.results.toJS();
      // let _total = _results.hits.total;
      // let _hits = _results.hits.hits;
      _aggs = _results.aggregations;
    }

    if (_aggs) {
      aggs = (
        <SearchFacets
          aggs={_aggs}
          selectedAggs={this.state.selectedAggs}
          onChange={this._toggleAggs}/>
      );
    }

    if (_results && _results.hits) {
      total = _results.hits.total;
      utils = (
        <SearchUtils
          loading={this.props.loading}
          currentPage={_location.page ? parseInt(_location.page) : 1}
          size={_location.size ? parseInt(_location.size) : 10}
          total={total}
          onPageChange={this._changePage}
          onPageSizeChange={this._changePageSize}
        />
      );
      results = (<SearchResults results={_results.hits.hits} />);
    }

    return (
      <Box  flex={true}>
        {utils}
        <Box flex={true} direction="row">
          {aggs}
          {results}
        </Box>
      </Box>
    );
  }
}

SearchPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  fetchSearch: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    // total: state.search.getIn(['results', 'total']),
    // hits: state.search.getIn(['results', 'hits']),
    // aggs: state.search.getIn(['aggs']),
    results: state.search.getIn(['results']),
    loading: state.search.getIn(['loading']),
    // selectedAggs: state.search.getIn(['selectedAggs'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchSearch,
    fetchSearch: () => dispatch(fetchSearch()),
    // toggleAggs
    // toggleAggs: (name, value, category) => dispatch(toggleAggs(name, value, category))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);