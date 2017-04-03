import React, { Component } from 'react'
import GraphPage from '../GraphPage'
import AboutPage from '../AboutPage'
import Home from '../Home'
import Share from '../Share'

import './App.scss'

class App extends Component {

  render()
  {
    return (
      <div id="app">
        <Home />
        <GraphPage />
        <AboutPage />
        <Share />
      </div>
    )
  }
}

export default App;
