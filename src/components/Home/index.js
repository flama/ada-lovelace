import React from 'react'
import NavBar from '../NavBar'

import './home.png'
import './styles.scss'

const Home = props => (
  <section id="home">
    <NavBar current="home" />
    <div className="body">
      <h1>wikimina</h1>
      <p>{ `Both men and women have crafted the world as we know it.
        Now, just for a minute, take a quick look around. Think about your work or your hobbies.
        How many women are a reference in those fields?` }</p>
    </div>
  </section>
)

export default Home
