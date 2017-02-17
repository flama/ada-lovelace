import React, { Component } from 'react'
import ScatterPlot from '../ScatterPlot'

import './styles.scss'

class DataVis extends Component {
  render() {
    let rows = []

    this.props.dataList.forEach(item => {
      rows.push(<li key={item.Name}>{item.Name}</li>)
    })

    return (
      <ul>
        <ScatterPlot data={this.props.dataList} />
        {rows}
      </ul>
    )
  }
}

export default DataVis
