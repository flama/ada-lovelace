import React, { Component } from 'react'

import './style.scss'

class Footer extends Component {

  render()
  {
    return (
      <div id="footer">
        <div className="content">
          <a href="http://flama.is" target="_blank" className="link">
            made with ♥ by flama
          </a>
        </div>
      </div>
    )
  }
}

export default Footer;
