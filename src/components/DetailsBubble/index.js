import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const DetailsBubble = props => (
  <div id="details-bubble">
  <a onClick={ () => props.close() } className="close">Close</a>
  <div className="content">
  <h3 className="name"></h3>
  <p className="description"></p>
  </div>
  <a className="external" target="_blank">More info</a>
  </div>
)

DetailsBubble.propTypes = {
  close: PropTypes.func
}

export default DetailsBubble
