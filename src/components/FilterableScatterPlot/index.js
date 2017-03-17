import React, { Component } from 'react'
import ScatterPlot from '../ScatterPlot'

import './style.scss'

class FilterableScatterPlot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterTags: []
    }

    console.log(props.dataList)

    this.handleUserInput = this.handleUserInput.bind(this)
  }

  handleUserInput(filterTags) {
    this.setState({ filterTags })
  }

  filterDataList = (dataList, filterTags) => {
    let items = []
    if(filterTags.length === 0 || (filterTags[0] === '' && filterTags.length === 1)) {
      items = dataList
    } else {
      if(dataList.length)
        items = dataList.filter(item => filterTags.filter(tag => {
          let itemHasTag = ~item.tags.indexOf(tag)
          return itemHasTag
        }).length)
    }
    return items
  }

  render() {
    return (
      <div className="filterable">
        <ScatterPlot dataList={ this.props.dataList }/>
      </div>
    )
  }
}

FilterableScatterPlot.defaultProps = {
  dataList: {}
}

FilterableScatterPlot.propTypes = {
  dataList: React.PropTypes.object
}

export default FilterableScatterPlot;
