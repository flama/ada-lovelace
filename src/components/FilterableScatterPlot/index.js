import React, { Component } from 'react'
import ScatterPlot from '../ScatterPlot'
import Categories from '../Categories'

import './style.scss'

class FilterableScatterPlot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeRow: -1
    }
  }

  handleUserInput = optionIndex => {
    this.setState({
      activeRow: this.props.options[optionIndex] || -1
    })
  }

  selectCategory = data => {
    if(this.state.activeRow === -1) return data

    let finalData = {}


    Object.keys(data).forEach(dataKey => {
      finalData[dataKey] = { ...data[dataKey] }

      if(dataKey === this.state.activeRow)
        finalData[dataKey].active = true
    })

    return {...data, ...finalData}
  }

  render() {
    return (
      <div className="filterable">
        <Categories
          title="Categorias" titlePosition="top" options={this.props.options}
          onChange={ index => this.handleUserInput(index) }
        />
        <ScatterPlot dataList={ this.selectCategory(this.props.dataList) } all={ this.state.activeRow === -1 } />
      </div>
    )
  }
}

FilterableScatterPlot.defaultProps = {
  dataList: {}
}

FilterableScatterPlot.propTypes = {
  dataList: React.PropTypes.object,
  options: React.PropTypes.array
}

export default FilterableScatterPlot;
