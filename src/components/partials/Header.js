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
    <GrommetHeader fixed={true} style={{backgroundColor: '#3c4c79'}}>
      <Title style={{paddingLeft: 10}}>
        { config.project.name || "Project Name"}
      </Title>
      <div style={{backgroundColor: '#fff'}}>
        <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
        {' | '}
        <NavLink exact to="/search" activeStyle={activeStyle}>Search</NavLink>
        {' | '}
        <NavLink exact to="/deposit" activeStyle={activeStyle}>Deposit</NavLink>
        {' | '}
        <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
        {' | '}
        <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
      </div>
      <Box flex={true}
        justify="end"
        direction="row"
        responsive={false}>
        <Search inline={true}
          fill={true}
          size="medium"
          placeHolder="Search"
          dropAlign={{"right": "right"}} />
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
        <Menu icon={<MenuIcon />}
          dropAlign={{"right": "right"}}>
          <Anchor path={{path:"/"}}>
            Home
          </Anchor>
          <Anchor path={{path:"/search"}}>
            Search
          </Anchor>
          <Anchor path={{path:"/fuel-savings"}}>
            Demo App
          </Anchor>
          <Anchor path={{path:"/about"}}>
            About
          </Anchor>
        </Menu>
      </Box>
    </GrommetHeader>
  );
};

export default Header;
