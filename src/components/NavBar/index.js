import React, { Component } from 'react'
import { Link } from 'react-scroll';

import './styles.scss'

class NavBar extends Component {

  classesFor = (route, position) => {
    return `noink ${position} ${ route === this.props.current? "current":""}`
  }

  render() {
    return (
      <div id="navbar">
        <a href="http://flama.is" target="_blank" className={ this.classesFor("home", "left") }>
          made with ♥ by flama
        </a>
        <Link to="share" smooth="easeInOutQuad" duration={500} className={ this.classesFor("contributing", "right")}>share</Link>
        <Link to="about-page" smooth="easeInOutQuad" duration={500} className={ this.classesFor("about", "right") }>about us</Link>
      </div>
    )
  }
}

NavBar.propTypes = {
  current: React.PropTypes.oneOf([ "home", "about", "contributing" ])
}

export default NavBar
