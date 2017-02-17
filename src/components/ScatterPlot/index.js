import React, { Component } from 'react'
import D3Chart from '../D3Chart'

import './styles.scss'

const AreasOfInterest = {
  Arts : ['literature', 'acting', 'theater'],
  Science: ['technology', 'phisician']
}

class ScatterPlot extends Component {

  filterWomen = (area, women) => {
    return new Promise((resolve, reject) => {
        resolve(women.filter(woman => {
          return area.filter(tag => {
            let womanHasTag = ~woman.tags.indexOf(tag)
            return womanHasTag
          })
        }))
    })
  }

  formatWomen = (women) => women

  render() {

    let topics = []

    Object.keys(AreasOfInterest).forEach(areaName => {
      this.filterWomen(AreasOfInterest[areaName], this.props.data)
      .then(filteredWomen => this.formatWomen(filteredWomen))
      .then(formattedWomen => topics.push(<D3Chart data={formattedWomen} />))
    })

    return (
      <div className="scatter-plot">
        { topics }
      </div>
    )
  }
}

export default ScatterPlot
