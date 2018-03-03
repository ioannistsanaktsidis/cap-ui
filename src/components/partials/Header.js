import React from 'react';

import GrommetHeader from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Search from 'grommet/components/Search';
import Anchor from 'grommet/components/Anchor';
import MenuIcon from 'grommet/components/icons/base/Menu';
import { NavLink } from 'react-router-dom';

import { SearchBox } from "searchkit";

import config from '../../config';

const Header = () => {
  const activeStyle = { color: 'blue' };

  return (
    <GrommetHeader size="small" colorIndex="neutral-4-a" justify="between">
      <Anchor path={{path:"/"}}>
        <Title>
          { config.project.name || "Project Name"}
        </Title>
      </Anchor>
      <Menu direction="row" responsive={true}>
        <Anchor path={{path:"/deposit"}}>Deposit</Anchor>
        <Anchor path={{path:"/search"}}>Search</Anchor>
      </Menu>
      <Search inline={true}
        size="medium"
        placeHolder="Search"
        dropAlign={{"right": "right"}} />
    </GrommetHeader>
  );
};

export default Header;
