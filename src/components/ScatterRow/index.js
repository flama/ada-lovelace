import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3chartHelper from './d3chart-helper'

import './styles.scss'

class ScatterRow extends Component {

  componentDidMount = () => {
    this.d3Chart = new d3chartHelper(this.graph,{
      width: "100%",
      height: "100%"
    }, this.getChartState())
  }

  getChartState = () => {
    return {
      data: this.props.all || !this.props.active ?
        this.reduceDataToArray(this.props.data) : this.props.data.data,
      domain: this.props.domain
    }
  }

  reduceDataToArray = data => {
    if(!data) return []
    return Object.keys(data)
      .reduce((accumulator, key) => {
        return accumulator.concat(data[key])
      }, [])
      .filter(value => value)
  }

  componentWillUnmount = () => {
    let el = ReactDOM.findDOMNode(this)
    this.d3Chart.destroy(el)
  }

  render() {
    return (
      <div className={ `scatter-row ${ this.props.data.active || this.props.all ? 'active':'' }` }>
        <div className="title" onClick={ () => this.props.open() }><h2>{ this.props.title }</h2></div>
        <div className="graph" ref={ graph => { this.graph = graph } }></div>
      </div>
    )
  }
}

ScatterRow.defaultProps = {
  open: _=>_
}

ScatterRow.propTypes = {
  data: React.PropTypes.object,
  domain: React.PropTypes.object.isRequired,
  open: React.PropTypes.func,
  active: React.PropTypes.bool
}

export default ScatterRow
