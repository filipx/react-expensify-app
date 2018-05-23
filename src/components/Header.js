import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="active" exact>Home</NavLink>
    <NavLink to="/create" activeClassName="active">Create expence</NavLink>
  </header>
);

export default Header;