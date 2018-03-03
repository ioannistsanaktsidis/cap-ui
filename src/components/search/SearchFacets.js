import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

let actions = {};
import Legend from 'grommet/components/Legend';
import Heading from 'grommet/components/Heading';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';

import Chart, {Base, Axis, Meter, Grid, Area, Bar, Line, Marker, MarkerLabel, HotSpots} from 'grommet/components/chart/Chart';
import RadialIcon from 'grommet/components/icons/base/Radial';


import "searchkit/theming/theme.scss";

export class SearchFacets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {}

  render() {
    if (this.props.aggs){
      let categories = Object.keys(this.props.aggs);
      return (
        <Sidebar  full={true} colorIndex='neutral-4' pad="small">
          <Box  justify='start'>
            <Menu primary={true}>
              {
                categories.map((category) => {
                  return (
                    <Box key={category}>
                      <Anchor href='#'
                        className='active'
                        label={category}
                        id={category}
                        onChange={(e) => {this.onTypeChange(e) }}
                        value={category}
                        >
                        {category}
                      </Anchor>
                      <Box pad="small">
                        {
                          this.props.aggs[category].buckets
                            .map((cat_fields) => (

                                <Box direction="row" justify="between" align="center" wrap={false}>
                                  <Box direction="row" justify="between" align="center" wrap={false}>
                                    <RadialIcon size="xsmall"/>
                                    <Box pad={{horizontal: "small"}}>{cat_fields.key}</Box>
                                  </Box>
                                  <Box alignSelf="end">{cat_fields.doc_count}</Box>
                                </Box>
                            )
                          )
                        }
                      </Box>
                    </Box>
                  )
              })
            }
            </Menu>
          </Box>
        </Sidebar>
      );
    }
    // else {
      return (<div>None</div>);
    // }
  }
}

SearchFacets.propTypes = {
  // actions: PropTypes.object.isRequired,
  // fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: "state.fuelSavings"
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
)(SearchFacets);