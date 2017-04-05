import React, { Component } from 'react'
import ExpansibleScatterRow from '../ExpansibleScatterRow'
import DetailsBubble from '../DetailsBubble'


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
        all={ this.props.all }
        key={ category }
      />)
    })

    return (
      <div className="scatter-plot">
        { topics }
        <DetailsBubble />
      </div>
    )
  }
}

ScatterPlot.propTypes = {
  dataList: React.PropTypes.object,
  all: React.PropTypes.bool
}

export default ScatterPlot
