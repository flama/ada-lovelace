import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../NavBar'

import './home.png'
import './styles.scss'

const Home = props => (
  <section id="home">
    <NavBar open={ props.open } toggleMenu={ props.toggleMenu } />
    <div className="body">
      <h1>wikimina</h1>
      <p>{ `Both men and women have crafted the world as we know it.
        Now, just for a minute, take a quick look around. Think about your work or your hobbies.
        How many women are a reference in those fields?` }</p>
    </div>
  </section>
)

Home.propTypes = {
  open: PropTypes.bool,
  toggleMenu: PropTypes.func,
}

export default Home
