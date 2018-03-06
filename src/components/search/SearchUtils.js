import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

let actions = {};
import Legend from 'grommet/components/Legend';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';


import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import NextIcon from 'grommet/components/icons/base/Next';
import PreviousIcon from 'grommet/components/icons/base/Previous';
import Sort from 'grommet-addons/components/Sort';


import "searchkit/theming/theme.scss";

export default class SearchUtils extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.total;
    this.props.size;
    let current
  }

  componentWillUnmount() {}

  _onPageChange(page) {
    this.props.onPageChange(page);
  }

  _onPageSizeChange(size) {
    this.props.onPageSizeChange(size);
  }

  _onNextPage(numPages) {
    if (this.props.currentPage < numPages)
      this._onPageChange(this.props.currentPage+1);
  }

  _onPrevPage() {
    if (this.props.currentPage > 1)
      this._onPageChange(this.props.currentPage-1);
  }

  render() {
    let num_pages = Math.ceil(this.props.total/this.props.size);
    return (
      <Header pad={{horizontal: "small"}} justify='between'>
        <span>
          <strong>{this.props.total}</strong> results
        </span>

        <Box align="center" justify="between" direction="row" >
          <Button onClick={this._onPrevPage.bind(this)} icon={<PreviousIcon/>} />
          <span>
            Page <strong>{this.props.currentPage}</strong> of <strong>{num_pages}</strong>
          </span>
          <Button
            onClick={this._onNextPage.bind(this, num_pages)}
            icon={<NextIcon/>}/>
        </Box>
        <Box pad={{horizontal: "small"}} direction="row">
          {this.props.loading ? <Spinning pad="small" size="small"/> : null}
          <Sort options={[]}
            value='name'
            direction='asc'
            onChange={()=>{return ""}}
            />
        </Box>
      </Header>
    );
  }
}

SearchUtils.propTypes = {
  // actions: PropTypes.object.isRequired,
  // fuelSavings: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//   return {
//     // fuelSavings: state.fuelSavings
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     // actions: bindActionCreators(actions, dispatch)
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchUtils);