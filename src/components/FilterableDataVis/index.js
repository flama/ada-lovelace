import React, { Component } from 'react'
import InputBar from '../InputBar'
import DataVis from '../DataVis'

import './style.scss'

class FilterableDatavis extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterTags: [],
      filteredData: this.props.dataList
    }

    this.handleUserInput = this.handleUserInput.bind(this)
  }

  handleUserInput(filterTags) {
    let items = []
    if(filterTags[0] === '' && filterTags.length === 1) {
      items = this.props.dataList
    } else {
      items = this.props.dataList.filter(item => filterTags.filter(tag => {
        let itemHasTag = ~item.tags.indexOf(tag)
        return itemHasTag
      }).length)
    }

    this.setState({ filterTags, filteredData: items })
  }

  render() {
    return (
      <div>
        <InputBar
          filterTags={this.state.filterTags}
          onUserInput={this.handleUserInput}
        />
        <DataVis
          dataList={this.state.filteredData}
        />
      </div>
    )
  }
}

export default FilterableDatavis;
