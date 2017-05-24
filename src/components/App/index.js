import React, { Component } from 'react'
import Home from '../Home'
import GraphPage from '../GraphPage'
import AboutPage from '../AboutPage'
import Share from '../Share'
import Footer from '../Footer'

import './App.scss'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div id="app" className={ this.state.open ? '-open' : '' }>
        <Home
          open={ this.state.open }
          toggleMenu={ this.toggleMenu }
        />
        <GraphPage />
        <AboutPage />
        <Share />
        <Footer />
      </div>
    )
  }
}

export default App
