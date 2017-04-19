import React, { Component } from 'react'
import PropTypes from 'prop-types'

import d3chartHelper from './helper/d3chart'

import './styles.scss'

class ScatterRow extends Component {

  componentDidMount = () => {
    this.d3Chart = new d3chartHelper(this.graph, {
      width: "100%",
      height: "100%"
    }, this.props)
  }

  componentDidUpdate = () => {
    this.d3Chart.update(this.graph, this.props)
  }

  render() {
    return (
      <div className={ `scatter-row ${ this.props.hidden ? 'hidden':'' }` }>
        <div className="title"><h2>{ this.props.title }</h2></div>
        <div className="graph" ref={ graph => { this.graph = graph } }></div>
      </div>
    )
  }
}

ScatterRow.propTypes = {
  data: PropTypes.array,
  domain: PropTypes.object.isRequired,
  hidden: PropTypes.bool,
  title: PropTypes.string
}

export default ScatterRow
