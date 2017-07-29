import React from 'react'
import { Element } from 'react-scroll'

import './style.scss'

const Share = props => {
  return (
    <Element name="share" id="share">
      <div className="content">
        <h3>Keep Inspiring!</h3>
        <p>
          { `We envision an ever-growing platform, crowdsourced by people everywhere, helping us show women who somehow have created an impact in our world!
          ` }
        </p>
        <p>
          {`Just click bellow and you can tell us who are the amazing women that inspire you and made a dent in our world.`}
        </p>
        <a href="https://flama.typeform.com/to/RHoEAz" target="_blank" className="button">collaborate</a>
      </div>
    </Element>
  )
}

export default Share
