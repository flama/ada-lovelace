import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Home from '../Home'
import GraphPage from '../GraphPage'
import AboutPage from '../AboutPage'
import Share from '../Share'
import Footer from '../Footer'

import shareImage from './wikimina.png'


import './App.scss'

class App extends Component {

  render()
  {
    let host = "http://flama.github.io/ada-lovelace"
    return (
      <div id="app">
        <Helmet>
          <meta property="og:image" content={ `${host}${shareImage}` } />
          <meta property="og:image:secure_url" content={ `${host}${shareImage}` } />
        </Helmet>
        <Home />
        <GraphPage />
        <AboutPage />
        <Share />
        <Footer />
      </div>
    )
  }
}

export default App;
