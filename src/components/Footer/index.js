import React from 'react'
import { ShareButtons } from 'react-share'

import './style.scss'

const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons

const Footer = props => {
  const host = "http://wikimina.flama.is"

  return (

    <div id="footer">
      <div className="content">
        <a href="http://flama.is" target="_blank" className="link">
          made with ♥ by flama
        </a>
        <div className="actions">
          <span>Share</span>
          <FacebookShareButton url={ host }
            description={
              `Inspiring and helping to create representativity so more women become badasses.`
            }>
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
    </div>
  )
}

export default Footer
