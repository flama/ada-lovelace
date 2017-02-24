import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3chartHelper from './d3chart-helper'

import './styles.scss'

class ScatterRow extends Component {

  componentDidMount = () => {
    let el = ReactDOM.findDOMNode(this)
    this.d3Chart = new d3chartHelper(el,{
      width: "100%",
      height: "500px"
    }, this.getChartState())
  }

  componentDidUpdate = () => {
    let el = ReactDOM.findDOMNode(this)
    this.d3Chart.update(el,this.getChartState())
  }

  getChartState = () => {
    return {
      data: this.props.data,
      domain: this.props.domain
    }
  }

  componentWillUnmount = () => {
    let el = ReactDOM.findDOMNode(this)
    this.d3Chart.destroy(el)
  }

  render() {
    return (<div className="Chart" />)
  }
}

ScatterRow.propTypes = {
  data: React.PropTypes.array,
  domain: React.PropTypes.object.isRequired
}

export default ScatterRow
