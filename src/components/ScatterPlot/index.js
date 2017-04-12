import React from 'react'
import PropTypes from 'prop-types'

import ExpansibleScatterRow from '../ExpansibleScatterRow'
import ScatterPlotTimeline from '../ScatterPlotTimeline'
import DetailsBubble from '../DetailsBubble'

import './styles.scss'

const domain = {
  x: [1800, 2017]
}

const ScatterPlot = props => {
  let topics = Object.keys(props.dataList).map(category => {
    return (<ExpansibleScatterRow
      data={ props.dataList[category] }
      domain={ domain }
      title={ category }
      all={ props.all }
      key={ category }
    />)
  })

  return (
    <div className="scatter-plot">
      <div className="topics">{ topics }</div>
      <DetailsBubble close={ () => props.closeBubble() }/>
      <div className="scatter-row">
        <div className="title"></div>
        <ScatterPlotTimeline className="graph" domain={ domain } />
      </div>
    </div>
  )
}

ScatterPlot.defaultProps = {
  dataList: {},
  all: true,
  closeBubble: _=>_
}

ScatterPlot.propTypes = {
  dataList: PropTypes.object,
  all: PropTypes.bool,
  closeBubble: PropTypes.func
}

export default ScatterPlot
