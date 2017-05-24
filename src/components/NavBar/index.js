import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'

import './styles.scss'

const NavBar = props => {
  return (
    <div id="navbar">
      <a href="http://flama.is" target="_blank" className="left">
        made with ♥ by flama
      </a>
      <div className="right">
        <div className={ `nav-burger${props.open? ' -open':''}` }
          onClick={ () => props.toggleMenu() }>
        </div>
        <div className="nav-items">
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
      </div>
    </div>
  )
}

NavBar.propTypes = {
  open: PropTypes.bool,
  toggleMenu: PropTypes.func,
}

export default NavBar
