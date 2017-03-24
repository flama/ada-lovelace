import React, { Component } from 'react'
import ScatterPlot from '../ScatterPlot'
import Categories from '../Categories'

import './style.scss'

class FilterableScatterPlot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterTag: -1
    }

    this.handleUserInput = this.handleUserInput.bind(this)
  }

  handleUserInput(optionIndex) {
    this.setState({
      filterTag: this.props.options[optionIndex] || -1
    })
  }

  filterDataList = dataList => {
    let items = null
    if(this.state.filterTag === -1) {
      items = dataList
    } else {
      items = dataList[this.state.filterTag]
    }
    return items
  }

  render() {
    return (
      <div className="filterable">
        <Categories
          title="Categorias" titlePosition="top" options={this.props.options}
          onChange={ index => this.handleUserInput(index) }
        />
        <ScatterPlot dataList={ this.filterDataList(this.props.dataList) }/>
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
