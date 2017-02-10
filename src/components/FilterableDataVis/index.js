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

  render() {
    return (
      <div>
        <InputBar
          filterTags={this.state.filterTags}
          onUserInput={this.handleUserInput}
        />
        <DataVis
          dataList={this.props.dataList}
          filterTags={this.state.filterTags}
        />
      </div>
    )
  }
}

export default FilterableDatavis;
