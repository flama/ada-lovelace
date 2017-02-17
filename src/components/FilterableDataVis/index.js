import React, { Component } from 'react'
import InputBar from '../InputBar'
import DataVis from '../DataVis'

import './style.scss'

class FilterableDatavis extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterTags: []
    }

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
      <div>
        <InputBar
          filterTags={this.state.filterTags}
          onUserInput={this.handleUserInput}
        />
        <DataVis
          dataList={this.filterDataList(this.props.dataList, this.state.filterTags)}
        />
      </div>
    )
  }
}

export default FilterableDatavis;
