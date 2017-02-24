import React, { Component } from 'react'
import ScatterRow from '../ScatterRow'

import './styles.scss'

const domain = {
  x: [-1800, 2030]
}

class ScatterPlot extends Component {

  render() {

    //TODO: change to actual data
    let topics = Object.keys(this.props.dataList).map(category => {
      return (<ScatterRow
        data={ this.props.dataList[category] }
        domain={ domain }
        title={ category }
        key={ category }
      />)
    })

    return (
      <div className="scatter-plot">
        { topics }
      </div>
    )
  }
}

export default ScatterPlot
