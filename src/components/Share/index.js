import React, { Component } from 'react'
import { Element } from 'react-scroll'
import { ShareButtons } from 'react-share'

import './style.scss'

const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons;

const Share = props => {
  const host = "https://flama.github.io/ada-lovelace"

  return (
    <Element name="share" id="share">
      <div className="content">
        <h4>Share</h4>
        <p>We envision an ever-growing platform, crowdsourced by people everywhere, helping us show women who somehow have created an impact in our world!
         Until then, you can help us by spreading the word of Wikimina :)</p>
         <div className="actions">
          <FacebookShareButton url={ host }
            description={`Inspiring and helping to create representativity so more women become badasses.`}>
              Facebook
          </FacebookShareButton>
          <TwitterShareButton url={ host }
          title="Wikimina"
          via="studioflama"
          hashtags={['wikimina', 'grrlpower', 'whyhistorymatters', 'empoweringwomen']} >
            Twitter
          </TwitterShareButton>
        </div>
      </div>
    </Element>
  )
}

export default Share;
