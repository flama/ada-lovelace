import React, { Component } from 'react'

import './styles.scss'
import d3TimelineHelper from './d3js-timeline'

class GraphTimeline extends Component {
  componentDidMount = () => {
    this.d3TimelineHelper = new d3TimelineHelper(this.timeline, {
      width: "100%",
      height: "100%"
    }, this.getChartState())
  }

  getChartState = () => {
    return {
      domain: this.props.domain
    }
  }

  render() {
    return (
      <div>
        <div className="timeline" ref={ timeline => { this.timeline = timeline } }></div>
      </div>
    )
  }
}

export default GraphTimeline
