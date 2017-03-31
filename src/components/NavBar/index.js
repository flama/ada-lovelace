import React, { Component } from 'react'

import './styles.scss'

class NavBar extends Component {

  classesFor = (route, position) => {
    return `noink ${position} ${ route === this.props.current? "current":""}`
  }

  render() {
    return (
      <div id="navbar">
        <a href="#" className={ this.classesFor("home", "left") }>
          made with ♥ by flama
        </a>
        <a href="#" className={ this.classesFor("contributing", "right")}>contributing</a>
        <a href="#" className={ this.classesFor("about", "right") }>about</a>
      </div>
    )
  }
}

NavBar.propTypes = {
  current: React.PropTypes.oneOf([ "home", "about", "contributing" ])
}

export default NavBar
