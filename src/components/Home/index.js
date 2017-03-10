import React, { Component } from 'react'

import arrowDown from './arrow-down.svg'
import './styles.scss'
import './home.png'

class Home extends Component {
  render() {
    return (
      <section id="home">
        <div className="header">
          <a href="#" className="noink left">
            made with ♥ by flama
          </a>
          <a href="#" className="noink right">
            about
          </a>
          <a href="#" className="noink right">
            contributing
          </a>
        </div>
        <div className="body">
          <h1>wikimina</h1>
          <p>Take a quick look around you. The world as you know has been crafted by both men and women — but all you know is about the former ones. Now, think about your work or your hobbies. How many women are a reference in those fields? For how long have you known them? How hard was for them to be accepted or recognized?</p>
        </div>
        <img src={ arrowDown } className="arrow-down" role="presentation" />
      </section>
    )
  }
}

export default Home
