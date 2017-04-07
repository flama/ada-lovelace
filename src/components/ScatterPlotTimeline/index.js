import React, { Component } from 'react'
import d3TimelineHelper from './d3js-timeline'

import './styles.scss'

class GraphTimeline extends Component {
  componentDidMount = () => {
    this.d3TimelineHelper = new d3TimelineHelper(this.timeline, this.props)
  }

  render() {
    return (
      <div className="timeline" ref={ timeline => { this.timeline = timeline } }></div>
    )
  }
}

export default GraphTimeline
