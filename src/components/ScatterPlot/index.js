import React, { Component } from 'react'
import ExpansibleScatterRow from '../ExpansibleScatterRow'

import './styles.scss'

const domain = {
  x: [1800, 2017]
}

class ScatterPlot extends Component {

  render() {

    let topics = Object.keys(this.props.dataList).map(category => {
      return (<ExpansibleScatterRow
        data={ this.props.dataList[category] }
        domain={ domain }
        title={ category }
        key={ category }
        all={ this.props.all }
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
