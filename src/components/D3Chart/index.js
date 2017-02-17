import React, { Component } from 'react'
import d3chart from './d3chart'

import './styles.scss'

class D3Chart extends Component {

  componentDidMount = () => {
    let el = this.getDOMNode()
    d3chart(el,{
      width: "100%",
      height: "300px"
    }, this.getChartState())
  }

  componentDidUpdate = () => {
    let el = this.getDOMNode()
    d3chart.update(el,this.getChartState())
  }

  getChartState = () => {
    return {
      data: this.props.data,
      domain: this.props.domain
    }
  }

  componentWillMount = () => {
    let el = this.getDOMNode();
    d3chart.destroy(el);
  }

  render() {
    return (<div className="Chart" />)
  }
}

D3Chart.propTypes = {
  data: React.PropTypes.array,
  domain: React.PropTypes.object
}

export default D3Chart
