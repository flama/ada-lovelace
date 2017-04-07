import React, { Component } from 'react'
import ExpansibleScatterRow from '../ExpansibleScatterRow'
import ScatterPlotTimeline from '../ScatterPlotTimeline'
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
        <div className="topics">{ topics }</div>
        <DetailsBubble close={ () => this.props.closeBubble() }/>
        <div className="scatter-row">
          <div className="title"></div>
          <ScatterPlotTimeline className="graph" domain={ domain } />
        </div>
      </div>
    )
  }
}

ScatterPlot.propTypes = {
  dataList: React.PropTypes.object,
  all: React.PropTypes.bool
}

export default ScatterPlot
