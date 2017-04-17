import React from 'react'
import Home from '../Home'
import GraphPage from '../GraphPage'
import AboutPage from '../AboutPage'
import Share from '../Share'
import Footer from '../Footer'

import './App.scss'

const App = props => (
  <div id="app">
  <Home />
  <GraphPage />
  <AboutPage />
  <Share />
  <Footer />
  </div>
)

export default App
