import React, { Component } from 'react'
import { Link } from 'react-scroll';

import './styles.scss'

const NavBar = props => (
  <div id="navbar">
    <a href="http://flama.is" target="_blank" className="left">
      made with ♥ by flama
    </a>
    <Link to="share"
      smooth="easeInOutQuad"
      duration={500}
      className="right">
      share
    </Link>
    <Link to="about-page"
      smooth="easeInOutQuad"
      duration={500}
      className="right">
      about us
    </Link>
  </div>
)

export default NavBar
