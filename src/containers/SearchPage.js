import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import SearchFacets from '../components/search/SearchFacets';
import SearchUtils from '../components/search/SearchUtils';
import SearchResults from '../components/search/SearchResults';
let actions = {};

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: {}};
  }

  componentDidMount() {
    console.log("searching::")
    this.search();
  }

  componentWillUnmount() {}


  search(url, params) {
    let searchApiUrl = 'https://videos.cern.ch/api/records';
    let results;
    const searchUrl = `${searchApiUrl}/${window.location.search}`;


    axios.get(searchUrl).then( (response) => {
      console.log("response", response)
      results = response.data;

      this.setState({
        results: results
      });
    })
  }



  render() {
    let utils;
    let total = null
    let results = null
    let aggs = null

    if (this.state.results.aggregations) {
      aggs = (<SearchFacets aggs={this.state.results.aggregations}/>)
    }


    if (this.state.results.hits) {
      if (this.state.results.hits.total) {
        total = this.state.results.hits.total;
        utils = (<SearchUtils total={total} links={this.state.results.links}/>)
      }

      if (this.state.results.hits.hits) {
        results = (<SearchResults results={this.state.results.hits} links={this.state.results.links}/>)
      }
    }

    return (
        <Box  flex={true} direction="row">

          {aggs}
          <Box flex={true}>

            {utils}
            {results}
          </Box>

        </Box>
    );
  }
}

SearchPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);