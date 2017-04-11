import React, { Component } from 'react'
import { Link } from 'react-scroll';

import './styles.scss'

class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  classesFor = (route, position) => {
    return `noink ${position} ${ route === this.props.current? "current":""}`
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div id="navbar">
        <a href="http://flama.is" target="_blank" className={ this.classesFor("home", "left") }>
          made with ♥ by flama
        </a>
        <div className="right">
          <div className={ `nav-burger${this.state.open? ' -open':''}` }
            onClick={ () => this.toggle() }>
          </div>
          <div className="nav-items">
            <Link to="share" smooth="easeInOutQuad" duration={500} className={ this.classesFor("contributing")}>share</Link>
            <Link to="about-page" smooth="easeInOutQuad" duration={500} className={ this.classesFor("about") }>about us</Link>
            <a href="http://flama.is" target="_blank" className={ this.classesFor("home", "left") }>
              made with ♥ by flama
            </a>
          </div>
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  current: React.PropTypes.oneOf([ "home", "about", "contributing" ])
}

export default NavBar
