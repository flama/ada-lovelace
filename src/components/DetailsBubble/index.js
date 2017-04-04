import React, { Component } from 'react'

import './styles.scss'

class DetailsBubble extends Component {
  render() {
    return (
      <div id="details-bubble">
        <a>Close</a>
        <h3 className="name">Frida Kahlo</h3>
        <p className="description">Painter from Mexico</p>
        <a>More info</a>
      </div>
    )
  }
}

export default DetailsBubble
