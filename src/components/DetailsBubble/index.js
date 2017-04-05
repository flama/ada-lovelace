import React, { Component } from 'react'

import './styles.scss'

class DetailsBubble extends Component {

  close = () => window.wikiminaCloseBubble()

  render() {
    return (
      <div id="details-bubble">
        <a onClick={ this.close } className="close">Close</a>
        <div className="content">
          <h3 className="name"></h3>
          <p className="description"></p>
        </div>
        <a className="external" target="_blank">More info</a>
      </div>
    )
  }
}

export default DetailsBubble
