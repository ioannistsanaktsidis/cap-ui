import React from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

import Heading from 'grommet/components/Heading';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import CheckBox from 'grommet/components/CheckBox';

import queryString from 'query-string';

import "searchkit/theming/theme.scss";

export default class SearchFacets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  _onChange(category, event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let selected = this.onAggsChange(category, name, this.props.selectedAggs)
    if (this.props.onChange)
      return this.props.onChange(selected);
    else console.log("event::", target, value, name);
  }

  onAggsChange(category, name,selectedAggregations) {
    let _type = name;

    let _selectedAggregations = selectedAggregations;
    if (!_selectedAggregations[category]) {
      _selectedAggregations[category] = [];
    }

    let index = _selectedAggregations[category].indexOf(_type);

    if ( index == -1 )
      _selectedAggregations[category].push(_type)
    else
      _selectedAggregations[category].splice(index, 1)

    queryString.stringify
    let query = "?"

    return _selectedAggregations;
  }



  render() {
    if (this.props.aggs){
      let _aggs = this.props.aggs;
      let categories = Object.keys(_aggs);
      return (
        <Sidebar full={false}>
          <Box flex={true} justify='start'>
            <Menu primary={true}>
              {
                categories.map((category) => {
                  return (
                    <Box pad="small" colorIndex='neutral-1-t' key={category}>
                      <Heading
                        pad="small"
                        tag='h5'
                        strong={false}
                        uppercase={true}
                        truncate={true}
                        href='#'
                        className='active'
                        label={category}
                        id={category}
                        value={category}
                        >
                        {category}
                      </Heading>
                      <Box size="medium" styles={{maxHeight: "100px"}} pad="small">
                        {
                          _aggs[category].buckets
                            .map((cat_fields) => (

                                <Box size="medium" key={String(cat_fields.key)} direction="row" justify="between" align="center" wrap={false}>
                                  <Box direction="row" justify="between" align="center" wrap={false}>
                                    <CheckBox
                                      label={cat_fields.key}
                                      key={cat_fields.key}
                                      name={String(cat_fields.key)}
                                      pad={{horizontal: "small"}}
                                      onChange={this._onChange.bind(this, category)}/>
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

SearchFacets.propTypes = {};

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {};
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchFacets);