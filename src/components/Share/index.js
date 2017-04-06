import React, { Component } from 'react'
import { Element } from 'react-scroll'

import './style.scss'

class Share extends Component {

  render()
  {
    return (
      <Element name="share" id="share">
        <div className="content">
          <h4>Share</h4>
          <p>We envision an ever-growing platform, crowdsourced by people everywhere, helping us show women who somehow have created an impact in our world!
           Until then, you can help us by spreading the word of Wikimina :)</p>
           <div className="actions">
             <button>Facebook</button>
             <button>Twitter</button>
          </div>
        </div>
      </Element>
    )
  }
}

export default Share;
